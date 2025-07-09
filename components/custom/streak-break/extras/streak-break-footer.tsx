"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { ChevronRight, ChevronLeft, ArrowRight, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const StreakBreakFooter = ({
  step,
  handleBack,
  isExiting,
  showCustomForm,
  handleNext,
  canGoNext,
}: {
  step: number;
  handleBack: () => void;
  isExiting: boolean;
  showCustomForm: boolean;
  handleNext: () => void;
  canGoNext: () => string | boolean;
}) => {
  return (
    <div className="flex-shrink-0 p-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Button
          variant="outline"
          className={cn(
            "bg-transparent border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:border-[#504945]",
            step === 0 && "invisible"
          )}
          onClick={handleBack}
          disabled={step === 0 || isExiting}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: showCustomForm ? 5 : 4 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i <= step ? "bg-[#fe8019]" : "bg-[#3c3836]"
              )}
            />
          ))}
        </div>

        <Button
          className={cn(
            "bg-gradient-to-r from-[#fe8019] to-[#d65d0e] text-[#1d2021] hover:from-[#d65d0e] hover:to-[#b85c00] font-bold",
            "shadow-lg shadow-[#fe8019]/20 hover:shadow-[#fe8019]/30 transition-all duration-300"
          )}
          onClick={handleNext}
          disabled={!canGoNext() || isExiting}
        >
          {isExiting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="mr-2 h-4 w-4"
              >
                <RotateCcw className="h-4 w-4" />
              </motion.div>
              Starting Recovery...
            </>
          ) : step === 3 || step === 4 ? (
            <>
              Begin Recovery
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StreakBreakFooter;

// export const OnboardingNavigation = ({
//   step,
//   onBack,
//   onNext,
//   isLoading,
//   isNextDisabled,
//   showFinishButton,
// }: {
//   step: number;
//   totalSteps: number;
//   onBack: () => void;
//   onNext: () => void;
//   isLoading: boolean;
//   isNextDisabled: boolean;
//   showFinishButton: boolean;
// }) => (
//   <div className="p-4 border-[#3c3836] flex justify-between">
//     <Button
//       variant="outline"
//       className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]"
//       onClick={onBack}
//       disabled={step === 0 || isLoading}
//     >
//       <ChevronLeft className="h-4 w-4 mr-2" />
//       Back
//     </Button>

//     <Button
//       className="bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
//       onClick={onNext}
//       disabled={isNextDisabled || isLoading}
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Loading...
//         </>
//       ) : showFinishButton ? (
//         "Start Challenge"
//       ) : (
//         <>
//           Next
//           <ChevronRight className="h-4 w-4 ml-2" />
//         </>
//       )}
//     </Button>
//   </div>
// );
