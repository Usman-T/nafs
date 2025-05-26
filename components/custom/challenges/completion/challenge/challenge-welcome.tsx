import { Award, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import {
  Challenge,
  User,
  CompletedTask,
  DailyTask,
  Dimension,
  Task,
  UserChallenge,
} from "@prisma/client";
import Particle from "./particle";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "./animated-counter";

const ChallengeWelcome = ({
  confettiRef,
  completedChallenge,
  tasks,
}: {
  conffetiRef: any;
  completedChallenge: Challenge;
  tasks: (DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  })[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 text-center"
      ref={confettiRef}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[#fe8019] to-[#fabd2f] flex items-center justify-center mb-4"
      >
        <Trophy className="h-10 w-10 text-[#1d2021]" />
      </motion.div>
      <h2 className="text-2xl font-bold text-[#ebdbb2]">
        Challenge Completed!
      </h2>
      <p className="text-[#a89984]">
        Congratulations! You've successfully completed the{" "}
        {completedChallenge.name} challenge.
      </p>

      <div className="relative">
        {/* Background particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Particle key={i} color="#fe8019" speed={1.5} />
        ))}

        <div className="relative z-10 bg-[#1d2021] rounded-lg p-6 border border-[#3c3836]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#fe8019]" />
              <span className="text-[#ebdbb2] font-medium">
                {completedChallenge.name}
              </span>
            </div>
            <Badge className="bg-[#fe8019] text-[#1d2021]">Completed</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Duration</span>
              <span className="text-[#ebdbb2]">
                {completedChallenge.duration} days
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Tasks Completed</span>
              <motion.span
                className="text-[#ebdbb2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatedCounter value={tasks.length || 0} />/
                {tasks.length || 0}
              </motion.span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Spiritual Growth</span>
              <motion.span
                className="text-[#fe8019]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                +<AnimatedCounter value={15} />%
              </motion.span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Experience Gained</span>
              <motion.span
                className="text-[#ebdbb2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                +<AnimatedCounter value={500} /> XP
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex items-center gap-3 p-3 bg-[#282828] rounded-lg border border-[#3c3836]"
        >
          <div className="h-8 w-8 rounded-full bg-[#fe8019] flex items-center justify-center">
            <Trophy className="h-4 w-4 text-[#1d2021]" />
          </div>
          <div>
            <div className="text-[#ebdbb2]">Achievement Unlocked</div>
            <div className="text-xs text-[#a89984]">Challenge Master</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-3 p-3 bg-[#282828] rounded-lg border border-[#3c3836]"
        >
          <div className="h-8 w-8 rounded-full bg-[#8ec07c] flex items-center justify-center">
            <Star className="h-4 w-4 text-[#1d2021]" />
          </div>
          <div>
            <div className="text-[#ebdbb2]">Streak Bonus</div>
            <div className="text-xs text-[#a89984]">
              +3 days added to your streak
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChallengeWelcome;
