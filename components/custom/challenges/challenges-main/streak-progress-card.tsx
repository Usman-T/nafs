"use client";

import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { isSameDay } from "date-fns";
import { DailyTask, Task, Dimension, CompletedTask, User, UserChallenge } from "@prisma/client";

interface StreakProgressCardProps {
  currentStreak: number;
  selectedDate: Date;
  tasks: (DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  })[];
  today: Date;
}

const StreakProgressCard = ({
  currentStreak,
  selectedDate,
  tasks,
  today,
}: StreakProgressCardProps) => {
  const selectedDateTasks = tasks.filter(
    (task) => task.date.toDateString() === selectedDate.toDateString()
  );

  const completedTasks = selectedDateTasks.filter((task) =>
    task.completions.some((c) =>
      isSameDay(new Date(c.completedAt), selectedDate)
    )
  );

  const isToday = selectedDate.toDateString() === today.toDateString();
  const completionPercentage =
    selectedDateTasks.length > 0
      ? (completedTasks.length / selectedDateTasks.length) * 100
      : 0;

  const allTasksCompleted =
    selectedDateTasks.length > 0 &&
    selectedDateTasks.every((task) => task.completions.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-[#282828] rounded-3xl p-6 border border-[#3c3836] mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 bg-[#fe8019] rounded-2xl flex items-center justify-center">
              <Flame className="w-7 h-7 text-[#1d2021]" />
            </div>
            <motion.div
              className="absolute -inset-1 bg-[#fe8019] rounded-2xl opacity-20"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#ebdbb2]">
              {currentStreak}
            </div>
            <div className="text-sm text-[#a89984]">Day Streak</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-[#fe8019]">
            {Math.round(completionPercentage)}%
          </div>
          <div className="text-sm text-[#a89984]">
            {isToday
              ? "Today"
              : selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
          </div>
        </div>
      </div>

      <div className="relative h-3 bg-[#1d2021] rounded-full overflow-hidden mb-3">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#fe8019] to-[#fabd2f] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-[#a89984]">
          {completedTasks.length} of {selectedDateTasks.length} completed
        </span>
        {allTasksCompleted && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[#8ec07c] font-semibold flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            Complete!
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default StreakProgressCard;
