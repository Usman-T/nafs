"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Challenge,
  CompletedTask,
  DailyTask,
  Dimension,
  Task,
} from "@prisma/client";
import { iconMap } from "@/lib/iconMap";
import Link from "next/link";
import { useState } from "react";

const Tasks = ({
  dailyTasks,
  challenge,
}: {
  dailyTasks: (DailyTask & {
    completions: CompletedTask[];
    task: Task & { dimension: Dimension };
  })[];
  challenge: Challenge;
}) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateDateRange = (start: Date, days: number) =>
    Array.from({ length: days }).map((_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() - i);
      return date;
    });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = generateDateRange(today, 8);
  const selectedDayTasks = dailyTasks.filter(
    (t) => t.date.toDateString() === selectedDate.toDateString()
  );

  const completedTasks = selectedDayTasks.filter(
    (task) => task.completions.length > 0
  );

  const allTasksCompleted =
    selectedDayTasks.length > 0 &&
    selectedDayTasks.every((task) => task.completions.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 h-full"
    >
      <Card className="h-full flex flex-col bg-[#282828] border-[#3c3836]">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center justify-between text-[#ebdbb2]">
            <span className="text-2xl font-bold">Daily Tasks</span>
            <span className="text-lg font-medium text-[#a89984]">
              {completedTasks.length}/{selectedDayTasks.length}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-6">
          <div className="space-y-4">
            <Progress
              value={
                (completedTasks.length / (selectedDayTasks.length || 1)) * 100
              }
              className="h-2 bg-[#1d2021]"
            />

            <div className="flex items-center gap-2">
              <div
                id="date-scroll-container"
                className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide py-2"
              >
                
                {dates.reverse().map((date, i) => {
                  const dateTasks = dailyTasks.filter(
                    (t) => t.date.toDateString() === date.toDateString()
                  );
                  const allCompleted =
                    dateTasks.length > 0 &&
                    dateTasks.every((t) => t.completions.length > 0);

                  const isToday = date.toDateString() === today.toDateString();
                  const isSelected =
                    date.toDateString() === selectedDate.toDateString();

                  return (
                
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`flex flex-col items-center min-w-[50px] p-2 rounded-lg transition-colors relative
        ${isSelected ? "bg-[#3c3836] text-[#fe8019]" : "hover:bg-[#3c3836]/50"}
        ${isToday ? "border border-[#fe8019]" : ""}`}
                    >
                      <div className="text-sm font-medium">
                        {weekdays[date.getDay()].substring(0, 1)}
                      </div>
                      <div className="text-base mt-1">{date.getDate()}</div>
                      {isToday && (
                        <div className="absolute -top-2 right-0 text-[10px] text-[#fe8019] font-bold">
                          Today
                        </div>
                      )}
                      <div
                        className={`h-1.5 w-1.5 rounded-full mt-1.5 ${
                          allCompleted ? "bg-[#fe8019]" : "bg-[#3c3836]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-[#a89984] text-base">
              {allTasksCompleted ? (
                <span className="text-[#fe8019] font-medium">
                  All tasks completed for this day! 🎉
                </span>
              ) : selectedDayTasks.length === 0 ? (
                <span className="text-[#a89984] italic">
                  No tasks scheduled for this day
                </span>
              ) : (
                <>
                  Complete all tasks for{" "}
                  <span className="text-[#fe8019] font-medium">
                    {challenge.duration} consecutive days
                  </span>{" "}
                  to advance
                </>
              )}
            </p>
          </div>

          <div className="space-y-6 flex-1 min-h-[300px]">
            {selectedDayTasks.length > 0 ? (
              <div className="space-y-4">
                {selectedDayTasks.map((dayTask, i) => {
                  const IconComponent =
                    iconMap[dayTask.task.dimension.icon] || "BookOpen";
                  const isCompleted = dayTask.completions.length > 0;

                  return (
                    <Link
                      key={i}
                      href="/dashboard/challenges"
                      className="flex items-center justify-between"
                    >
                      <div className="flex hover:cursor-pointer items-center">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <IconComponent
                            className="h-5 w-5"
                            style={{
                              color: dayTask.task.dimension.color,
                              borderColor: dayTask.task.dimension.color,
                            }}
                          />
                        </div>
                        <span
                          className="text-base font-medium"
                          style={{ color: dayTask.task.dimension.color }}
                        >
                          {dayTask.task.name}
                        </span>
                      </div>
                      <div
                        className={`h-7 w-7 rounded-full border ${
                          isCompleted
                            ? "bg-[#fe8019] border-[#fe8019]"
                            : "bg-transparent border-[#3c3836]"
                        } flex items-center justify-center transition-all duration-200`}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4 text-[#1d2021]" />
                        ) : (
                          <Check className="h-4 w-4 text-[#3c3836] opacity-0" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-[#a89984] italic">
                No tasks for this day
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Tasks;
