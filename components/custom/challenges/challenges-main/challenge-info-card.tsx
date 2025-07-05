"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Challenge, Dimension, Task, UserChallenge } from "@prisma/client";

interface ChallengeInfoCardProps {
  challenge: UserChallenge & {
    challenge: Challenge &
      {
        tasks: {
          task: Task & {
            dimension: Dimension;
          };
        };
      }[];
  };
  currentDay: number;
  currentStreak: number;
}

const ChallengeInfoCard = ({
  challenge,
  currentDay,
  currentStreak,
}: ChallengeInfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-[#282828] rounded-3xl p-6 border border-[#3c3836]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fe8019]/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-[#fe8019]" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#ebdbb2]">
              {challenge.challenge.name}
            </h4>
            <p className="text-sm text-[#a89984]">
              {challenge.challenge.description}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-[#fe8019]">
            {currentDay}/{challenge.challenge.duration}
          </div>
          <div className="text-xs text-[#a89984]">Days</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#a89984]">Challenge Progress</span>
          <span className="text-[#ebdbb2]">
            {Math.round((currentStreak / challenge.challenge.duration) * 100)}%
          </span>
        </div>
        <div className="flex space-x-1">
          {Array.from({ length: challenge.challenge.duration }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < currentStreak ? "bg-[#fe8019]" : "bg-[#3c3836]"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeInfoCard;
