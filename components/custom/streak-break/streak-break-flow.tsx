"use client";

import { useState } from "react";
import BackgroundParticles from "@/components/custom/streak-break/extras/background-particles";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge, DailyTask, Dimension, Task } from "@prisma/client";
import StreakBreakInfo from "@/components/custom/streak-break/steps/streak-break-info";
import StreakBreakVisual from "@/components/custom/streak-break/steps/streak-break-visual";
import StreakBreakHeader from "@/components/custom/streak-break/extras/streak-break-header";
import StreakBreakFooter from "@/components/custom/streak-break/extras/streak-break-footer";
import StreakBreakSummary from "./steps/streak-break-summary";
import ExitAnimation from "./extras/exit-animation";
import StreakBreakRestart from "./steps/streak-break-restart/streak-break-restart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCustomChallenge, enrollInExistingChallenge } from "@/lib/actions";
import { useStreakBreakRestart } from "@/lib/hooks/use-streak-break";

export default function StreakBreakFlow({
  predefinedChallenges,
  dimensions,
  missedTasks,
  currentValues,
  previousValues,
  currentChallenge,
  userLevel,
}: {
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  missedTasks: DailyTask[];
  currentValues: Record<string, number>;
  previousValues: Record<string, number>;
  currentChallenge: Challenge & {
    tasks: {
      task: Task & {
        dimension: Dimension;
      };
    }[];
  };
  userLevel: number;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const durationMap: Record<number, number> = {
    1: 3,
    2: 5,
    3: 7,
    4: 10,
    5: 15,
    6: 20,
  };

  const duration = durationMap[userLevel + 1] ?? 30;

  const missedDay = 4;
  const previousStreak = 12;
  const streakStartDate = "March 15, 2024";
  const totalDaysLost = 12;

  const animateStepChange = (nextStep: number) => {
    setIsAnimating(true);
    setStep(nextStep);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/dashboard/challenges");
    }, 2000);
  };

  const {
    flowBranchType,
    selectedChallenge,
    selectedChallengeId,
    selectedTasks,
    challengeLoading,
    isLoading,
    showTaskForm,
    carouselApi,
    currentSlide,
    customChallenge,
    completedTasks,
    setFlowBranchType,
    setSelectedTasks,
    setShowTaskForm,
    setCarouselApi,
    handleContinueCurrentChallenge,
    handleSelectPredefinedChallenge,
    handleAddCustomTask,
    handleRemoveCustomTask,
    canProceed,
  } = useStreakBreakRestart({
    currentChallenge,
    predefinedChallenges,
    dimensions,
    duration,
  });

  const handleStartChallenge = async () => {
    try {
      if (flowBranchType === "SELECT_TASKS" && selectedChallengeId && selectedTasks.length >= 3) {
        const result = await enrollInExistingChallenge(
          selectedChallengeId,
          selectedTasks,
          duration,
          false
        );
        if (!result.success) throw new Error(result.message);
      } else if (flowBranchType === "CUSTOM" && customChallenge.tasks.length >= 3) {
        const creationResult = await createCustomChallenge(
          undefined,
          duration,
          {
            title: customChallenge.title,
            description: customChallenge.description,
            tasks: customChallenge.tasks.map((t) => ({
              name: t.name,
              dimensionId: t.dimension.id,
            })),
            nextDay: false,
          }
        );
        if (!creationResult.success) throw new Error(creationResult.message);
      }

      toast.success("Challenge started!");
    } catch (error: any) {
      console.error("Challenge start error:", error);
      toast.error("Failed to start challenge");
    }
  };

  const handleNext = async () => {
    if (step === 2) {
      if (
        (flowBranchType === "SELECT_TASKS" && canProceed()) ||
        (flowBranchType === "CUSTOM" && canProceed())
      ) {
        await handleStartChallenge();
        animateStepChange(step + 1);
      }
      return;
    }

    if (step === 3) {
      handleComplete();
    } else {
      animateStepChange(step + 1);
    }
  };

  const handleBack = () => {
    animateStepChange(Math.max(0, step - 1));
  };

  const canGoNext = () => {
    if (isAnimating) return false;
    if (step === 0 || step === 1) return true;
    if (step === 2)
      return (
        (flowBranchType === "SELECT_TASKS" && canProceed()) ||
        (flowBranchType === "CUSTOM" && canProceed())
      );
    if (step === 3) return true;
    return false;
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <StreakBreakInfo
            previousStreak={previousStreak}
            missedTasks={missedTasks}
            streakStartDate={streakStartDate}
            missedDay={missedDay}
            challengeName={currentChallenge.name}
            totalDaysLost={totalDaysLost}
          />
        );

      case 1:
        return (
          <StreakBreakVisual
            currentValues={currentValues}
            previousValues={previousValues}
            missedTasks={missedTasks}
            dimensions={dimensions}
          />
        );

      case 2:
        return (
          <StreakBreakRestart
            currentChallenge={currentChallenge}
            predefinedChallenges={predefinedChallenges}
            dimensions={dimensions}
            duration={duration}
          />
        );

      case 3:
        return <StreakBreakSummary customChallenge={customChallenge} />;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1d2021] via-[#282828] to-[#1d2021] text-[#ebdbb2] flex flex-col justify-between">
      <BackgroundParticles />
      <StreakBreakHeader step={step} />

      <div className="flex items-center overflow-y-auto flex-col">
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!isExiting && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {renderStepContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <StreakBreakFooter
        step={step}
        isExiting={isExiting}
        canGoNext={canGoNext}
        handleNext={handleNext}
        handleBack={handleBack}
      />

      <ExitAnimation isExiting={isExiting} />
    </div>
  );
}
