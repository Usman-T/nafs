"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { CompletedTask, DailyTask, Dimension, Task } from "@prisma/client";
import { iconMap } from "@/lib/iconMap";
import CalendarLoading from "./calendar-skeleton";

type ProcessedDailyTask = DailyTask & {
  completions: (CompletedTask & { completedAt: Date })[];
  task: Task & { dimension: Dimension };
  date: Date;
};

const CalendarMain = ({
  dailyTasks,
}: {
  dailyTasks: (Omit<DailyTask, "date"> & {
    completions: (Omit<CompletedTask, "completedAt"> & {
      completedAt: string;
    })[];
    task: Task & { dimension: Dimension };
    date: string;
  })[];
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const processedDailyTasks = useMemo<ProcessedDailyTask[]>(() => {
    return dailyTasks.map((task) => ({
      ...task,
      date: new Date(task.date),
      completions: task.completions.map((completion) => ({
        ...completion,
        completedAt: new Date(completion.completedAt),
      })),
    }));
  }, [dailyTasks]);

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth()));
    setSelectedDate(today);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++)
    calendarDays.push(new Date(year, month, i));

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getDailyTasks = (date: Date) => {
    return processedDailyTasks.filter((task) => isSameDay(task.date, date));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (
      date.getMonth() !== currentMonth.getMonth() ||
      date.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth()));
    }
  };

  const selectedDateTasks = getDailyTasks(selectedDate);
  const completedTasks = selectedDateTasks.filter(
    (task) => task.completions.length > 0
  );

  const getCompletionStatus = (date: Date | null) => {
    if (!date) return "empty";

    const tasks = getDailyTasks(date);
    if (tasks.length === 0) return "none";

    const allComplete = tasks.every((task) => task.completions.length > 0);
    const anyComplete = tasks.some((task) => task.completions.length > 0);

    if (allComplete) return "complete";
    if (anyComplete) return "partial";
    return "none";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return isSameDay(date, today);
  };

  const isSelected = (date: Date | null) => {
    return date ? isSameDay(date, selectedDate) : false;
  };

  if (!isMounted || isLoading) {
    return <CalendarLoading />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-[#ebdbb2]">Calendar</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#3c3836] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                  onClick={goToPreviousMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#3c3836] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                  onClick={goToToday}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#3c3836] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                  onClick={goToNextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-[#a89984] text-sm text-center py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              <AnimatePresence mode="sync">
                {calendarDays.map((date, index) => {
                  const status = getCompletionStatus(date);
                  const dayKey = date ? date.toISOString() : `empty-${index}`;
                  console.log({ status, index });

                  return (
                    <motion.div
                      key={dayKey}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className={`aspect-square p-1 ${
                        date ? "cursor-pointer" : ""
                      }`}
                      onClick={() => date && handleDateClick(date)}
                    >
                      {date ? (
                        <div
                          className={`h-full w-full rounded-md flex flex-col items-center justify-center relative ${
                            isSelected(date)
                              ? "border-2 border-[#fe8019] bg-[#3c3836] shadow-[0_0_10px_#fe8019] text-[#ebdbb2]"
                              : isToday(date)
                              ? "border-2 border-[#fe8019] text-[#ebdbb2]"
                              : status === "complete"
                              ? "bg-[#fe8019] text-[#1d2021]"
                              : status === "partial"
                              ? "bg-[#3c3836] text-[#ebdbb2]"
                              : "border border-[#3c3836] text-[#a89984]"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {date.getDate()}
                          </span>
                        </div>
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-[#fe8019] mr-2" />
                <span className="text-[#ebdbb2]">
                  {formatDate(selectedDate)}
                </span>
              </div>
              <div className="text-sm text-[#a89984]">
                {completedTasks.length}/{selectedDateTasks.length} completed
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDate.toISOString()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedDateTasks.map((dailyTask, i) => {
                      const IconComponent =
                        iconMap[dailyTask.task.dimension.icon] || Check;
                      const isCompleted = dailyTask.completions.length > 0;
                      return (
                        <motion.div
                          key={dailyTask.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex mb-2 items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]"
                        >
                          <div className="flex items-center">
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                              style={{
                                backgroundColor:
                                  dailyTask.task.dimension.color + "20",
                              }}
                            >
                              <IconComponent
                                className="h-4 w-4"
                                style={{
                                  color: dailyTask.task.dimension.color,
                                }}
                              />
                            </div>
                            <span
                              className={`text-[#ebdbb2] ${
                                isCompleted ? "line-through opacity-70" : ""
                              }`}
                            >
                              {dailyTask.task.name}
                            </span>
                          </div>
                          <div
                            className={`h-7 w-7 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                              isCompleted
                                ? "bg-[#fe8019] border-[#fe8019]"
                                : "border-[#3c3836]"
                            }`}
                            style={{ flexShrink: 0 }}
                          >
                            {isCompleted && (
                              <Check
                                className="h-4 w-4 text-[#1d2021]"
                                strokeWidth={2.5}
                              />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                    {selectedDateTasks.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 p-4 rounded-md bg-[#1d2021] border border-[#3c3836]"
                      >
                        <h3 className="text-[#ebdbb2] font-medium mb-2">
                          Daily Reflection
                        </h3>
                        <p className="text-sm text-[#a89984]">
                          {(() => {
                            const total = selectedDateTasks.length;
                            const completed = completedTasks.length;
                            const ratio = completed / total;
                            if (completed === total) {
                              return "Excellent work today! You've completed all your tasks. Keep up the momentum and stay consistent in your spiritual journey.";
                            } else if (ratio >= 0.5) {
                              return "Solid progress today. Reflect on what helped you stay on track, and where you might improve tomorrow.";
                            } else if (completed > 0) {
                              return "Some effort is better than none. Consider what distractions or obstacles came up today and how to navigate them.";
                            } else {
                              return "Today was a tough day. Take a moment to reset, and remind yourself that every new day is a fresh chance to grow.";
                            }
                          })()}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CalendarMain;
