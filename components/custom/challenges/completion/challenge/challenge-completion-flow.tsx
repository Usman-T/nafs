"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import {
  Challenge,
  Dimension,
  Task as TaskType,
  UserChallenge,
  DimensionValue,
  DailyTask,
  CompletedTask,
  User,
} from "@prisma/client";

// hoooks
import { useChallengeCompletion } from "@/lib/hooks/use-challenge-completion";
import { useConfettiEffect } from "@/lib/hooks/use-confetti-effect";

import { calculateDimensionProgress } from "@/lib/utils/dimensionsCalculations";

// steps
import { CelebrationStep } from "@/components/custom/challenges/completion/challenge/steps/celebration-step";
import { DimensionProgressStep } from "@/components/custom/challenges/completion/challenge/steps/dimension-progress-step";
import { CustomChallengeStep } from "@/components/custom/challenges/completion/challenge/steps/custom-challenge-step";

import { Badge } from "@/components/ui/badge";

interface DimensionValueWithDimension extends DimensionValue {
  dimension: Dimension;
}

interface TaskWithDimension extends TaskType {
  dimension: Dimension;
}

interface DailyTaskWithDetails extends DailyTask {
  task: TaskWithDimension;
  completions: CompletedTask[];
  user: User & {
    currentChallenge: UserChallenge | null;
    currentStreak?: number;
  };
}

interface ChallengeCompletionFlowProps {
  completedChallenge: UserChallenge & { challenge: Challenge };
  dailyTasks: DailyTaskWithDetails[];
  dimensions: Dimension[];
  dimensionValues: DimensionValueWithDimension[];
  userLevel: number;
}

export default function ChallengeCompletionFlow({
  completedChallenge,
  dailyTasks,
  dimensions,
  dimensionValues,
  userLevel,
}: ChallengeCompletionFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    step,
    setStep,
    customChallenge,
    isLoading,
    handleChallengeCompletion,
    addCustomTask,
    removeCustomTask,
  } = useChallengeCompletion(completedChallenge.id, userLevel);

  useConfettiEffect(step);

  const durationMap: Record<number, number> = {
    1: 3,
    2: 5,
    3: 7,
    4: 10,
    5: 15,
    6: 20,
  };

  const duration = durationMap[userLevel + 1] ?? 30;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  const { previousValues, currentValues, dimensionImpacts } =
    calculateDimensionProgress(dimensions, dimensionValues, dailyTasks);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <CelebrationStep
            completedChallenge={completedChallenge}
            dailyTasks={dailyTasks}
            containerRef={containerRef}
          />
        );

      case 1:
        return (
          <DimensionProgressStep
            dimensions={dimensions}
            previousValues={previousValues}
            currentValues={currentValues}
            dimensionImpacts={dimensionImpacts}
          />
        );

      case 2:
        return (
          <CustomChallengeStep
            customChallenge={customChallenge}
            dimensions={dimensions}
            onAddTask={addCustomTask}
            onRemoveTask={removeCustomTask}
          />
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-auto space-y-6"
          >
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto h-16 w-16 rounded-full bg-[#fe8019] flex items-center justify-center mb-4"
              >
                <Award className="h-8 w-8 text-[#1d2021]" />
              </motion.div>
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                Challenge Created
              </h2>
              <p className="text-[#a89984]">
                You&apos;re ready to begin your custom challenge
              </p>
            </div>

            <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
              <h3 className="text-[#ebdbb2] font-medium mb-2">
                {customChallenge.title}
              </h3>
              <div className="text-sm text-[#a89984] mb-3">
                {customChallenge.description}
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                  {customChallenge.duration} days
                </Badge>
                <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                  {customChallenge.tasks.length} tasks
                </Badge>
              </div>

              <div className="space-y-2">
                {customChallenge.tasks.map((task, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className="h-4 w-4 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: task.dimension.color }}
                    ></div>
                    <span className="text-sm text-[#ebdbb2]">{task.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const canGoNext = () => {
    switch (step) {
      case 0:
      case 1:
        return true;
      case 2:
        return (
          customChallenge.tasks.length >= 3 &&
          customChallenge.title.trim() !== ""
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const canGoBack = () => {
    return step > 0 && step !== 6;
  };

  const handleNext = async () => {
    if (step === 4) {
      await handleChallengeCompletion();
    } else if (step === 6) {
      await handleChallengeCompletion();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const getNextButtonText = () => {
    switch (step) {
      case 0:
        return "Next";
      case 1:
        return "Choose Next Challenge";
      case 2:
        return "Create Challenge";
      case 3:
        return isLoading ? "Starting Challenge..." : "Start Challenge";
      default:
        return "Next";
    }
  };

  return (
    <div className="rounded-lg w-full h-screen justify-between flex flex-col">
      <div className="p-4 bg-[#1d2021] border-b border-[#3c3836] flex items-center justify-between">
        <div className="flex items-center">
          <Award className="h-5 w-5 text-[#fe8019] mr-2" />
          <span className="text-[#ebdbb2] font-medium">
            Challenge Onboarding
          </span>
        </div>
        <div className="text-[#a89984] text-sm">Step {step + 1} of 4</div>
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="flex overflow-y-auto p-6 flex-col bg-[#1d2021]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4  border-[#3c3836] bg-[#1d2021] border-y flex justify-between">
        <Button
          variant="outline"
          className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]"
          onClick={handleBack}
          disabled={!canGoBack() || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Button
          className="bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
          onClick={handleNext}
          disabled={!canGoNext() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {getNextButtonText()}
            </>
          ) : (
            <>
              {getNextButtonText()}
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
