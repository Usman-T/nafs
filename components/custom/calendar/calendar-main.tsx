"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import { CompletedTask, DailyTask, Dimension, Task } from "@prisma/client";
import { iconMap } from "@/lib/iconMap";
import CalendarLoading from "./calendar-skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [api, setApi] = useState<CarouselApi>(null);
  const [months, setMonths] = useState<Date[]>([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(6);

  // Process tasks
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

  // Initialize centered months
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const initialMonths = Array.from({ length: 13 }, (_, i) => {
      const offset = i - 6;
      return new Date(currentYear, currentMonth + offset, 1);
    });

    setMonths(initialMonths);
    setCurrentMonthIndex(6);
  }, []);

  // Initialize carousel at center
  useEffect(() => {
    if (api && months.length > 0 && isMounted) {
      const init = () => api.scrollTo(6, false);
      // Delay slightly to ensure DOM is ready
      const timer = setTimeout(init, 50);
      return () => clearTimeout(timer);
    }
  }, [api, months.length, isMounted]);

  // Infinite scroll handler
  useEffect(() => {
    if (!api) return;

    const handleScroll = () => {
      const progress = api.scrollProgress();
      const selectedIndex = api.selectedScrollSnap();
      setCurrentMonthIndex(selectedIndex);

      // Append more months at the end
      if (progress > 0.85 && selectedIndex >= months.length - 3) {
        const lastMonth = months[months.length - 1];
        const newMonths = Array.from({ length: 6 }, (_, i) => {
          const next = new Date(lastMonth);
          next.setMonth(next.getMonth() + i + 1);
          return next;
        });
        setMonths((prev) => [...prev, ...newMonths]);
      }

      // Prepend months at the start
      if (progress < 0.15 && selectedIndex <= 2) {
        const firstMonth = months[0];
        const newMonths = Array.from({ length: 6 }, (_, i) => {
          const prev = new Date(firstMonth);
          prev.setMonth(prev.getMonth() - (6 - i));
          return prev;
        });
        setMonths((prev) => [...newMonths, ...prev]);
        setCurrentMonthIndex((prev) => prev + 6);

        // Re-sync carousel position after prepend
        setTimeout(() => {
          api.scrollTo(selectedIndex + 6, false);
        }, 10);
      }
    };

    api.on("scroll", handleScroll);
    api.on("select", handleScroll);

    return () => {
      api.off("scroll", handleScroll);
      api.off("select", handleScroll);
    };
  }, [api, months]);

  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  // Go to today
  const goToToday = useCallback(() => {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}`;
    const index = months.findIndex(
      (m) => `${m.getFullYear()}-${m.getMonth()}` === todayKey
    );

    setSelectedDate(today);

    if (index >= 0 && api) {
      api.scrollTo(index, true);
      setCurrentMonthIndex(index);
    } else {
      const newMonths = Array.from({ length: 13 }, (_, i) => {
        const offset = i - 6;
        return new Date(today.getFullYear(), today.getMonth() + offset, 1);
      });
      setMonths(newMonths);
      setCurrentMonthIndex(6);
      setTimeout(() => {
        if (api) api.scrollTo(6, true);
      }, 100);
    }
  }, [api, months]);

  // Helpers
  const isSameDay = (d1: Date, d2: Date) =>
    d1.toDateString() === d2.toDateString();

  const getDailyTasks = useCallback(
    (date: Date) => processedDailyTasks.filter((t) => isSameDay(t.date, date)),
    [processedDailyTasks]
  );

  const getCompletionStatus = useCallback(
    (date: Date | null) => {
      if (!date) return "empty";
      const tasks = getDailyTasks(date);
      if (tasks.length === 0) return "none";
      const all = tasks.every((t) => t.completions.length > 0);
      const some = tasks.some((t) => t.completions.length > 0);
      return all ? "complete" : some ? "partial" : "none";
    },
    [getDailyTasks]
  );

  const isToday = useCallback(
    (date: Date | null) => {
      if (!date) return false;
      return isSameDay(date, new Date());
    },
    []
  );

  const isSelected = useCallback(
    (date: Date | null) => {
      return date ? isSameDay(date, selectedDate) : false;
    },
    [selectedDate]
  );

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Render month
  const renderMonth = useCallback(
    (month: Date) => {
      const year = month.getFullYear();
      const monthIdx = month.getMonth();
      const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
      const firstDay = new Date(year, monthIdx, 1).getDay();

      const days = [];
      for (let i = 0; i < firstDay; i++) days.push(null);
      for (let day = 1; day <= daysInMonth; day++)
        days.push(new Date(year, monthIdx, day));

      return (
        <div className="grid grid-cols-7 gap-1.5 mt-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-[#a89984] text-[0.65rem] font-medium text-center py-1"
            >
              {day}
            </div>
          ))}
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-9" />;
            const status = getCompletionStatus(date);
            const isSel = isSelected(date);
            const isTod = isToday(date);

            return (
              <motion.div
                key={date.toISOString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer"
                onClick={() => handleDateClick(date)}
              >
                <div
                  className={`
                    h-9 w-9 mx-auto rounded-md flex items-center justify-center text-xs font-medium
                    transition-all duration-200 hover:shadow-sm
                    ${isSel
                      ? "bg-[#3c3836] border-2 border-[#fe8019] shadow-[0_0_12px_#fe8019] text-[#ebdbb2] z-10"
                      : isTod && status === "complete"
                      ? "bg-[#fe8019] text-[#1d2021] shadow-[0_0_10px_#fe8019]"
                      : isTod && status === "partial"
                      ? "bg-[#3c3836] text-[#ebdbb2] shadow-[0_0_8px_rgba(60,56,54,0.5)]"
                      : isTod
                      ? "border border-[#fe8019] text-[#ebdbb2]"
                      : status === "complete"
                      ? "bg-[#fe8019] text-[#1d2021]"
                      : status === "partial"
                      ? "bg-[#3c3836] text-[#ebdbb2]"
                      : "text-[#a89984] hover:bg-[#3c3836]/30"
                    }
                  `}
                >
                  {date.getDate()}
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    },
    [getCompletionStatus, isSelected, isToday, handleDateClick]
  );

  const selectedDateTasks = useMemo(() => getDailyTasks(selectedDate), [selectedDate, getDailyTasks]);
  const completedTasks = selectedDateTasks.filter(t => t.completions.length > 0);

  if (!isMounted || isLoading) {
    return <CalendarLoading />;
  }

  return (
    <div className="space-y-6 px-3 py-4 max-w-full">
      {/* Calendar Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="touch-pan-x"
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-[#ebdbb2] text-lg">Calendar</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="h-8 border-[#3c3836] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2] text-xs px-3"
            >
              Today
            </Button>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="relative">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: false,
                  dragFree: false,
                  containScroll: "trimSnaps",
                }}
                className="w-full"
              >
                <CarouselContent className="flex h-80">
                  {months.map((month) => (
                    <CarouselItem
                      key={month.toISOString()}
                      className="pl-0 min-w-[280px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[380px] flex-shrink-0 px-2"
                    >
                      <div className="bg-[#1d2021]/40 rounded-lg p-3 h-full">
                        <h2 className="text-[#ebdbb2] text-base font-semibold text-center mb-3">
                          {month.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h2>
                        {renderMonth(month)}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-[#282828] border-[#3c3836]">
          <CardHeader className="pb-3">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center text-sm font-medium">
                <Calendar className="h-5 w-5 text-[#fe8019] mr-2" />
                <span className="text-[#ebdbb2]">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="text-xs text-[#a89984]">
                {completedTasks.length}/{selectedDateTasks.length} completed
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDate.toDateString()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {selectedDateTasks.length === 0 ? (
                  <div className="p-5 text-center rounded-lg border border-dashed border-[#3c3836] bg-[#1d2021]/30">
                    <Calendar className="h-6 w-6 mx-auto text-[#a89984]/70 mb-2" />
                    <p className="text-sm text-[#a89984]">No practices today</p>
                  </div>
                ) : (
                  selectedDateTasks.map((task, i) => {
                    const Icon = iconMap[task.task.dimension.icon] || Check;
                    const isCompleted = task.completions.length > 0;

                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#1d2021]/60 border border-[#3c3836] hover:border-[#504945]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: `${task.task.dimension.color}20`,
                            }}
                          >
                            <Icon
                              className="h-4 w-4"
                              style={{ color: task.task.dimension.color }}
                            />
                          </div>
                          <span
                            className={`text-[#ebdbb2] text-sm truncate ${
                              isCompleted ? "line-through opacity-60" : ""
                            }`}
                          >
                            {task.task.name}
                          </span>
                        </div>
                        <div
                          className={`
                            h-7 w-7 rounded-full border-2 flex items-center justify-center
                            transition-transform duration-200
                            ${isCompleted
                              ? "bg-[#fe8019] border-[#fe8019] scale-110"
                              : "border-[#3c3836] hover:border-[#fe8019]/50"
                            }
                          `}
                        >
                          {isCompleted && (
                            <Check className="h-4 w-4 text-[#1d2021]" strokeWidth={3} />
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 p-4 rounded-lg border border-[#3c3836]/50 bg-[#1d2021]/40"
                >
                  <h3 className="text-[#ebdbb2] font-medium mb-2 flex items-center gap-2 text-sm">
                    <span className="inline-block w-1 h-1 rounded-full bg-[#fe8019] mr-2"></span>
                    Reflection
                  </h3>
                  <p className="text-xs text-[#a89984] leading-relaxed">
                    {selectedDateTasks.length === 0
                      ? "Rest in stillness. Not every day needs doing."
                      : completedTasks.length === selectedDateTasks.length
                      ? "Harmony achieved. Your discipline honors your path."
                      : completedTasks.length / selectedDateTasks.length >= 0.6
                      ? "Good rhythm today. You stayed aligned with intention."
                      : completedTasks.length > 0
                      ? "You showed up. That is enough. Forgive the gaps."
                      : "A quiet day. Breathe. Tomorrow is a new offering."}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CalendarMain;