"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import Logo from "../logo";
import InteractiveCalendarDemo from "./mobile-onboarding/interactive-calendar-demo";
import InteractiveRadarDemo from "./mobile-onboarding/interactive-radar-demo";
import InteractiveQuranSearchDemo from "./mobile-onboarding/interactive-quran-demo";
import EnhancedFloatingParticles from "./mobile-onboarding/extra/floating-particles";
import QuranDemoSlide from "@/components/custom/onboarding/mobile-onboarding/interactive-quran-slide";
import SwipeHint from "./mobile-onboarding/extra/swipe-hint";
import Navigation from "./mobile-onboarding/extra/navigation";

export default function MobileOnboardingFlow({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [faithCompleted, setFaithCompleted] = useState(false);
  const [characterCompleted, setCharacterCompleted] = useState(false);

  const steps = [
    {
      id: "welcome",
      title: "Welcome to Nafs",
      subtitle: "Your spiritual companion",
      description:
        "Transform your daily routine into a journey of spiritual growth and connection with Allah",
      component: null,
    },
    {
      id: "audio",
      title: "Listen to Beautiful Recitations",
      subtitle: "Audio Quran Experience",
      description:
        "Immerse yourself in professional recitations with translations and transliterations",
      props: { onTaskComplete: () => setFaithCompleted(true) },
      component: QuranDemoSlide,
    },
    {
      id: "radar",
      title: "Track Your Spiritual Growth",
      subtitle: "7 Dimensions of Faith",
      description:
        "Visualize and improve your progress across all aspects of your life",
      component: InteractiveRadarDemo,
    },
    {
      id: "calendar",
      title: "Build Consistent Habits",
      subtitle: "Daily Spiritual Tracking",
      description:
        "Mark your daily spiritual practices and build a streak of consistency",
      component: InteractiveCalendarDemo,
    },
    {
      id: "search",
      title: "Search the Entire Quran",
      subtitle: "Instant Spiritual Guidance",
      description:
        "Find any verse, surah, topic, or tafsir instantly. Get guidance exactly when you need it most",
      component: InteractiveQuranSearchDemo,
    },
    {
      id: "register",
      title: "Start Your Spiritual Journey",
      subtitle: "Join the Ummah",
      description:
        "Create your account and begin your transformation with thousands of Muslims worldwide",
      component: null,
    },
  ];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    } else {
      setSwipeDirection("left");
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSwipeDirection(null);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setSwipeDirection("right");
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSwipeDirection(null);
      }, 150);
    }
  };

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        className="fixed inset-0 bg-[#1d2021] z-50 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 1 }}
          className="text-[#fe8019] text-4xl"
        >
          <Sparkles className="h-12 w-12" />
        </motion.div>
      </motion.div>
    );
  }

  const stepProps = steps[currentStep]?.props || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#1d2021] z-50 flex flex-col "
    >
      <EnhancedFloatingParticles count={20} />

      {/* Header */}
      <div className="relative z-10 p-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Logo className="h-4 w-4 text-[#fe8019]" />
          <span className="text-[#ebdbb2] font-bold text-lg">Nafs</span>
        </motion.div>
      </div>
      {/* Enhanced progress bar */}
      <div className="px-4 mb-6">
        <div className="w-full bg-[#3c3836] rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-[#fe8019] to-[#fabd2f] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              opacity: 0,
              x: swipeDirection === "right" ? -50 : 50,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: swipeDirection === "left" ? -50 : 50,
              scale: 0.95,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col "
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (
                swipe < -swipeConfidenceThreshold &&
                currentStep < steps.length - 1
              ) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold && currentStep > 0) {
                handlePrevious();
              }
            }}
          >
            {/* Step content */}
            <div
              className={`${
                currentStepData.id === "welcome" ||
                currentStepData.id === "register"
                  ? "flex flex-col text-center h-full justify-center items-center"
                  : "text-center mb-8"
              }`}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                {(currentStep === 0 || currentStep === steps.length - 1) && (
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 shadow-2xl">
                    <Logo className="h-12 w-12 text-[#1d2021]" />
                  </div>
                )}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-[#ebdbb2] mb-3"
              >
                {currentStepData.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#fe8019] font-semibold text-lg mb-3"
              >
                {currentStepData.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#a89984] text-sm leading-relaxed max-w-sm mx-auto"
              >
                {currentStepData.description}
              </motion.p>
              {currentStep === steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center items-center py-4"
                >
                  <Button
                    onClick={() => onComplete()}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-[#fe8019] px-4 py-2 text-sm font-medium text-[#1d2021] shadow-sm transition-colors hover:bg-[#d65d0e]"
                  >
                    Register now
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Interactive component */}
            {currentStepData.component && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex-1 flex items-center justify-center mb-8"
              >
                <div className="w-full max-w-sm">
                  <currentStepData.component {...stepProps} isActive={true} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <SwipeHint />
        <Navigation currentStep={currentStep} steps={steps} />
      </div>
    </motion.div>
  );
}
