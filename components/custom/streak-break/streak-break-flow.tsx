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
import { dimensionsReset, resetTasks, startChallenge } from "@/lib/actions";

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
  missedDay: number;
}

interface FlowState {
  currentStep: FlowStep;
  isAnimating: boolean;
  isExiting: boolean;
  isLoading: boolean;
}

interface ChallengeSelection {
  title: string;
  description: string;
  tasks: Array<{ name: string; dimension: Dimension }>;
}

export default function StreakBreakFlow({
  predefinedChallenges,
  dimensions,
  missedTasks,
  currentValues,
  previousValues,
  currentChallenge,
  userLevel,
  missedDay,
}: StreakBreakFlowProps) {
  const router = useRouter();

  const [flowState, setFlowState] = useState<FlowState>({
    currentStep: "info",
    isAnimating: false,
    isExiting: false,
    isLoading: false,
  });

  const [challengeSelection, setChallengeSelection] =
    useState<ChallengeSelection>({
      title: "",
      description: "",
      tasks: [],
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
    return !!(
      challengeSelection?.tasks &&
      challengeSelection.tasks.length >= 3 &&
      challengeSelection.tasks.length <= 5
    );
  }, [challengeSelection]);

  const handleComplete = useCallback(async () => {
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
      router.push("/dashboard/");
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

  const goToStep = useCallback(
    (step: FlowStep) => {
      if (flowState.isAnimating || flowState.isLoading) return;

      updateFlowState({ isAnimating: true });

      setTimeout(() => {
        updateFlowState({ currentStep: step, isAnimating: false });
      }, 800);
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
    goToStep,
    handleComplete,
    steps,
  ]);

  const goBack = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      goToStep(steps[prevIndex]);
    }
  }, [currentStepIndex, goToStep]);

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

  const renderStepContent = () => {
    switch (flowState.currentStep) {
      case "info":
        return (
          <StreakBreakInfo
            missedTasks={missedTasks}
            missedDay={missedDay}
            challengeName={currentChallenge.name}
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
            challengeSelection={challengeSelection}
            duration={getDuration()}
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

      <div className="flex-1 overflow-y-auto">
        <div className="flex max-h-screen items-center justify-center">
          <AnimatePresence mode="wait">
            {!flowState.isExiting && (
              <motion.div
                key={flowState.currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
              >
                {renderStepContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="shrink-0">
        <StreakBreakFooter
          step={currentStepIndex}
          isExiting={flowState.isExiting}
          handleNext={goNext}
          handleBack={goBack}
          canGoNext={canGoNext}
        />
      </div>

      <ExitAnimation isExiting={flowState.isExiting} />
    </div>
  );
}
