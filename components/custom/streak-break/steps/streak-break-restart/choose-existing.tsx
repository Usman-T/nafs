"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Challenge } from "@prisma/client";
import ChallengeCard from "@/components/custom/challenges/completion/challenge/challenge-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ChoosePredefinedBranchProps {
  predefinedChallenges: Challenge[];
  selectedChallengeId: string | null;
  duration: number;
  currentSlide: number;
  carouselApi: any;
  onSelectChallenge: (id: string) => void;
  onCreateCustom: () => void;
  setCarouselApi: (api: any) => void;
}

const ChoosePredefinedBranch: React.FC<ChoosePredefinedBranchProps> = ({
  predefinedChallenges,
  selectedChallengeId,
  duration,
  currentSlide,
  carouselApi,
  onSelectChallenge,
  onCreateCustom,
  setCarouselApi,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#ebdbb2]">Choose a Challenge</h2>
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
                  challenge={{ ...challenge, duration: duration }}
                  isSelected={selectedChallengeId === challenge.id}
                  onSelect={() => onSelectChallenge(challenge.id)}
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
};

export default ChoosePredefinedBranch;
