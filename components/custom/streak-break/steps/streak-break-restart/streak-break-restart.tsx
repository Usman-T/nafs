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
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-[#ebdbb2]/70">
            Step 3 of 4 - Choose Your Challenge
          </div>
          <div className="text-sm text-[#ebdbb2]/50">
            Duration: {duration} days
          </div>
        </div>
        
        {/* Step indicator */}
        <div className="flex space-x-2">
          {["Choose", "Configure", "Review"].map((step, index) => {
            const isActive = (
              (index === 0 && flowBranch === "choose") ||
              (index === 1 && (flowBranch === "predefined" || flowBranch === "custom" || flowBranch === "select-tasks")) ||
              (index === 2 && challengeSelection.type !== null)
            );
            
            return (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  isActive 
                    ? "bg-[#8ec07c]" 
                    : "bg-[#3c3836]"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>

      {/* Selection summary */}
      {challengeSelection.type && (
        <div className="mt-8 p-4 bg-[#3c3836] rounded-lg border border-[#504945]">
          <h3 className="text-lg font-semibold text-[#ebdbb2] mb-2">
            Selected Challenge
          </h3>
          
          {challengeSelection.type === "existing" && (
            <div>
              <p className="text-[#ebdbb2]/80">
                Challenge: {selectedChallenge?.name || "Loading..."}
              </p>
              <p className="text-sm text-[#ebdbb2]/60">
                Tasks selected: {selectedTasks.length}
              </p>
            </div>
          )}
          
          {challengeSelection.type === "custom" && challengeSelection.customChallenge && (
            <div>
              <p className="text-[#ebdbb2]/80">
                {challengeSelection.customChallenge.title}
              </p>
              <p className="text-sm text-[#ebdbb2]/60">
                Custom tasks: {challengeSelection.customChallenge.tasks.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StreakBreakRestart;