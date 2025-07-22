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
  predefinedChallenges,
  dimensions,
  duration,
  challengeSelection,
  onUpdateSelection,
  isLoading = false,
}) => {
  const {
    flowBranch,
    isLoading: hookLoading,
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
  } = useStreakBreakRestart({
    currentChallenge,
    predefinedChallenges,
    dimensions,
    duration,
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
            onStartNew={goToPredefined}
            isLoading={isLoading || hookLoading}
          />
        );

      case "predefined":
        return (
          <ChoosePredefinedBranch
            predefinedChallenges={predefinedChallenges}
            selectedChallengeId={challengeSelection.challengeId || null}
            duration={duration}
            currentSlide={currentSlide}
            carouselApi={carouselApi}
            onSelectChallenge={handleSelectPredefinedChallenge}
            onCreateCustom={goToCustom}
            onBack={goToChoose}
            setCarouselApi={setCarouselApi}
            isLoading={isLoading || hookLoading}
          />
        );

      case "select-tasks":
        return (
          <SelectedChallenge
            challenge={selectedChallenge}
            loading={hookLoading}
            selectedTasks={selectedTasks}
            onToggleTask={handleToggleTask}
            onBack={goToPredefined}
            minTasks={3}
            maxTasks={5}
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
            onBack={goToPredefined}
            minTasks={3}
            maxTasks={5}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ebdbb2] mx-auto mb-4"></div>
              <p className="text-[#ebdbb2]/70">Loading...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center">
      <div className="flex space-x-2">
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StreakBreakRestart;
