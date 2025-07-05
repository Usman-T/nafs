"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Award,
  Loader2,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/lib/iconMap";
import { Challenge, Dimension } from "@prisma/client";
import CustomTaskForm from "@/components/custom/onboarding/onboarding-task-form";
import ChallengeCard from "@/components/custom/onboarding/onboarding-challenge";
import SelectedChallenge from "@/components/custom/onboarding/onboarding-selected-challenge";
import OnboardingWelcome from "@/components/custom/onboarding/onboarding-welcome";
import ChallengeSummary from "@/components/custom/onboarding/onboarding-challenge-summary";
import {
  createCustomChallenge,
  enrollInExistingChallenge,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { CustomTasksStep } from "./steps/custom-task-step";
import { CustomChallengeSummaryStep } from "./steps/custom-challenge-summary";
import { OnboardingHeader } from "./onboarding-header";
import { OnboardingNavigation } from "./onboarding-navigation";
import { ChallengeSelectionStep } from "./steps/challenge-selection";
import { useChallengeOnboarding } from "@/lib/hooks/use-challenge-onboarding";

// Types
interface CustomTask {
  name: string;
  dimension: Dimension;
}

interface CustomChallengeState {
  title: string;
  description: string;
  duration: number;
  tasks: CustomTask[];
}

interface UseChallengeOnboardingProps {
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
}

export default function ChallengeOnboarding({
  predefinedChallenges,
  dimensions,
}: {
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
}) {
  const {
    step,
    selectedChallengeId,
    customChallenge,
    showTaskForm,
    selectedTasks,
    isLoading,
    challengeLoading,
    selectedChallenge,
    carouselApi,
    currentSlide,
    containerRef,
    handleAddTask,
    handleRemoveTask,
    handleChallengeSelect,
    handleNext,
    handleBack,
    setShowTaskForm,
    setSelectedTasks,
    setCarouselApi,
    setStep,
    isNextDisabled,
    showFinishButton,
    totalSteps,
  } = useChallengeOnboarding({ predefinedChallenges, dimensions });

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <OnboardingWelcome />;
      case 1:
        return (
          <ChallengeSelectionStep
            predefinedChallenges={predefinedChallenges}
            selectedChallengeId={selectedChallengeId}
            onChallengeSelect={handleChallengeSelect}
            carouselApi={carouselApi}
            setCarouselApi={setCarouselApi}
            currentSlide={currentSlide}
            onCreateCustom={() => setStep(4)}
          />
        );
      case 2:
        return (
          <SelectedChallenge
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
            challenge={selectedChallenge}
            loading={challengeLoading}
          />
        );
      case 3:
        return (
          <ChallengeSummary
            duration={3}
            selectedTasks={selectedTasks}
            challenge={selectedChallenge}
          />
        );
      case 4:
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
      case 5:
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
