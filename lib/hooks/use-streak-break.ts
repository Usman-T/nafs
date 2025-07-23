import { useState, useEffect, useCallback } from "react";
import { Challenge, Dimension, Task } from "@prisma/client";
import { toast } from "sonner";

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

type FlowBranchType = "choose" | "predefined" | "custom" | "select-tasks";

interface CustomTask {
  name: string;
  dimension: Dimension;
}

interface CustomChallengeData {
  title: string;
  description: string;
  tasks: CustomTask[];
}

interface ChallengeSelection {
  type: "existing" | "custom" | "continue" | null;
  challengeId?: string;
  selectedTasks?: number[];
  customChallenge?: CustomChallengeData;
}

interface UseStreakBreakRestartProps {
  currentChallenge: ExtendedChallenge;
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  duration: number;
  challengeSelection: ChallengeSelection;
  onUpdateSelection: (updates: Partial<ChallengeSelection>) => void;
}

export const useStreakBreakRestart = ({
  currentChallenge,
  duration,
  challengeSelection,
  onUpdateSelection,
}: UseStreakBreakRestartProps) => {
  // UI State
  const [flowBranch, setFlowBranch] = useState<FlowBranchType>("choose");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChallenge, setSelectedChallenge] =
    useState<ExtendedChallenge | null>(null);

  // Carousel state
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Initialize custom challenge data
  const [customChallenge, setCustomChallenge] = useState<CustomChallengeData>({
    title: "Custom Challenge",
    description: `Your personalized ${duration} day challenge`,
    tasks: [],
  });

  // Update parent when custom challenge changes
  useEffect(() => {
    onUpdateSelection({
      type: "custom",
      customChallenge: customChallenge,
    });
  }, [customChallenge, onUpdateSelection]);

  // Handle carousel API
  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    return () => carouselApi.off("select", handleSelect);
  }, [carouselApi]);

  // Load challenge details when ID is selected
  const loadChallengeDetails = useCallback(
    async (challengeId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/challenges/${challengeId}`);
        if (!response.ok) throw new Error("Failed to fetch challenge");

        const data = await response.json();
        setSelectedChallenge(data.challenge);
        setFlowBranch("select-tasks");

        onUpdateSelection({
          type: "existing",
          challengeId: challengeId,
          selectedTasks: [],
        });
      } catch (error) {
        console.error("Error loading challenge:", error);
        toast.error("Failed to load challenge details");
      } finally {
        setIsLoading(false);
      }
    },
    [onUpdateSelection]
  );

  // Navigation handlers
  const goToChoose = useCallback(() => {
    setFlowBranch("choose");
    setSelectedChallenge(null);
    onUpdateSelection({ type: null });
  }, [onUpdateSelection]);

  const goToPredefined = useCallback(() => {
    setFlowBranch("predefined");
  }, []);

  const goToCustom = useCallback(() => {
    setFlowBranch("custom");
    onUpdateSelection({
      type: "custom",
      customChallenge: customChallenge,
    });
  }, [customChallenge, onUpdateSelection]);

  // Challenge action handlers
  const handleContinueCurrentChallenge = useCallback(() => {
    const currentTasks = currentChallenge.tasks.map((_, index) => index);
    onUpdateSelection({
      type: "continue",
      challengeId: currentChallenge.id,
      selectedTasks: currentTasks,
    });
  }, [currentChallenge, onUpdateSelection]);

  const handleSelectPredefinedChallenge = useCallback(
    (challengeId: string) => {
      loadChallengeDetails(challengeId);
    },
    [loadChallengeDetails]
  );

  // Task selection handlers
  const handleToggleTask = useCallback(
    (taskIndex: number) => {
      const currentTasks = challengeSelection.selectedTasks || [];
      const newTasks = currentTasks.includes(taskIndex)
        ? currentTasks.filter((index) => index !== taskIndex)
        : [...currentTasks, taskIndex];

      // Enforce 3-5 task limit
      if (newTasks.length <= 5) {
        onUpdateSelection({
          selectedTasks: newTasks,
        });
      } else {
        toast.error("You can select a maximum of 5 tasks");
      }
    },
    [challengeSelection.selectedTasks, onUpdateSelection]
  );

  // Custom challenge handlers
  const handleAddCustomTask = useCallback(
    (task: CustomTask) => {
      if (customChallenge.tasks.length >= 5) {
        toast.error("Maximum 5 tasks allowed");
        return;
      }

      setCustomChallenge((prev) => ({
        ...prev,
        tasks: [...prev.tasks, task],
      }));
    },
    [customChallenge.tasks.length]
  );

  const handleRemoveCustomTask = useCallback((index: number) => {
    setCustomChallenge((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  }, []);

  const handleUpdateCustomChallenge = useCallback(
    (updates: Partial<CustomChallengeData>) => {
      setCustomChallenge((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // Validation
  const canProceed = useCallback((): boolean => {
    if (challengeSelection.type === "existing") {
      const tasks = challengeSelection.selectedTasks || [];
      return tasks.length >= 3 && tasks.length <= 5;
    }

    if (challengeSelection.type === "custom") {
      const tasks = challengeSelection.customChallenge?.tasks || [];
      return tasks.length >= 3 && tasks.length <= 5;
    }

    return false;
  }, [challengeSelection]);

  // Computed values
  const completedTasks = currentChallenge.tasks.filter((t) => t.task);
  const selectedTasks = challengeSelection.selectedTasks || [];

  return {
    // State
    flowBranch,
    isLoading,
    selectedChallenge,
    customChallenge,
    completedTasks,
    selectedTasks,

    // Carousel
    carouselApi,
    currentSlide,
    setCarouselApi,

    // Navigation
    goToChoose,
    goToPredefined,
    goToCustom,

    // Actions
    handleContinueCurrentChallenge,
    handleSelectPredefinedChallenge,
    handleToggleTask,
    handleAddCustomTask,
    handleRemoveCustomTask,
    handleUpdateCustomChallenge,

    // Validation
    canProceed,
  };
};
