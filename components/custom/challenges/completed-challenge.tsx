import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChallengeCompletionFlow from "./challenge-completion-flow";

const CompletedChallenge = ({ challenge }) => {
  const [showChallengeCompletionFlow, setShowChallengeCompletionFlow] =
    useState(false);

  const handleShowChallengeCompletionFlow = () => {
    setShowChallengeCompletionFlow(true);
    localStorage.setItem("nafs-hide-mobile-nav", "true");
    window.dispatchEvent(new Event("storage"));
  };

  const handleChallengeCompletionFlowFinished = () => {
    setShowChallengeCompletionFlow(false);
    localStorage.removeItem("nafs-hide-mobile-nav");
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#282828] to-[#1d2021] border border-[#3c3836] shadow-md mb-8">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <radialGradient id="celebrate" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#fe8019" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1d2021" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#celebrate)" />
          </svg>
        </div>

        <div className="relative  p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#3c3836] p-3 rounded-full">
              <Sparkles className="text-[#fe8019] w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#ebdbb2]">
                Challenge Completed!
              </h1>
              <p className="text-sm sm:text-base text-[#a89984] mt-1">
                Congratulations! You've successfully completed this challenge.
              </p>
            </div>
          </div>
          <div className="sm:ml-auto">
            <Button
              onClick={handleShowChallengeCompletionFlow}
              className="bg-[#fe8019]/90 hover:bg-[#fe8019] text-[#1d2021] font-semibold px-5 py-2 rounded-md transition"
            >
              View Summary
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showChallengeCompletionFlow && (
          <ChallengeCompletionFlow
            completedChallenge={challenge}
            onComplete={handleChallengeCompletionFlowFinished}
          />
        )}
      </AnimatePresence>{" "}
    </>
  );
};

export default CompletedChallenge;
