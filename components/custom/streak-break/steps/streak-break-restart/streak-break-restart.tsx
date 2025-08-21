"use client";

import React from "react";
import StartNewChallenge from "./start-new";
import { CustomChallengeStep } from "@/components/custom/challenges/completion/challenge/steps/custom-challenge-step";
import { useStreakBreakContext } from "@/lib/context/streak-break-context";

const StreakBreakRestart: React.FC = () => {
  const {
    restartFlowBranch,
    currentChallenge,
    dimensions,
    challengeSelection,
    flowState,
    handleContinueCurrentChallenge,
    handleAddCustomTask,
    handleRemoveCustomTask,
    updateChallengeSelection,
    goToCustom,
    goToChoose,
  } = useStreakBreakContext();

  // Calculate completed tasks from current challenge
  const completedTasks = React.useMemo(() => {
    return [];
  }, []);

  const renderContent = () => {
    switch (restartFlowBranch) {
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
            customChallenge={challengeSelection}
            dimensions={dimensions}
            onAddTask={handleAddCustomTask}
            onRemoveTask={handleRemoveCustomTask}
            onUpdateChallenge={updateChallengeSelection}
            onBack={goToChoose}
            minTasks={3}
            maxTasks={5}
            isLoading={flowState.isLoading}
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

  return <div className="w-full h-full">{renderContent()}</div>;
};

export default StreakBreakRestart;