"use client";

import { motion, AnimatePresence } from "framer-motion";
import OnboardingWelcome from "@/components/custom/onboarding/onboarding-welcome";
import { CustomTasksStep } from "./steps/custom-task-step";
import { CustomChallengeSummaryStep } from "./steps/custom-challenge-summary";
import { OnboardingHeader } from "./onboarding-header";
import { OnboardingNavigation } from "./onboarding-navigation";
import { useChallengeOnboarding } from "@/lib/hooks/use-challenge-onboarding";
import { Dimension } from "@prisma/client";

export default function ChallengeOnboarding({
  dimensions,
}: {
  dimensions: Dimension[];
}) {
  console.log({
    dimensionInClient: dimensions.length,
    success: dimensions.length > 0,
  });
  const {
    step,
    customChallenge,
    showTaskForm,
    isLoading,
    containerRef,
    handleAddTask,
    handleRemoveTask,
    handleNext,
    handleBack,
    setShowTaskForm,
    isNextDisabled,
    showFinishButton,
    totalSteps,
  } = useChallengeOnboarding();

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <OnboardingWelcome />;
      case 1:
        return (
          <CustomTasksStep
            customChallenge={customChallenge}
            onAddTask={handleAddTask}
            onRemoveTask={handleRemoveTask}
            showTaskForm={showTaskForm}
            setShowTaskForm={setShowTaskForm}
            dimensions={dimensions}
          />
        );
      case 2:
        return <CustomChallengeSummaryStep customChallenge={customChallenge} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-lg w-full h-screen justify-between flex flex-col"
    >
      <OnboardingHeader step={step} totalSteps={totalSteps} />

      <div
        ref={containerRef}
        className="flex overflow-y-auto justify-center items-center p-4 sm:p-6"
      >
        <AnimatePresence mode="wait">
          <div key={step}>{renderStepContent()}</div>
        </AnimatePresence>
      </div>

      <OnboardingNavigation
        step={step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        isLoading={isLoading}
        isNextDisabled={isNextDisabled()}
        showFinishButton={showFinishButton()}
      />
    </motion.div>
  );
}
