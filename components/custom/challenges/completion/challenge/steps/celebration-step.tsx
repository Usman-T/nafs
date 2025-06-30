import React from "react";
import { motion } from "framer-motion";
import ChallengeWelcome from "../challenge-welcome";
import { UserChallenge, Challenge } from "@prisma/client";

interface CelebrationStepProps {
  completedChallenge: UserChallenge & { challenge: Challenge };
  dailyTasks: any[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export const CelebrationStep: React.FC<CelebrationStepProps> = ({
  completedChallenge,
  dailyTasks,
  containerRef,
}) => {
  return (
    <ChallengeWelcome
      completedChallenge={completedChallenge}
      dailyTasks={dailyTasks}
      confettiRef={containerRef}
    />
  );
};
