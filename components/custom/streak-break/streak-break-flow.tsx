"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Challenge, DailyTask, Dimension, Task } from "@prisma/client";

import BackgroundParticles from "@/components/custom/streak-break/extras/background-particles";
import StreakBreakInfo from "@/components/custom/streak-break/steps/streak-break-info";
import StreakBreakVisual from "@/components/custom/streak-break/steps/streak-break-visual";
import StreakBreakHeader from "@/components/custom/streak-break/extras/streak-break-header";
import StreakBreakFooter from "@/components/custom/streak-break/extras/streak-break-footer";
import StreakBreakSummary from "./steps/streak-break-summary";
import ExitAnimation from "./extras/exit-animation";
import StreakBreakRestart from "./steps/streak-break-restart/streak-break-restart";
import {
  createCustomChallenge,
  enrollInExistingChallenge,
} from "@/lib/actions";

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

type FlowStep = "info" | "visual" | "restart" | "summary";

interface StreakBreakFlowProps {
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  missedTasks: DailyTask[];
  currentValues: Record<string, number>;
  previousValues: Record<string, number>;
  currentChallenge: ExtendedChallenge;
  userLevel: number;
}

interface FlowState {
  currentStep: FlowStep;
  isAnimating: boolean;
  isExiting: boolean;
  isLoading: boolean;
}

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

export default function StreakBreakFlow({
  predefinedChallenges,
  dimensions,
  missedTasks,
  currentValues,
  previousValues,
  currentChallenge,
  userLevel,
}: StreakBreakFlowProps) {
  const router = useRouter();

  // Flow state
  const [flowState, setFlowState] = useState<FlowState>({
    currentStep: "info",
    isAnimating: false,
    isExiting: false,
    isLoading: false,
  });

  // Challenge selection state
  const [challengeSelection, setChallengeSelection] =
    useState<ChallengeSelection>({
      type: null,
    });

  const getDuration = useCallback(() => {
    const durationMap: Record<number, number> = {
      1: 3,
      2: 5,
      3: 7,
      4: 10,
      5: 15,
      6: 20,
    };
    return durationMap[userLevel + 1] ?? 30;
  }, [userLevel]);

  const streakData = {
    missedDay: 4,
    previousStreak: 12,
    streakStartDate: "March 15, 2024",
    totalDaysLost: 12,
  };

  // Step navigation
  const steps: FlowStep[] = ["info", "visual", "restart", "summary"];
  const currentStepIndex = steps.indexOf(flowState.currentStep);

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
    if (!challengeSelection.type) return false;

    if (challengeSelection.type === "existing") {
      return !!(
        challengeSelection.challengeId &&
        challengeSelection.selectedTasks &&
        challengeSelection.selectedTasks.length >= 3 &&
        challengeSelection.selectedTasks.length <= 5
      );
    }

    if (challengeSelection.type === "custom") {
      return !!(
        challengeSelection.customChallenge?.tasks &&
        challengeSelection.customChallenge.tasks.length >= 3 &&
        challengeSelection.customChallenge.tasks.length <= 5
      );
    }

    return false;
  }, [challengeSelection]);

  // Challenge handling
  const handleStartChallenge = useCallback(async (): Promise<boolean> => {
    updateFlowState({ isLoading: true });

    try {
      const duration = getDuration();

      if (
        challengeSelection.type === "existing" &&
        challengeSelection.challengeId &&
        challengeSelection.selectedTasks
      ) {
        // const result = await enrollInExistingChallenge(
        //   challengeSelection.challengeId,
        //   challengeSelection.selectedTasks,
        //   duration,
        //   false
        // );
        const result = {success: true}
        toast.error("STARTING EXISTING CHALLENGE")

        if (!result.success) {
          throw new Error(result.message || "Failed to enroll in challenge");
        }
      } else if (
        challengeSelection.type === "custom" &&
        challengeSelection.customChallenge
      ) {
        const { title, description, tasks } =
          challengeSelection.customChallenge;

        // const result = await createCustomChallenge(undefined, duration, {
        //   title,
        //   description,
        //   tasks: tasks.map((t) => ({
        //     name: t.name,
        //     dimensionId: t.dimension.id,
        //   })),
        //   nextDay: false,
        // });
        const result = { success: "Yep" };
        toast.error("STARTING CUSTOM CHALLENGE")

        if (!result.success) {
          throw new Error(
            result.message || "Failed to create custom challenge"
          );
        }
      } else {
        throw new Error("Invalid challenge selection");
      }

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
  }, [challengeSelection, getDuration, updateFlowState]);

  const handleComplete = useCallback(() => {
    updateFlowState({ isExiting: true });
    toast.success("Challenge started successfully!");
    setTimeout(() => {
      router.push("/dashboard/");
    }, 2000);
  }, [router, updateFlowState]);

  const goToStep = useCallback(
    (step: FlowStep) => {
      if (flowState.isAnimating || flowState.isLoading) return;

      updateFlowState({ isAnimating: true });

      setTimeout(() => {
        updateFlowState({ currentStep: step, isAnimating: false });
      }, 300);
    },
    [flowState.isAnimating, flowState.isLoading, updateFlowState]
  );

  const goNext = useCallback(async () => {
    const nextIndex = currentStepIndex + 1;

    if (flowState.currentStep === "restart") {
      if (!canProceedFromRestart()) {
        toast.error("Please complete your challenge selection");
        return;
      }

      // Start the selected challenge
      const success = await handleStartChallenge();
      if (!success) return;
    }

    if (nextIndex < steps.length) {
      goToStep(steps[nextIndex]);
    } else {
      handleComplete();
    }
  }, [
    currentStepIndex,
    flowState.currentStep,
    canProceedFromRestart,
    handleStartChallenge,
    goToStep,
    handleComplete,
    steps,
  ]);

  const goBack = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      goToStep(steps[prevIndex]);
    }
  }, [currentStepIndex, goToStep, steps]);

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

  const canGoBack = useCallback((): boolean => {
    return (
      currentStepIndex > 0 && !flowState.isAnimating && !flowState.isLoading
    );
  }, [currentStepIndex, flowState.isAnimating, flowState.isLoading]);

  // Render step content
  const renderStepContent = () => {
    switch (flowState.currentStep) {
      case "info":
        return (
          <StreakBreakInfo
            previousStreak={streakData.previousStreak}
            missedTasks={missedTasks}
            streakStartDate={streakData.streakStartDate}
            missedDay={streakData.missedDay}
            challengeName={currentChallenge.name}
            totalDaysLost={streakData.totalDaysLost}
          />
        );

      case "visual":
        return (
          <StreakBreakVisual
            currentValues={currentValues}
            previousValues={previousValues}
            missedTasks={missedTasks}
            dimensions={dimensions}
          />
        );

      case "restart":
        return (
          <StreakBreakRestart
            currentChallenge={currentChallenge}
            predefinedChallenges={predefinedChallenges}
            dimensions={dimensions}
            duration={getDuration()}
            challengeSelection={challengeSelection}
            onUpdateSelection={updateChallengeSelection}
            isLoading={flowState.isLoading}
          />
        );

      case "summary":
        return (
          <StreakBreakSummary
            customChallenge={challengeSelection.customChallenge || null}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1d2021] via-[#282828] to-[#1d2021] text-[#ebdbb2] flex flex-col">
      <BackgroundParticles />

      <StreakBreakHeader step={currentStepIndex} />

      <div className="flex items-center overflow-y-auto flex-col flex-1">
        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!flowState.isExiting && (
              <motion.div
                key={flowState.currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {renderStepContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <StreakBreakFooter
        step={currentStepIndex}
        isExiting={flowState.isExiting}
        handleNext={goNext}
        handleBack={goBack}
        canGoNext={canGoNext}
      />

      <ExitAnimation isExiting={flowState.isExiting} />
    </div>
  );
}
