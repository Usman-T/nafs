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
      completions: task.completions.map((c) => ({
        ...c,
        completedAt: new Date(c.completedAt),
      })),
    }));
  }, [dailyTasks]);

  // Init centered months
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    const y = today.getFullYear();
    const m = today.getMonth();
    const newMonths = Array.from({ length: 13 }, (_, i) => {
      const offset = i - 6;
      return new Date(y, m + offset, 1);
    });
    setMonths(newMonths);
    setCurrentMonthIndex(6);
  }, []);

  // Set carousel to center
  useEffect(() => {
    if (api && months.length > 0 && isMounted) {
      setTimeout(() => api.scrollTo(6, false), 50);
    }
  }, [api, months.length, isMounted]);

  // Infinite scroll
  useEffect(() => {
    if (!api) return;

    const handleScroll = () => {
      const progress = api.scrollProgress();
      const idx = api.selectedScrollSnap();
      setCurrentMonthIndex(idx);

      // Append
      if (progress > 0.85 && idx >= months.length - 3) {
        const last = months[months.length - 1];
        const newOnes = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(last);
          d.setMonth(d.getMonth() + i + 1);
          return d;
        });
        setMonths((prev) => [...prev, ...newOnes]);
      }

      // Prepend
      if (progress < 0.15 && idx <= 2) {
        const first = months[0];
        const newOnes = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(first);
          d.setMonth(d.getMonth() - (6 - i));
          return d;
        });
        setMonths((prev) => [...newOnes, ...prev]);
        setCurrentMonthIndex((prev) => prev + 6);
        setTimeout(() => api.scrollTo(idx + 6, false), 10);
      }
    };

    api.on("scroll", handleScroll);
    api.on("select", handleScroll);
    return () => {
      api.off("scroll", handleScroll);
      api.off("select", handleScroll);
    };
  }, [api, months]);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth()}`;
    const idx = months.findIndex((m) => `${m.getFullYear()}-${m.getMonth()}` === key);

    setSelectedDate(today);
    if (idx >= 0 && api) {
      api.scrollTo(idx, true);
      setCurrentMonthIndex(idx);
    } else {
      const y = today.getFullYear();
      const m = today.getMonth();
      const newMonths = Array.from({ length: 13 }, (_, i) => new Date(y, m + i - 6, 1));
      setMonths(newMonths);
      setCurrentMonthIndex(6);
      setTimeout(() => api?.scrollTo(6, true), 100);
    }
  }, [api, months]);

  const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

  const getDailyTasks = useCallback(
    (date: Date) => processedDailyTasks.filter((t) => isSameDay(t.date, date)),
    [processedDailyTasks]
  );

  const getStatus = useCallback(
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

  const isToday = useCallback((date: Date | null) => date ? isSameDay(date, new Date()) : false, []);
  const isSelected = useCallback((date: Date | null) => date ? isSameDay(date, selectedDate) : false, [selectedDate]);

  const handleDateClick = useCallback((date: Date) => setSelectedDate(date), []);

  const renderMonth = useCallback(
    (month: Date) => {
      const y = month.getFullYear();
      const m = month.getMonth();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const firstDay = new Date(y, m, 1).getDay();

      const days = [];
      for (let i = 0; i < firstDay; i++) days.push(null);
      for (let day = 1; day <= daysInMonth; day++) days.push(new Date(y, m, day));

      return (
        <div className="grid grid-cols-7 gap-2 mt-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="text-[#a89984] text-xs font-medium text-center py-1">
              {day}
            </div>
          ))}
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-10" />;
            const status = getStatus(date);
            const isSel = isSelected(date);
            const isTod = isToday(date);

            return (
              <motion.div
                key={date.toISOString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="cursor-pointer"
                onClick={() => handleDateClick(date)}
              >
                <div
                  className={`
                    h-10 w-10 mx-auto rounded-xl flex items-center justify-center text-sm font-semibold
                    transition-all duration-300 relative
                    ${
                      isSel
                        ? "bg-[#3c3836] border-2 border-[#fe8019] shadow-[0_0_20px_#fe8019] text-[#ebdbb2] z-20 scale-110"
                        : isTod && status === "complete"
                        ? "bg-[#fe8019]/90 text-[#1d2021] shadow-[0_0_16px_#fe8019]"
                        : isTod && status === "partial"
                        ? "bg-[#3c3836] text-[#ebdbb2] shadow-[0_0_12px_rgba(60,56,54,0.6)]"
                        : isTod
                        ? "border-2 border-[#fe8019] text-[#ebdbb2] shadow-[0_0_8px_rgba(254,128,25,0.3)]"
                        : status === "complete"
                        ? "bg-[#fe8019]/70 text-[#1d2021] hover:bg-[#fe8019]"
                        : status === "partial"
                        ? "bg-[#3c3836]/60 text-[#ebdbb2] hover:bg-[#3c3836]"
                        : "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]/30"
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
    [getStatus, isSelected, isToday, handleDateClick]
  );

  const selectedDateTasks = useMemo(() => getDailyTasks(selectedDate), [selectedDate, getDailyTasks]);
  const hasTasks = selectedDateTasks.length > 0;
  const completedTasks = selectedDateTasks.filter(t => t.completions.length > 0);

  if (!isMounted || isLoading) return <CalendarLoading />;

  return (
    <div className="space-y-6 px-4 py-5 max-w-full bg-[#1d2021] min-h-screen text-[#ebdbb2]">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="touch-pan-x"
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[#ebdbb2] text-xl font-light">Calendar</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="h-9 border-[#504945] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2] font-medium"
            >
              Today
            </Button>
          </CardHeader>
          <CardContent className="pb-2">
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: false, dragFree: false }}
              className="w-full"
            >
              <CarouselContent className="flex h-80">
                {months.map((month) => (
                  <CarouselItem
                    key={month.toISOString()}
                    className="pl-0 min-w-[280px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[380px] px-2 flex-shrink-0"
                  >
                    <div className="bg-[#1d2021]/60 rounded-xl p-4 h-full backdrop-blur-sm border border-[#3c3836]/30">
                      <h2 className="text-[#ebdbb2] text-lg font-bold text-center mb-3 tracking-tight">
                        {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </h2>
                      {renderMonth(month)}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#fe8019]" />
                <span className="text-[#ebdbb2] font-medium">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="text-sm text-[#a89984]">
                {hasTasks ? `${completedTasks.length}/${selectedDateTasks.length}` : "No tasks"}
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
                {!hasTasks ? (
                  <div className="p-6 text-center rounded-xl border border-dashed border-[#3c3836]/50 bg-[#1d2021]/40">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#3c3836]/30 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-[#a89984]" />
                    </div>
                    <p className="text-sm text-[#a89984]">No practices scheduled</p>
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
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-[#1d2021]/60 border border-[#3c3836]/40 hover:border-[#fe8019]/40 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                            style={{
                              backgroundColor: `${task.task.dimension.color}20`,
                            }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: task.task.dimension.color }}
                            />
                          </div>
                          <span
                            className={`text-[#ebdbb2] font-medium ${
                              isCompleted ? "line-through opacity-60" : ""
                            }`}
                          >
                            {task.task.name}
                          </span>
                        </div>
                        <motion.div
                          whileTap={{ scale: 0.85 }}
                          className={`
                            h-8 w-8 rounded-full border-2 flex items-center justify-center
                            transition-all duration-300
                            ${isCompleted
                              ? "bg-[#fe8019] border-[#fe8019] shadow-[0_0_12px_#fe8019]"
                              : "border-[#3c3836] hover:border-[#fe8019] hover:shadow-[0_0_8px_rgba(254,128,25,0.3)]"
                            }
                          `}
                        >
                          {isCompleted && (
                            <Check className="h-5 w-5 text-[#1d2021]" strokeWidth={3} />
                          )}
                        </motion.div>
                      </motion.div>
                    );
                  })
                )}

                {hasTasks && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-5 p-4 rounded-xl border border-[#3c3836]/50 bg-gradient-to-r from-[#3c3836]/30 to-transparent"
                  >
                    <h3 className="text-[#ebdbb2] font-medium mb-1 text-sm flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#fe8019]"></span>
                      Insight
                    </h3>
                    <p className="text-xs text-[#a89984] leading-relaxed">
                      {completedTasks.length === selectedDateTasks.length
                        ? "Perfect harmony. Your energy is aligned."
                        : completedTasks.length / selectedDateTasks.length >= 0.7
                        ? "Strong flow today. Keep honoring your rhythm."
                        : completedTasks.length > 0
                        ? "You showed up. That’s the first step."
                        : "Rest is part of the journey. Breathe."}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CalendarMain;