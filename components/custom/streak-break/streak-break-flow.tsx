"use client";

import type React from "react";

import { useState } from "react";
import BackgroundParticles from "@/components/custom/streak-break/extras/background-particles";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import StreakBreakInfo from "@/components/custom/streak-break/steps/streak-break-info";
import StreakBreakVisual from "@/components/custom/streak-break/steps/streak-break-visual";
import StreakBreakHeader from "@/components/custom/streak-break/extras/streak-break-header";
import StreakBreakFooter from "@/components/custom/streak-break/extras/streak-break-footer";
import ChallengeCard from "@/components/custom/onboarding/onboarding-challenge";
import { Challenge, DailyTask, Dimension } from "@prisma/client";
import StreakBreakSummary from "./steps/streak-break-summary";
import ExitAnimation from "./extras/exit-animation";

export default function StreakBreakFlow({
  predefinedChallenges,
  dimensions,
  missedTasks,
  currentValues,
  previousValues,
}: {
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  missedTasks: DailyTask[];
  currentValues: Record<string, number>;
  previousValues: Record<string, number>;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const missedDay = 4;
  const challengeName = "Ramadan Preparation Challenge";
  const previousStreak = 12;
  const streakStartDate = "March 15, 2024";
  const totalDaysLost = 12;

  const mockCurrentChallenge = {
    id: "ramadan-prep",
    title: "Ramadan Preparation",
    description: "Continue your spiritual preparation for the blessed month",
    duration: 30,
    difficulty: "Medium",
    currentDay: 4,
    tasksCompleted: 45,
    totalTasks: 120,
  };

  const handleNext = () => {
    if (step === 3 && selectedChallenge) {
      handleComplete();
    } else if (step === 4) {
      handleComplete();
    } else if (step === 3 && showCustomForm) {
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 4) {
      setShowCustomForm(false);
      setStep(3);
    } else {
      setStep(Math.max(0, step - 1));
    }
  };

  const handleComplete = () => {
    setIsExiting(true);
    // exit animation takes 2000ms
    setTimeout(() => {
      router.push("/dashboard/challenges");
    }, 2000);
  };

  const canGoNext = () => {
    if (step === 0 || step === 1 || step === 2) return true;
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
            challengeName={challengeName}
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

      case 2: // Enhanced impact assessment
        return null;

      case 3: // Enhanced challenge selection
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 px-8 py-12"
          >
            <div className="text-center space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-[#ebdbb2]"
              >
                Choose Your Recovery Path
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[#a89984] max-w-2xl mx-auto"
              >
                Every setback is a setup for a comeback. How will you rebuild
                your spiritual momentum?
              </motion.p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Continue current challenge option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <Card
                  className={cn(
                    "relative overflow-hidden transition-all duration-500 cursor-pointer group",
                    "bg-gradient-to-br from-[#fe8019]/10 to-[#d65d0e]/5 border-2 border-[#fe8019]/30",
                    "hover:border-[#fe8019] hover:shadow-lg hover:shadow-[#fe8019]/20"
                  )}
                  onClick={() => {
                    setSelectedChallenge(mockCurrentChallenge);
                    setShowCustomForm(false);
                  }}
                >
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#fe8019] text-[#1d2021] font-bold">
                      RECOMMENDED
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-[#ebdbb2] text-2xl font-bold">
                      <div className="p-3 bg-[#fe8019]/20 rounded-xl mr-4">
                        <RotateCcw className="h-8 w-8 text-[#fe8019]" />
                      </div>
                      Continue Current Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[#a89984] text-lg leading-relaxed">
                      Resume "{mockCurrentChallenge.title}" from where you left
                      off. Your progress will be preserved.
                    </p>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-[#3c3836] text-[#ebdbb2] px-3 py-1">
                        Day {mockCurrentChallenge.currentDay} of{" "}
                        {mockCurrentChallenge.duration}
                      </Badge>
                      <Badge className="bg-[#8ec07c]/20 text-[#8ec07c] px-3 py-1">
                        {mockCurrentChallenge.tasksCompleted}/
                        {mockCurrentChallenge.totalTasks} tasks completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="text-center">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#3c3836]"></div>
                  <span className="text-[#a89984] text-sm font-medium px-4">
                    OR START A NEW CHALLENGE
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#3c3836]"></div>
                </div>
              </div>

              {/* Predefined challenges */}
              <div className="grid gap-6">
                {predefinedChallenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.2 }}
                  >
                    <ChallengeCard
                      challenge={challenge}
                      isSelected={selectedChallenge?.id === challenge.id}
                      onSelect={() => {
                        setSelectedChallenge(challenge);
                        setShowCustomForm(false);
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Custom challenge option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-20 text-lg font-medium transition-all duration-500 bg-transparent",
                    "border-2 border-dashed",
                    showCustomForm
                      ? "border-[#fe8019] text-[#fe8019] bg-[#fe8019]/5 shadow-lg shadow-[#fe8019]/10"
                      : "border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019] hover:bg-[#fe8019]/5"
                  )}
                  onClick={() => {
                    setShowCustomForm(true);
                    setSelectedChallenge(null);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#fe8019]/20 rounded-lg">
                      <Plus className="h-6 w-6 text-[#fe8019]" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Create Custom Challenge</div>
                      <div className="text-sm opacity-70">
                        Design your own recovery path
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        );

      case 4: // Enhanced custom challenge creation
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
