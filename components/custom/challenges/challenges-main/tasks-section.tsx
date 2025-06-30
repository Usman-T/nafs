"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Sparkles, Check, Star } from "lucide-react";
import { isSameDay } from "date-fns";
import TaskCard from "./task-card";
import { DailyTask, Task, Dimension, CompletedTask, User, UserChallenge } from "@prisma/client";

interface TasksSectionProps {
  selectedDate: Date;
  tasks: (DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  })[];
  today: Date;
  currentDay: number;
  isTodayCompleted: () => boolean;
  isCompletingDay: boolean;
  hasCompletedChallenge: boolean;
  onShowCompletionFlow: () => void;
}

const TasksSection = ({
  selectedDate,
  tasks,
  today,
  currentDay,
  isTodayCompleted,
  isCompletingDay,
  hasCompletedChallenge,
  onShowCompletionFlow,
}: TasksSectionProps) => {
  const selectedDateTasks = tasks.filter(
    (task) => task.date.toDateString() === selectedDate.toDateString()
  );

  const completedTasks = selectedDateTasks.filter((task) =>
    task.completions.some((c) =>
      isSameDay(new Date(c.completedAt), selectedDate)
    )
  );

  const isToday = selectedDate.toDateString() === today.toDateString();
  const allTasksCompleted =
    selectedDateTasks.length > 0 &&
    selectedDateTasks.every((task) => task.completions.length > 0);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#ebdbb2]">
          {isToday
            ? "Today's Tasks"
            : `${selectedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}`}
        </h3>
        <Badge className="bg-[#fe8019]/20 text-[#fe8019] border border-[#fe8019]/30">
          Day {currentDay}
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate.toDateString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {selectedDateTasks.length > 0 ? (
            selectedDateTasks.map((dailyTask, i) => (
              <TaskCard
                key={dailyTask.id}
                dailyTask={dailyTask}
                selectedDate={selectedDate}
                isToday={isToday}
                index={i}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#282828] rounded-2xl p-8 border border-[#3c3836] text-center"
            >
              <Calendar className="w-12 h-12 text-[#a89984] mx-auto mb-4 opacity-60" />
              <p className="text-[#a89984] text-lg mb-2">No tasks scheduled</p>
              <p className="text-[#a89984] text-sm">
                for{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Complete Day Button */}
      {isToday && allTasksCompleted && !isTodayCompleted() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <Button
            className="w-full bg-gradient-to-r from-[#fe8019] to-[#fabd2f] text-[#1d2021] hover:from-[#d65d0e] hover:to-[#fe8019] py-4 rounded-2xl font-bold text-lg shadow-lg"
            onClick={onShowCompletionFlow}
            size="lg"
            disabled={isCompletingDay}
          >
            <div className="flex items-center justify-center gap-3">
              <Award className="h-6 w-6" />
              <span>{isCompletingDay ? "Completing..." : "Complete Day"}</span>
              <Sparkles className="h-5 w-5" />
            </div>
          </Button>
        </motion.div>
      )}

      {/* Day Complete Button */}
      {(isTodayCompleted() || (hasCompletedChallenge && isToday)) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Button
            className="w-full bg-gradient-to-r from-[#8ec07c] to-[#b8bb26] text-[#1d2021] py-4 rounded-2xl font-bold text-lg shadow-lg"
            size="lg"
            disabled
          >
            <div className="flex items-center justify-center gap-3">
              <Check className="h-6 w-6" />
              <span>Day Complete!</span>
              <Star className="h-5 w-5" />
            </div>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default TasksSection;
