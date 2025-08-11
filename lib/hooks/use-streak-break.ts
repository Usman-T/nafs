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

type FlowBranchType = "choose" | "custom";

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
  const [selectedChallenge, setSelectedChallenge] =
    useState<ExtendedChallenge | null>(null);

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

  const goToChoose = useCallback(() => {
    setFlowBranch("choose");
    setSelectedChallenge(null);
    onUpdateSelection({ type: null });
  }, [onUpdateSelection]);

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
    selectedChallenge,
    customChallenge,
    completedTasks,
    selectedTasks,
    goToChoose,
    goToCustom,

    handleContinueCurrentChallenge,
    handleAddCustomTask,
    handleRemoveCustomTask,
    handleUpdateCustomChallenge,

    canProceed,
  };
};
