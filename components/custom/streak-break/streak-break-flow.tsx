"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Challenge, DailyTask, Dimension, Task } from "@prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import BackgroundParticles from "@/components/custom/streak-break/extras/background-particles";
import StreakBreakInfo from "@/components/custom/streak-break/steps/streak-break-info";
import StreakBreakVisual from "@/components/custom/streak-break/steps/streak-break-visual";
import StreakBreakSummary from "./steps/streak-break-summary";
import ExitAnimation from "./extras/exit-animation";
import StreakBreakRestart from "./steps/streak-break-restart/streak-break-restart";
import { OnboardingProgress } from "../onboarding/mobile-onboarding/onboading-progress";
import {
  StreakBreakProvider,
  useStreakBreakContext,
} from "@/lib/context/streak-break-context";

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

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

function StreakBreakFlowContent() {
  const { flowState, canGoNext, canProceedFromRestart, goToStep } =
    useStreakBreakContext();

  const [api, setApi] = useState<CarouselApi>();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const steps = useMemo(() => ["info", "visual", "restart", "summary"], []);
  const currentStepIndex = steps.indexOf(flowState.currentStep);

  const stepComponents = [
    {
      component: <StreakBreakInfo />,
    },
    {
      component: <StreakBreakVisual />,
    },
    {
      component: <StreakBreakRestart />,
    },
    {
      component: <StreakBreakSummary />,
    },
  ];

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentCarouselIndex(selectedIndex);

      if (selectedIndex > currentStepIndex) {
        if (!canGoNext()) {
          api.scrollTo(currentStepIndex, false);

          if (flowState.currentStep === "restart" && !canProceedFromRestart()) {
            toast.error("Select a challenge to restart");
          }
          return;
        }
      }

      const newStep = steps[selectedIndex];
      if (newStep && newStep !== flowState.currentStep) {
        goToStep(newStep);
      }
    };

    api.on("select", handleSelect);
    setCurrentCarouselIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", handleSelect);
    };
  }, [
    api,
    currentStepIndex,
    canGoNext,
    flowState.currentStep,
    canProceedFromRestart,
    steps,
    goToStep,
  ]);

  useEffect(() => {
    if (api && currentStepIndex !== currentCarouselIndex) {
      api.scrollTo(currentStepIndex, false);
    }
  }, [api, currentStepIndex, currentCarouselIndex]);

  return (
    <>
      <BackgroundParticles />
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          watchDrag: true,
          dragFree: false,
          skipSnaps: false,
        }}
        className="flex justify-center items-center w-full h-screen"
      >
        <CarouselContent className="flex h-screen items-center">
          {stepComponents.map((step, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center w-full h-full"
            >
              <Card className="border-0 bg-transparent shadow-none w-full max-w-md mx-auto h-full">
                <CardContent>
                  <AnimatePresence mode="sync">
                    {currentCarouselIndex === index ? (
                      <motion.div
                        key={index}
                        className="w-full h-full flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex-1">{step.component}</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 p-4 flex items-center justify-center">
        <OnboardingProgress
          current={currentCarouselIndex}
          total={steps.length}
        />
      </div>

      <ExitAnimation isExiting={flowState.isExiting} />
    </>
  );
}

export default function StreakBreakFlow(props: StreakBreakFlowProps) {
  return (
    <StreakBreakProvider {...props}>
      <StreakBreakFlowContent />
    </StreakBreakProvider>
  );
}
