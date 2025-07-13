"use client";

import React from "react";
import { Challenge, Dimension, Task } from "@prisma/client";
import { useStreakBreakRestart } from "@/lib/hooks/use-streak-break";
import ChoosePredefinedBranch from "./choose-existing";
import StartNewChallenge from "./start-new";
import SelectedChallenge from "./selected-challenge";
import { CustomChallengeStep } from "@/components/custom/challenges/completion/challenge/steps/custom-challenge-step";

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

interface StreakBreakRestartProps {
  currentChallenge: ExtendedChallenge;
  predefinedChallenges: ExtendedChallenge[];
  dimensions: Dimension[];
  duration: number;
}

const StreakBreakRestart: React.FC<StreakBreakRestartProps> = ({
  currentChallenge,
  predefinedChallenges,
  dimensions,
  duration,
}) => {
  const {
    flowBranchType,
    selectedChallenge,
    selectedChallengeId,
    selectedTasks,
    challengeLoading,
    carouselApi,
    currentSlide,
    customChallenge,
    completedTasks,
    setFlowBranchType,
    setSelectedTasks,
    handleAddCustomTask,
    setCarouselApi,
    handleContinueCurrentChallenge,
    handleSelectPredefinedChallenge,
    handleRemoveCustomTask,
    canProceed,
  } = useStreakBreakRestart({
    currentChallenge,
    predefinedChallenges,
    dimensions,
    duration,
  });

  const handleToggleTask = (taskIndex: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskIndex)
        ? prev.filter((index) => index !== taskIndex)
        : [...prev, taskIndex]
    );
  };

  const renderContent = () => {
    switch (flowBranchType) {
      case "CHOOSE_BRANCH":
        return (
          <StartNewChallenge
            currentChallenge={currentChallenge}
            completedTasks={completedTasks}
            onContinueChallenge={handleContinueCurrentChallenge}
            onStartNew={() => setFlowBranchType("PREDEFINED")}
          />
        );

      case "PREDEFINED":
        return (
          <ChoosePredefinedBranch
            predefinedChallenges={predefinedChallenges}
            selectedChallengeId={selectedChallengeId}
            duration={duration}
            currentSlide={currentSlide}
            carouselApi={carouselApi}
            onSelectChallenge={handleSelectPredefinedChallenge}
            onCreateCustom={() => setFlowBranchType("CUSTOM")}
            setCarouselApi={setCarouselApi}
          />
        );

      case "SELECT_TASKS":
        return (
          <SelectedChallenge
            challenge={selectedChallenge}
            loading={challengeLoading}
            selectedTasks={selectedTasks}
            onToggleTask={handleToggleTask}
          />
        );

      case "CUSTOM":
        return (
          <CustomChallengeStep
            customChallenge={customChallenge}
            dimensions={dimensions}
            onAddTask={handleAddCustomTask}
            onRemoveTask={handleRemoveCustomTask}
          />
        );

      default:
        return null;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default StreakBreakRestart;
