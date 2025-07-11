"use client";

import { useState } from "react";
import BackgroundParticles from "@/components/custom/streak-break/extras/background-particles";
import { motion, AnimatePresence } from "framer-motion";
import { redirect, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Challenge, DailyTask, Dimension, Task } from "@prisma/client";
import StreakBreakInfo from "@/components/custom/streak-break/steps/streak-break-info";
import StreakBreakVisual from "@/components/custom/streak-break/steps/streak-break-visual";
import StreakBreakHeader from "@/components/custom/streak-break/extras/streak-break-header";
import StreakBreakFooter from "@/components/custom/streak-break/extras/streak-break-footer";
import StreakBreakSummary from "./steps/streak-break-summary";
import ExitAnimation from "./extras/exit-animation";
import StreakBreakRestart from "./steps/streak-break-restart/streak-break-restart";
import StartNewChallenge from "./steps/streak-break-restart/start-new";

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
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
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

  const handleNext = () => {
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
    if (step === 2) return false;
    if (step === 3) return selectedChallenge !== null || showCustomForm;
    return true;
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

      case 2: // Continue current challenge OR create new challenge
        return (
          <StreakBreakRestart
            currentChallenge={currentChallenge}
            setSelectedChallenge={setSelectedChallenge}
            handleNext={handleNext}
            predefinedChallenges={predefinedChallenges}
            duration={duration}
            selectedChallenge={selectedChallenge}
          />
        );

      case 3: // Summary
        return <StreakBreakSummary />;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1d2021] via-[#282828] to-[#1d2021] text-[#ebdbb2] flex flex-col justify-between">
      {/* Background effects */}
      <BackgroundParticles />

      <StreakBreakHeader step={step} showCustomForm={showCustomForm} />

      {/* Content area */}
      <div className="flex items-center overflow-y-auto flex-col">
        <div className="w-full max-w-6xl">
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

      {/* Navigation */}
      <StreakBreakFooter
        step={step}
        isExiting={isExiting}
        canGoNext={canGoNext}
        handleNext={handleNext}
        handleBack={handleBack}
        showCustomForm={showCustomForm}
      />

      <ExitAnimation isExiting={isExiting} />
    </div>
  );
}
