"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Challenge, DailyTask, Dimension, Task } from "@prisma/client";
import { dimensionsReset, resetTasks, startChallenge } from "@/lib/actions";

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

type FlowStep = "info" | "visual" | "restart" | "summary";
type RestartFlowBranch = "choose" | "custom" | "loading";

interface ChallengeSelection {
  title: string;
  description: string;
  tasks: Array<{ name: string; dimension: Dimension }>;
}

interface FlowState {
  currentStep: FlowStep;
  isAnimating: boolean;
  isExiting: boolean;
  isLoading: boolean;
}
interface MissedTask {
  id: string;
  name: string;
  dimension: string;
  color: string;
  icon: string;
  dimensionId: string;
  points: number;
}

interface StreakBreakState {
  flowState: FlowState;
  restartFlowBranch: RestartFlowBranch;
  challengeSelection: ChallengeSelection;
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  missedTasks: MissedTask[];
  currentValues: Record<string, number>;
  previousValues: Record<string, number>;
  currentChallenge: ExtendedChallenge;
  userLevel: number;
  missedDay: number;
}

interface StreakBreakActions {
  // Flow navigation
  updateFlowState: (updates: Partial<FlowState>) => void;
  setRestartFlowBranch: (branch: RestartFlowBranch) => void;
  goToStep: (step: FlowStep) => void;
  canGoNext: () => boolean;
  canProceedFromRestart: () => boolean;

  // Challenge selection
  updateChallengeSelection: (updates: Partial<ChallengeSelection>) => void;
  handleContinueCurrentChallenge: () => void;
  handleAddCustomTask: (taskName: string, dimension: Dimension) => void;
  handleRemoveCustomTask: (index: number) => void;
  goToCustom: () => void;
  goToChoose: () => void;

  // Completion
  handleComplete: () => Promise<boolean>;
  getDuration: () => number;
}

type StreakBreakContextType = StreakBreakState & StreakBreakActions;

const StreakBreakContext = createContext<StreakBreakContextType | null>(null);

interface StreakBreakProviderProps {
  children: React.ReactNode;
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  missedTasks: DailyTask[];
  currentValues: Record<string, number>;
  previousValues: Record<string, number>;
  currentChallenge: ExtendedChallenge;
  userLevel: number;
  missedDay: number;
}

export function StreakBreakProvider({
  children,
  predefinedChallenges,
  dimensions,
  missedTasks,
  currentValues,
  previousValues,
  currentChallenge,
  userLevel,
  missedDay,
}: StreakBreakProviderProps) {
  const router = useRouter();

  // State
  const [flowState, setFlowState] = useState<FlowState>({
    currentStep: "info",
    isAnimating: false,
    isExiting: false,
    isLoading: false,
  });

  const [restartFlowBranch, setRestartFlowBranch] =
    useState<RestartFlowBranch>("choose");

  const [challengeSelection, setChallengeSelection] =
    useState<ChallengeSelection>({
      title: "",
      description: "",
      tasks: [],
    });

  // Utility functions
  const getDuration = useCallback(() => {
    const durationMap: Record<number, number> = {
      1: 3,
      2: 5,
      3: 7,
      4: 10,
      5: 15,
      6: 20,
    };
    return durationMap[userLevel] ?? 30;
  }, [userLevel]);

  const updateFlowState = useCallback((updates: Partial<FlowState>) => {
    setFlowState((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateChallengeSelection = useCallback(
    (updates: Partial<ChallengeSelection>) => {
      setChallengeSelection((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const canProceedFromRestart = useCallback((): boolean => {
    return !!(
      challengeSelection?.tasks &&
      challengeSelection.tasks.length >= 3 &&
      challengeSelection.tasks.length <= 5
    );
  }, [challengeSelection]);

  const canGoNext = useCallback((): boolean => {
    if (flowState.isAnimating || flowState.isLoading) return false;

    switch (flowState.currentStep) {
      case "info":
      case "visual":
        return true;
      case "restart":
        return canProceedFromRestart();
      case "summary":
        return true;
      default:
        return false;
    }
  }, [
    flowState.isAnimating,
    flowState.isLoading,
    flowState.currentStep,
    canProceedFromRestart,
  ]);

  const goToStep = useCallback(
    (step: FlowStep) => {
      updateFlowState({ currentStep: step });
    },
    [updateFlowState]
  );

  const handleContinueCurrentChallenge = useCallback(() => {
    updateChallengeSelection({
      title: currentChallenge.name,
      description:
        currentChallenge.description ||
        `Continue your ${currentChallenge.name} challenge`,
      tasks: currentChallenge.tasks.map((t) => ({
        name: t.task.name,
        dimension: t.task.dimension,
      })),
    });
  }, [currentChallenge, updateChallengeSelection]);

  const handleAddCustomTask = useCallback(
    (taskName: string, dimension: Dimension) => {
      const newTask = { name: taskName, dimension };
      const updatedTasks = [...challengeSelection.tasks, newTask];

      updateChallengeSelection({
        tasks: updatedTasks,
      });
    },
    [challengeSelection.tasks, updateChallengeSelection]
  );

  const handleRemoveCustomTask = useCallback(
    (index: number) => {
      const updatedTasks = challengeSelection.tasks.filter(
        (_, i) => i !== index
      );

      updateChallengeSelection({
        tasks: updatedTasks,
      });
    },
    [challengeSelection.tasks, updateChallengeSelection]
  );

  const goToCustom = useCallback(() => {
    setRestartFlowBranch("custom");
    // Initialize with empty custom challenge if not already set
    if (!challengeSelection.title && !challengeSelection.tasks.length) {
      updateChallengeSelection({
        title: "Custom Challenge",
        description: "Your personalized challenge to get back on track",
        tasks: [],
      });
    }
  }, [challengeSelection, updateChallengeSelection]);

  const goToChoose = useCallback(() => {
    setRestartFlowBranch("choose");
  }, []);

  const handleComplete = useCallback(async (): Promise<boolean> => {
    updateFlowState({ isLoading: true });
    try {
      const duration = getDuration();
      const { title, description, tasks } = challengeSelection;

      const tasksReset = await resetTasks();
      if (!tasksReset.success) throw new Error("Couldn't start challenge");

      const dimensionsUpdated = await dimensionsReset(missedTasks);
      if (!dimensionsUpdated.success)
        throw new Error("Couldn't start challenge");

      const result = await startChallenge({
        title: title,
        description: description,
        duration: duration,
        tasks: tasks.map((t) => ({
          name: t.name,
          dimensionId: t.dimension.id,
        })),
        nextDay: false,
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to create custom challenge");
      }

      localStorage.removeItem("dayCompleted");
      updateFlowState({ isExiting: true });
      toast.success("Challenge started successfully!");
      setTimeout(() => router.push("/dashboard"), 800);
      return true;
    } catch (error) {
      console.error("Challenge start error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to start challenge"
      );
      return false;
    } finally {
      updateFlowState({ isLoading: false });
    }
  }, [router, updateFlowState, challengeSelection, getDuration, missedTasks]);

  const contextValue: StreakBreakContextType = {
    // State
    flowState,
    restartFlowBranch,
    challengeSelection,
    predefinedChallenges,
    dimensions,
    missedTasks,
    currentValues,
    previousValues,
    currentChallenge,
    userLevel,
    missedDay,

    // Actions
    updateFlowState,
    setRestartFlowBranch,
    goToStep,
    canGoNext,
    canProceedFromRestart,
    updateChallengeSelection,
    handleContinueCurrentChallenge,
    handleAddCustomTask,
    handleRemoveCustomTask,
    goToCustom,
    goToChoose,
    handleComplete,
    getDuration,
  };

  return (
    <StreakBreakContext.Provider value={contextValue}>
      {children}
    </StreakBreakContext.Provider>
  );
}

export function useStreakBreakContext() {
  const context = useContext(StreakBreakContext);
  if (!context) {
    throw new Error(
      "useStreakBreakContext must be used within a StreakBreakProvider"
    );
  }
  return context;
}
