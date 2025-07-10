"use client";

import type React from "react";

import { useState } from "react";
import BackgroundParticles from "@/components/custom/streak-break/extras/background-particles";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import StreakBreakInfo from "@/components/custom/streak-break/steps/streak-break-info";
import StreakBreakVisual from "@/components/custom/streak-break/steps/streak-break-visual";
import StreakBreakHeader from "@/components/custom/streak-break/extras/streak-break-header";
import StreakBreakFooter from "@/components/custom/streak-break/extras/streak-break-footer";
import ChallengeCard from "@/components/custom/onboarding/onboarding-challenge";
import { Challenge, DailyTask, Dimension, Task } from "@prisma/client";
import StreakBreakSummary from "./steps/streak-break-summary";
import ExitAnimation from "./extras/exit-animation";
import StreakBreakRestart from "./steps/streak-break-restart/streak-break-restart";

export default function StreakBreakFlow({
  predefinedChallenges,
  dimensions,
  missedTasks,
  currentValues,
  previousValues,
  currentChallenge,
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
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [createNewSelected, setCreateNewSelected] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const missedDay = 4;
  const previousStreak = 12;
  const streakStartDate = "March 15, 2024";
  const totalDaysLost = 12;

  const handleNext = () => {
    if (step === 2 && selectedChallenge === currentChallenge.id) {
      // Continue current challenge -> go to summary
      setStep(5);
    } else if (step === 2 && createNewSelected) {
      // Create new challenge -> go to predefined selection
      setStep(3);
    } else if (step === 3 && selectedChallenge) {
      // Selected a predefined challenge -> go to placeholder
      setStep(4);
    } else if (step === 3 && showCustomForm) {
      // Clicked custom challenge -> go to custom form
      setStep(4);
    } else if (step === 4) {
      // From any placeholder -> go to summary
      setStep(5);
    } else if (step === 5) {
      // From summary -> complete
      handleComplete();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 4 && showCustomForm) {
      // From custom form back to predefined selection
      setShowCustomForm(false);
      setStep(3);
    } else if (step === 4) {
      // From predefined placeholder back to selection
      setStep(3);
    } else if (step === 5) {
      // From summary back to restart choice
      setStep(2);
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
    if (step === 0 || step === 1) return true;
    if (step === 2) return selectedChallenge !== null || createNewSelected;
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
            setCreateNewSelected={setCreateNewSelected}
          />
        );

      case 3: // Predefined challenges selection (only shows if user chose "create new")
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
                Choose Your New Challenge
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[#a89984] max-w-2xl mx-auto"
              >
                Select from our curated challenges or create your own
              </motion.p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Predefined challenges */}
              <div className="grid gap-6">
                {predefinedChallenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
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
                transition={{ delay: 0.5 }}
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

      case 4: // Placeholder screen (gogo gaga)
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 px-8 py-12 text-center"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-[#ebdbb2]"
              >
                {showCustomForm ? "Custom Challenge Form" : "Challenge Details"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[#a89984] max-w-2xl mx-auto"
              >
                gogo gaga
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-md mx-auto"
            >
              <Card className="bg-[#3c3836] border-[#665c54]">
                <CardHeader>
                  <CardTitle className="text-[#ebdbb2]">
                    {showCustomForm
                      ? "Custom Challenge Creator"
                      : "Challenge Preview"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#a89984] text-lg">
                    This will be replaced with the actual form/preview content
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );

      case 5: // Summary
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
