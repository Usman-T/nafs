"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Sparkles, Check } from "lucide-react";
import { isSameDay } from "date-fns";
import TaskCard from "./task-card";
import {
  DailyTask,
  Task,
  Dimension,
  CompletedTask,
  User,
  UserChallenge,
} from "@prisma/client";

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

      {isToday && allTasksCompleted && !isTodayCompleted() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-6"
        >
          <Button
            onClick={onShowCompletionFlow}
            disabled={isCompletingDay}
            className="w-full py-4 px-4 rounded-2xl bg-[#fe8019] text-[#1d2021] font-bold text-base shadow-md hover:bg-[#d65d0e] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 stroke-[2.2]" />
              <span>{isCompletingDay ? "Completing..." : "Complete Day"}</span>
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
          </Button>
        </motion.div>
      )}

      {isTodayCompleted() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-6"
        >
          <Button
            disabled
            className="w-full bg-[#a8d08d] text-[#1d2021] py-3 rounded-xl font-semibold text-base opacity-90 cursor-default"
          >
            <div className="flex items-center justify-center gap-2">
              <Check className="h-5 w-5 stroke-[2.5]" />
              <span className="tracking-tight">Day Complete</span>
            </div>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default TasksSection;
