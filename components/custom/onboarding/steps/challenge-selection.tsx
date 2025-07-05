
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
export const ChallengeSelectionStep = ({
  predefinedChallenges,
  selectedChallengeId,
  onChallengeSelect,
  carouselApi,
  setCarouselApi,
  currentSlide,
  onCreateCustom,
}: {
  predefinedChallenges: Challenge[];
  selectedChallengeId: string | null;
  onChallengeSelect: (id: string) => void;
  carouselApi: any;
  setCarouselApi: (api: any) => void;
  currentSlide: number;
  onCreateCustom: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-6"
  >
    <div className="text-center">
      <h2 className="text-xl font-bold text-[#ebdbb2]">
        Choose a Challenge
      </h2>
      <p className="text-[#a89984]">
        Select a pre-designed challenge or create your own
      </p>
    </div>

    <div className="grid-cols-1 scrollbar-hide gap-4 grid">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          dragFree: false,
          loop: false,
          slidesToScroll: 1,
        }}
        setApi={setCarouselApi}
      >
        <CarouselContent>
          {predefinedChallenges.map((challenge, i) => (
            <CarouselItem key={i} className="px-2 pl-8">
              <ChallengeCard
                key={challenge.id}
                className=""
                challenge={challenge}
                isSelected={selectedChallengeId === challenge.id}
                onSelect={() => onChallengeSelect(challenge.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center space-x-2 mt-3">
          {predefinedChallenges.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-[#fe8019]"
                  : "bg-[#504945] hover:bg-[#665c54]"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex justify-center"
    >
      <Button
        variant="outline"
        className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836] hover:text-[#fe8019]"
        onClick={onCreateCustom}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Custom Challenge
      </Button>
    </motion.div>
  </motion.div>
);