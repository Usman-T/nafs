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
  type: "existing" | "custom" | null;
  challengeId?: string;
  selectedTasks?: number[];
  customChallenge?: CustomChallengeData;
  selectedChallenge?: ExtendedChallenge;
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
  const [flowBranch, setFlowBranch] = useState<FlowBranchType>("choose");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChallenge, setSelectedChallenge] =
    useState<ExtendedChallenge | null>(null);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [customChallenge, setCustomChallenge] = useState<CustomChallengeData>({
    title: "Custom Challenge",
    description: `Your personalized ${duration} day challenge`,
    tasks: [],
  });

  useEffect(() => {
    if (challengeSelection.type === "custom") {
      onUpdateSelection({
        type: "custom",
        customChallenge: customChallenge,
      });
    }
  }, [customChallenge, challengeSelection.type, onUpdateSelection]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    return () => carouselApi.off("select", handleSelect);
  }, [carouselApi]);

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
          selectedChallenge: data.challenge,
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

  const handleContinueCurrentChallenge = useCallback(() => {
    const currentTasks = currentChallenge.tasks.map((_, index) => index);
    onUpdateSelection({
      type: "existing",
      challengeId: currentChallenge.id,
      selectedTasks: currentTasks,
      selectedChallenge: currentChallenge,
    });
  }, [currentChallenge, onUpdateSelection]);

  const handleSelectPredefinedChallenge = useCallback(
    (challengeId: string) => {
      loadChallengeDetails(challengeId);
    },
    [loadChallengeDetails]
  );

  const handleToggleTask = useCallback(
    (taskIndex: number) => {
      const currentTasks = challengeSelection.selectedTasks || [];
      const newTasks = currentTasks.includes(taskIndex)
        ? currentTasks.filter((index) => index !== taskIndex)
        : [...currentTasks, taskIndex];

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

  const completedTasks = currentChallenge.tasks.filter((t) => t.task);
  const selectedTasks = challengeSelection.selectedTasks || [];

  return {
    flowBranch,
    isLoading,
    selectedChallenge,
    customChallenge,
    completedTasks,
    selectedTasks,

    carouselApi,
    currentSlide,
    setCarouselApi,

    goToChoose,
    goToPredefined,
    goToCustom,

    handleContinueCurrentChallenge,
    handleSelectPredefinedChallenge,
    handleToggleTask,
    handleAddCustomTask,
    handleRemoveCustomTask,
    handleUpdateCustomChallenge,

    canProceed,
  };
};
