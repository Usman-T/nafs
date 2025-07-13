"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const StreakBreakFooter = ({
  step,
  handleBack,
  isExiting,
  handleNext,
  canGoNext,
}: {
  step: number;
  handleBack: () => void;
  isExiting: boolean;
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
          {Array.from({ length: 4 }).map((_, i) => (
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
