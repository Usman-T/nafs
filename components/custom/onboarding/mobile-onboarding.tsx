"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Moon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedLogo } from "./mobile-onboarding/animated-logo";
import { AnimatedTasks } from "./mobile-onboarding/animated-tasks";
import { StreakAnimation } from "./mobile-onboarding/streak-animation";
import { OnboardingProgress } from "./mobile-onboarding/onboading-progress";
import { SpiritualRadar } from "./mobile-onboarding/spiritual-radar";
import Logo from "../logo";

const onboardingSteps = [
  {
    icon: <AnimatedLogo />,
    title: "Meet your",
    subtitle: "spiritual companion",
    description:
      "Nafs guides your journey of self-improvement through Islamic principles.",
  },
  {
    icon: null,
    title: "Complete your",
    subtitle: "daily tasks",
    description: "Build habits that strengthen your connection with Allah.",
  },
  {
    icon: null,
    title: "Track your",
    subtitle: "spiritual growth",
    description:
      "Watch your efforts contribute to overall spiritual development.",
  },
  {
    icon: null,
    title: "Build your",
    subtitle: "consistency streak",
    description: "Stay motivated with lasting habits and achievements.",
  },
  {
    icon: (
      <div className="text-center space-y-4 sm:space-y-6">
        <Moon className="w-12 h-12 sm:w-16 sm:h-16 text-[#fe8019] mx-auto" />
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#ebdbb2]">
            Begin Your Journey
          </h3>
          <p className="text-[#ebdbb2]/70 text-sm sm:text-base">
            Start your path to spiritual excellence
          </p>
        </div>
        <Button className="bg-[#fe8019] hover:bg-[#d79921] text-[#1d2021] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-[#fe8019]/25 flex items-center gap-2">
          Start Journey
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    ),
    title: "",
    subtitle: "",
    description: "",
  },
];

export default function Component() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          watchDrag: true,
          dragFree: false,
        }}
      >
        <CarouselContent className="flex h-screen items-center">
          {onboardingSteps.map((step, index) => (
            <CarouselItem key={index} className="h-full">
              <Card className="border-0 bg-transparent shadow-none w-full max-w-md mx-auto h-full">
                <CardContent
                  className={`text-center px-4 py-8 w-full h-full flex items-center justify-center flex-col gap-24
                  `}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: current === index ? 1 : 0,
                      y: current === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center w-full h-24 sm:h-32"
                  >
                    {index === 1 ? (
                      <AnimatedTasks isActive={current === 1} />
                    ) : index === 2 ? (
                      <SpiritualRadar isActive={current === 2} />
                    ) : index === 3 ? (
                      <StreakAnimation isActive={current === 3} />
                    ) : (
                      step.icon
                    )}
                  </motion.div>

                  {(step.title || step.subtitle || step.description) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: current === index ? 1 : 0,
                        y: current === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex flex-col space-y-3 sm:space-y-4 max-w-xs sm:max-w-sm text-center"
                    >
                      {step.title && (
                        <h2 className="text-base sm:text-lg text-[#ebdbb2]/80 font-normal leading-tight">
                          {step.title}
                        </h2>
                      )}
                      {step.subtitle && (
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#ebdbb2] leading-tight">
                          {step.subtitle}
                        </h1>
                      )}
                      {step.description && (
                        <p className="text-xs sm:text-sm text-[#ebdbb2]/70 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 p-4 flex items-center justify-center">
        <OnboardingProgress current={current} total={count} />
      </div>
    </>
  );
}
