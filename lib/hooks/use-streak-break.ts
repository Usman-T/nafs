import { useState, useEffect } from "react";
import { Challenge, Dimension, Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  createCustomChallenge, 
  enrollInExistingChallenge 
} from "@/lib/actions";

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

interface CustomTask {
  name: string;
  dimension: Dimension;
}

interface CustomChallengeState {
  title: string;
  description: string;
  duration: number;
  tasks: CustomTask[];
}

type FlowBranchType = "CHOOSE_BRANCH" | "PREDEFINED" | "CUSTOM" | "SELECT_TASKS";

interface UseStreakBreakRestartProps {
  currentChallenge: ExtendedChallenge;
  predefinedChallenges: ExtendedChallenge[];
  dimensions: Dimension[];
  duration: number;
  handleNext: () => void;
}

export const useStreakBreakRestart = ({
  currentChallenge,
  predefinedChallenges,
  dimensions,
  duration,
  handleNext,
}: UseStreakBreakRestartProps) => {
  
  const [flowBranchType, setFlowBranchType] = useState<FlowBranchType>("CHOOSE_BRANCH");
  const [selectedChallenge, setSelectedChallenge] = useState<ExtendedChallenge | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [carouselApi, setCarouselApi] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [customChallenge, setCustomChallenge] = useState<CustomChallengeState>({
    title: "Custom Challenge",
    description: `Your personalized ${duration} day challenge`,
    duration: duration,
    tasks: [],
  });

  useEffect(() => {
    const loadChallenge = async () => {
      if (!selectedChallengeId) return;
      
      try {
        setChallengeLoading(true);
        const response = await fetch(`/api/challenges/${selectedChallengeId}`);
        const data = await response.json();
        setSelectedChallenge(data.challenge);
        setFlowBranchType("SELECT_TASKS");
      } catch (error) {
        console.error("Error fetching challenge:", error);
        toast.error("Failed to load challenge");
      } finally {
        setChallengeLoading(false);
      }
    };
    
    if (selectedChallengeId) {
      loadChallenge();
    }
  }, [selectedChallengeId]);

  useEffect(() => {
    if (!carouselApi) return;
    
    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const handleContinueCurrentChallenge = () => {
    setSelectedChallenge(currentChallenge);
    handleNext();
  };

  const handleSelectPredefinedChallenge = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
  };

  const handleAddCustomTask = (task: { name: string; dimension: Dimension }) => {
    setCustomChallenge(prev => ({
      ...prev,
      tasks: [...prev.tasks, task],
    }));
    setShowTaskForm(false);
  };

  const handleRemoveCustomTask = (index: number) => {
    setCustomChallenge(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleStartChallenge = async () => {
    try {
      setIsLoading(true);

      if (selectedChallengeId && selectedTasks.length >= 3) {
        const result = await enrollInExistingChallenge(
          selectedChallengeId,
          selectedTasks,
          duration,
          false
        );
        if (!result.success) throw new Error(result.message);
      } else if (customChallenge.tasks.length >= 3) {
        const creationResult = await createCustomChallenge(
          undefined,
          duration,
          {
            title: customChallenge.title,
            description: customChallenge.description,
            tasks: customChallenge.tasks.map((t) => ({
              name: t.name,
              dimensionId: t.dimension.id,
            })),
            nextDay: false,
          }
        );

        if (!creationResult.success) {
          throw new Error(creationResult?.message);
        }
      }

      toast.success("Challenge started successfully!");
      handleNext();
    } catch (error: any) {
      console.error("Challenge start error:", error);
      toast.error("Failed to start challenge");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    switch (flowBranchType) {
      case "PREDEFINED":
        setFlowBranchType("CHOOSE_BRANCH");
        break;
      case "CUSTOM":
        setFlowBranchType("CHOOSE_BRANCH");
        setShowTaskForm(false);
        break;
      case "SELECT_TASKS":
        setFlowBranchType("PREDEFINED");
        setSelectedChallenge(null);
        setSelectedChallengeId(null);
        setSelectedTasks([]);
        break;
      default:
        break;
    }
  };

  const canProceed = () => {
    switch (flowBranchType) {
      case "SELECT_TASKS":
        return selectedTasks.length >= 3 && selectedTasks.length <= 5 && !challengeLoading;
      case "CUSTOM":
        return customChallenge.tasks.length >= 3 && customChallenge.tasks.length <= 5;
      default:
        return false;
    }
  };

  const completedTasks = currentChallenge.tasks.filter((t) => t.task);

  return {
    flowBranchType,
    selectedChallenge,
    selectedChallengeId,
    selectedTasks,
    challengeLoading,
    isLoading,
    showTaskForm,
    carouselApi,
    currentSlide,
    customChallenge,
    completedTasks,
    
    setFlowBranchType,
    setSelectedTasks,
    setShowTaskForm,
    setCarouselApi,
    handleContinueCurrentChallenge,
    handleSelectPredefinedChallenge,
    handleAddCustomTask,
    handleRemoveCustomTask,
    handleStartChallenge,
    handleBack,
    
    canProceed,
  };
};