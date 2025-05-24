"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompletedTask, DailyTask, Dimension, Task } from "@prisma/client";
import { useMemo } from "react";
import { isSameDay } from "date-fns";

type ProcessedDailyTask = DailyTask & {
  completions: CompletedTask[];
  task: Task & { dimension: Dimension };
  date: Date;
};

const DashboardCalendar = ({
  dailyTasks,
}: {
  dailyTasks: (DailyTask & {
    completions: CompletedTask[];
    task: Task & { dimension: Dimension };
    date: Date;
  })[];
}) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const tasksByDate = useMemo(() => {
    const map = new Map<string, ProcessedDailyTask[]>();

    dailyTasks.forEach((task) => {
      const dateStr = task.date.toISOString().split("T")[0];
      if (!map.has(dateStr)) {
        map.set(dateStr, []);
      }
      map.get(dateStr)?.push(task);
    });

    return map;
  }, [dailyTasks]);

  const getDayStatus = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split("T")[0];
    const tasks = tasksByDate.get(dateStr) || [];

    if (tasks.length === 0) return "none";

    // Compare completions with the current 'date' (day in the calendar), not today's date
    const completedTasks = tasks.filter((task) =>
      task.completions.some((c) => isSameDay(new Date(c.completedAt), date))
    ).length;

    if (completedTasks === tasks.length) return "completed";
    if (completedTasks > 0) return "partial";
    return "none";
  };

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDayOfMonth, daysInMonth]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-[#ebdbb2]">Monthly Progress</span>
            <Link
              href="/dashboard/calendar"
              className="text-[#fe8019] text-sm hover:underline"
            >
              Full View
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center gap-6 mb-4">
              <span className="text-[#ebdbb2] border-b-2 border-[#ebdbb2] pb-1">
                {new Date().toLocaleString("default", { month: "long" })}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-6">
              {weekdays.map((day, i) => (
                <div key={i} className="text-[#a89984] text-xs text-center">
                  {day.charAt(0)}
                </div>
              ))}

              {calendarDays.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} className="h-8 w-8" />;
                }

                const status = getDayStatus(day);
                const isToday =
                  day === today.getDate() && currentMonth === today.getMonth();

                return (
                  <div key={day} className="flex justify-center">
                    <div
                      className={`h-8 w-8 rounded-md flex items-center justify-center ${
                        status === "completed"
                          ? "bg-[#fe8019] text-[#1d2021]"
                          : status === "partial"
                          ? "bg-[#3c3836] text-[#ebdbb2]"
                          : isToday
                          ? "border-2 border-[#fe8019] text-[#ebdbb2]"
                          : "border border-[#3c3836] text-[#a89984]"
                      }`}
                    >
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-sm text-[#a89984] mt-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-[#fe8019] rounded-sm mr-2"></div>
                <span>All tasks completed</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-[#3c3836] rounded-sm mr-2"></div>
                <span>Partial completion</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 border border-[#3c3836] rounded-sm mr-2"></div>
                <span>No tasks completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCalendar;
