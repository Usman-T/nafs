"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
import { dimensionsReset, resetTasks, startChallenge } from "@/lib/actions";
import { OnboardingProgress } from "../onboarding/mobile-onboarding/onboading-progress";

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

  const [api, setApi] = useState<CarouselApi>();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

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

      const stepIndex = steps.indexOf(step);
      if (stepIndex === -1) return;

      updateFlowState({ isAnimating: true });

      // Update carousel position
      if (api && stepIndex !== currentCarouselIndex) {
        api.scrollTo(stepIndex);
      }

      setTimeout(() => {
        updateFlowState({ currentStep: step, isAnimating: false });
      }, 300);
    },
    [flowState.isAnimating, flowState.isLoading, updateFlowState, api, currentCarouselIndex, steps]
  );

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
  }, [currentStepIndex, goToStep, steps]);

  const stepComponents = [
    {
      component: (
        <StreakBreakInfo
          missedTasks={missedTasks}
          missedDay={missedDay}
          challengeName={currentChallenge.name}
          isActive={currentCarouselIndex === 0}
        />
      ),
    },
    {
      component: (
        <StreakBreakVisual
          currentValues={currentValues}
          previousValues={previousValues}
          missedTasks={missedTasks}
          dimensions={dimensions}
          isActive={currentCarouselIndex === 1}
        />
      ),
    },
    {
      component: (
        <StreakBreakRestart
          currentChallenge={currentChallenge}
          predefinedChallenges={predefinedChallenges}
          dimensions={dimensions}
          duration={getDuration()}
          challengeSelection={challengeSelection}
          onUpdateSelection={updateChallengeSelection}
          isLoading={flowState.isLoading}
          isActive={currentCarouselIndex === 2}
        />
      ),
    },
    {
      component: (
        <StreakBreakSummary
          challengeSelection={challengeSelection}
          duration={getDuration()}
          isActive={currentCarouselIndex === 3}
        />
      ),
    },
  ];

  // Handle carousel API setup and events
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentCarouselIndex(selectedIndex);
      
      // Prevent moving forward if conditions aren't met
      if (selectedIndex > currentStepIndex) {
        if (!canGoNext()) {
          // Scroll back to current allowed position
          api.scrollTo(currentStepIndex, false);
          
          if (flowState.currentStep === "restart" && !canProceedFromRestart()) {
            toast.error("Please complete your challenge selection");
          }
          return;
        }
      }

      // Update current step if it's different
      const newStep = steps[selectedIndex];
      if (newStep && newStep !== flowState.currentStep) {
        updateFlowState({ currentStep: newStep });
      }
    };

    api.on("select", handleSelect);
    
    // Set initial position
    setCurrentCarouselIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, currentStepIndex, canGoNext, flowState.currentStep, canProceedFromRestart, steps, updateFlowState]);

  // Sync carousel position with current step
  useEffect(() => {
    if (api && currentStepIndex !== currentCarouselIndex) {
      api.scrollTo(currentStepIndex, false);
    }
  }, [api, currentStepIndex, currentCarouselIndex]);

  return (
    <>
      <BackgroundParticles isActive={true} />
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
                <CardContent className="w-full h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: currentCarouselIndex === index ? 1 : 0.7, 
                      y: currentCarouselIndex === index ? 0 : 20 
                    }}
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 p-4 flex items-center justify-center">
        <OnboardingProgress 
          current={currentCarouselIndex} 
          total={steps.length}
          isActive={true}
        />
      </div>

      <ExitAnimation 
        isExiting={flowState.isExiting} 
        isActive={flowState.isExiting}
      />
    </>
  );
}