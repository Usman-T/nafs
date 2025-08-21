"use client";

import React from "react";
import StartNewChallenge from "./start-new";
import { CustomChallengeStep } from "@/components/custom/challenges/completion/challenge/steps/custom-challenge-step";
import { useStreakBreakContext } from "@/lib/context/streak-break-context";

const StreakBreakRestart: React.FC = () => {
  const { restartFlowBranch } = useStreakBreakContext();

  const renderContent = () => {
    switch (restartFlowBranch) {
      case "choose":
        return <StartNewChallenge />;
      case "custom":
        return <CustomChallengeStep />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ebdbb2] mx-auto mb-4"></div>
              <p className="text-[#ebdbb2]/70">Loading...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default StreakBreakRestart;
