"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";

export const OnboardingNavigation = ({
  step,
  onBack,
  onNext,
  isLoading,
  isNextDisabled,
  showFinishButton,
}: {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isLoading: boolean;
  isNextDisabled: boolean;
  showFinishButton: boolean;
}) => (
  <div className="p-4 border-[#3c3836] flex justify-between">
    <Button
      variant="outline"
      className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]"
      onClick={onBack}
      disabled={step === 0 || isLoading}
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      Back
    </Button>

    <Button
      className="bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
      onClick={onNext}
      disabled={isNextDisabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : showFinishButton ? (
        "Start Challenge"
      ) : (
        <>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </>
      )}
    </Button>
  </div>
);