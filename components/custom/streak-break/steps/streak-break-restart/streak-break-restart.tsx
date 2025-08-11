"use client";

import React from "react";
import { Challenge, Dimension, Task } from "@prisma/client";
import { useStreakBreakRestart } from "@/lib/hooks/use-streak-break";
import ChoosePredefinedBranch from "./choose-existing";
import StartNewChallenge from "./start-new";
import { CustomChallengeStep } from "@/components/custom/challenges/completion/challenge/steps/custom-challenge-step";

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

interface ChallengeSelection {
  type: "existing" | "custom" | null;
  challengeId?: string;
  selectedTasks?: number[];
  customChallenge?: {
    title: string;
    description: string;
    tasks: Array<{ name: string; dimension: Dimension }>;
  };
}

interface StreakBreakRestartProps {
  currentChallenge: ExtendedChallenge;
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  duration: number;
  challengeSelection: ChallengeSelection;
  onUpdateSelection: (updates: Partial<ChallengeSelection>) => void;
  isLoading?: boolean;
}

const StreakBreakRestart: React.FC<StreakBreakRestartProps> = ({
  currentChallenge,
  dimensions,
  duration,
  challengeSelection,
  onUpdateSelection,
  isLoading = false,
}) => {
  const {
    flowBranch,
    customChallenge,
    completedTasks,
    handleContinueCurrentChallenge,
    handleAddCustomTask,
    handleRemoveCustomTask,
    handleUpdateCustomChallenge,
    goToCustom,
    goToChoose
  } = useStreakBreakRestart({
    currentChallenge,
    duration,
    dimensions,
    challengeSelection,
    onUpdateSelection,
  });

  const renderContent = () => {
    switch (flowBranch) {
      case "choose":
        return (
          <StartNewChallenge
            currentChallenge={currentChallenge}
            completedTasks={completedTasks}
            onContinueChallenge={handleContinueCurrentChallenge}
            onStartNew={goToCustom}
          />
        );

      case "custom":
        return (
          <CustomChallengeStep
            customChallenge={customChallenge}
            dimensions={dimensions}
            onAddTask={handleAddCustomTask}
            onRemoveTask={handleRemoveCustomTask}
            onUpdateChallenge={handleUpdateCustomChallenge}
            onBack={goToChoose}
            minTasks={3}
            maxTasks={5}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ebdbb2] mx-auto mb-4"></div>
              <p className="text-[#ebdbb2]/70">Loading...</p>
            </div>
          </div>
        );
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default StreakBreakRestart;
