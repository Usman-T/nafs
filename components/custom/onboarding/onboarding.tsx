"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useChallengeOnboarding } from "@/lib/hooks/use-challenge-onboarding";
import { Dimension } from "@prisma/client";
import OnboardingWelcome from "@/components/custom/onboarding/onboarding-welcome";
import { CustomTasksStep } from "./steps/custom-task-step";
import { CustomChallengeSummaryStep } from "./steps/custom-challenge-summary";

export default function ChallengeOnboarding({
  dimensions,
}: {
  dimensions: Dimension[];
}) {
  const {
    step,
    customChallenge,
    showTaskForm,
    handleAddTask,
    handleRemoveTask,
    setShowTaskForm,
    isNextDisabled,
    setStep,
  } = useChallengeOnboarding();

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api && api.selectedScrollSnap() !== step) {
      api.scrollTo(step);
    }
  }, [step, api]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const newIndex = api.selectedScrollSnap();

      if (newIndex > step && isNextDisabled()) {
        api.scrollTo(step);
        return;
      }

      setStep(newIndex);
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, step, setStep, isNextDisabled]);

  const steps = [
    {
      component: <OnboardingWelcome />,
    },
    {
      component: (
        <CustomTasksStep
          customChallenge={customChallenge}
          onAddTask={handleAddTask}
          onRemoveTask={handleRemoveTask}
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          dimensions={dimensions}
          isActive={step === 1}
        />
      ),
    },
    {
      component: (
        <CustomChallengeSummaryStep
          isActive={step === 2}
          customChallenge={customChallenge}
        />
      ),
    },
  ];

  return (
    <div className="w-full justify-center items-center h-screen flex flex-col">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          watchDrag: true,
          dragFree: false,
        }}
        className="flex justify-center items-center w-full h-full"
      >
        <CarouselContent className="flex h-full">
          {steps.map((step, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center w-full h-full"
            >
              <Card className="border-0 bg-transparent shadow-none w-full max-w-md mx-auto h-full">
                <CardContent className="w-full h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    {step.component}
                  </motion.div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
