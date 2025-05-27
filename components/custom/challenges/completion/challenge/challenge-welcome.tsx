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

interface TaskWithDimension extends Task {
  dimension: Dimension;
}

interface DailyTaskWithDetails extends DailyTask {
  task: TaskWithDimension;
  completions: CompletedTask[];
  user: User & { 
    currentChallenge: UserChallenge | null;
    currentStreak?: number;
  };
}

interface ChallengeWelcomeProps {
  confettiRef: React.RefObject<HTMLDivElement>;
  completedChallenge: UserChallenge & {
    challenge: Challenge;
  };
  dailyTasks: DailyTaskWithDetails[];
}

const ChallengeWelcome = ({
  confettiRef,
  completedChallenge,
  dailyTasks,
}: ChallengeWelcomeProps) => {
  // Get unique tasks from daily tasks (since daily tasks can repeat across days)
  const uniqueTasks = dailyTasks.reduce((acc, dailyTask) => {
    const taskId = dailyTask.task.id;
    if (!acc.find(task => task.id === taskId)) {
      acc.push(dailyTask.task);
    }
    return acc;
  }, [] as TaskWithDimension[]);

  const totalTasks = uniqueTasks.length;
  const completedTasksCount = dailyTasks.filter(
    (dailyTask) => dailyTask.completions.length > 0
  ).length;

  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasksCount / dailyTasks.length) * 100) : 0;

  const xpGained =
    completedTasksCount * 100 + (completionPercentage === 100 ? 500 : 0);
  
  // Get streak from the first daily task's user (they should all be the same user)
  const streakBonus = dailyTasks[0]?.user?.currentStreak || 0;

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
        You&apos;ve successfully completed the{" "}
        {completedChallenge.challenge.name} challenge.
      </p>

      <div className="relative">
        {Array.from({ length: 12 }).map((_, i) => (
          <Particle key={i} color="#fe8019" speed={1.5} />
        ))}

        <div className="relative z-10 bg-[#1d2021] rounded-lg p-6 border border-[#3c3836]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#fe8019]" />
              <span className="text-[#ebdbb2] font-medium">
                {completedChallenge.challenge.name}
              </span>
            </div>
            <Badge className="bg-[#fe8019] text-[#1d2021]">Completed</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Duration</span>
              <span className="text-[#ebdbb2]">
                {completedChallenge.challenge.duration} days
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Daily Tasks Completed</span>
              <motion.span
                className="text-[#ebdbb2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatedCounter value={completedTasksCount} />/{dailyTasks.length}
              </motion.span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Completion Rate</span>
              <motion.span
                className="text-[#fe8019]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <AnimatedCounter value={completionPercentage} />%
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
                +<AnimatedCounter value={xpGained} /> XP
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
            <div className="text-xs text-[#a89984]">
              {completedChallenge.challenge.name} Master
            </div>
          </div>
        </motion.div>

        {streakBonus > 0 && (
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
              <div className="text-[#ebdbb2]">Current Streak</div>
              <div className="text-xs text-[#a89984]">
                {streakBonus} day{streakBonus !== 1 ? "s" : ""} streak maintained
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChallengeWelcome;