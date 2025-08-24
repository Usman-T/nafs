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

  // Parse tasks once
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

  // Init: 13 months centered on current
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

  // After mount: scroll to current month
  useEffect(() => {
    if (api && isMounted && months.length > 0) {
      api.scrollTo(6, false);
    }
  }, [api, isMounted, months.length]);

  // Sync currentMonthIndex on scroll
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrentMonthIndex(index);
    };

    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  // Go to today
  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
    api?.scrollTo(6, true);
    setCurrentMonthIndex(6);
  }, [api]);

  // Date utils
  const isSameDay = useCallback(
    (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString(),
    []
  );

  const getDailyTasks = useCallback(
    (date: Date) => processedDailyTasks.filter((t) => isSameDay(t.date, date)),
    [processedDailyTasks, isSameDay]
  );

  const getStatus = useCallback(
    (date: Date) => {
      const tasks = getDailyTasks(date);
      if (tasks.length === 0) return "none";
      const all = tasks.every((t) => t.completions.length > 0);
      const some = tasks.some((t) => t.completions.length > 0);
      return all ? "complete" : some ? "partial" : "none";
    },
    [getDailyTasks]
  );

  const isToday = useCallback(
    (date: Date) => isSameDay(date, new Date()),
    [isSameDay]
  );

  const isSelected = useCallback(
    (date: Date) => isSameDay(date, selectedDate),
    [selectedDate, isSameDay]
  );

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Memoized month rendering
  const renderMonth = useCallback(
    (month: Date) => {
      const y = month.getFullYear();
      const m = month.getMonth();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const firstDay = new Date(y, m, 1).getDay(); // 0 = Sunday

      const days = [];
      for (let i = 0; i < firstDay; i++) days.push(null);
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(y, m, day));
      }

      return (
        <div className="grid grid-cols-7 gap-2 mt-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div
              key={day}
              className="text-[#a89984] text-xs font-medium text-center py-1"
            >
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
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="cursor-pointer"
                onClick={() => handleDateClick(date)}
              >
                <div
                  className={`
                    h-10 w-10 mx-auto rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all duration-200 relative
                    ${
                      isSel
                        ? "bg-[#3c3836] border-2 border-[#fe8019] shadow-[0_0_16px_#fe8019] text-[#ebdbb2] z-10"
                        : isTod
                        ? "border-2 border-[#fe8019] text-[#ebdbb2] bg-[#282828]"
                        : status === "complete"
                        ? "border border-[#fe8019]/50 bg-[#fe8019]/20 text-[#ebdbb2]"
                        : status === "partial"
                        ? "border border-[#3c3836]/50 bg-[#3c3836]/20 text-[#ebdbb2]"
                        : "border border-[#3c3836]/40 text-[#a89984] hover:border-[#504945]"
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

  // Tasks for selected date
  const selectedDateTasks = useMemo(
    () => getDailyTasks(selectedDate),
    [selectedDate, getDailyTasks]
  );
  const hasTasks = selectedDateTasks.length > 0;
  const completedTasks = useMemo(
    () => selectedDateTasks.filter((t) => t.completions.length > 0),
    [selectedDateTasks]
  );

  const getInsight = useMemo(() => {
    if (!hasTasks) return null;
    const total = selectedDateTasks.length;
    const done = completedTasks.length;
    if (done === total)
      return "Stillness follows action. You honored your path.";
    if (done >= total * 0.7) return "Rhythm found. Keep moving with intention.";
    if (done >= total * 0.4)
      return "You met yourself where you were. That counts.";
    if (done > 0) return "Even a spark can light the way.";
    return "Rest is not failure. Breathe. Begin again.";
  }, [hasTasks, selectedDateTasks, completedTasks]);

  // Mount + loading
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || isLoading) return <CalendarLoading />;

  return (
    <div className="bg-[#1d2021] min-h-screen text-[#ebdbb2]">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="touch-pan-x"
      >
        <Card className="bg-[#1d2021] border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-[#ebdbb2] text-2xl font-bold tracking-tight">
              Calendar
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="h-9 border-[#3c3836] bg-[#282828] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2] font-medium text-sm"
            >
              Today
            </Button>
          </CardHeader>
          <CardContent>
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: false }}
              className="w-full"
            >
              <CarouselContent className="flex z-50">
                {months.map((month) => (
                  <CarouselItem
                    key={month.toISOString()}
                    className="min-w-[280px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[380px] max-w-[480px]"
                  >
                    <div className="bg-[#282828] rounded p-4 h-full border border-[#3c3836]">
                      <h2 className="text-[#ebdbb2] text-lg font-semibold text-center mb-3">
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
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-[#1d2021] border-none shadow-none">
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#fe8019]" />
                <span className="text-[#ebdbb2] text-lg font-medium">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="text-sm text-[#a89984]">
                {hasTasks
                  ? `${completedTasks.length}/${selectedDateTasks.length}`
                  : ""}
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
                  <div className="p-5 text-center rounded-lg border border-dashed border-[#3c3836] bg-[#282828]">
                    <p className="text-sm text-[#a89984]">No tasks scheduled</p>
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
                        className="flex items-center justify-between p-3 rounded-lg bg-[#282828] border border-[#3c3836] hover:border-[#504945] transition-colors"
                      >
                        <div className="flex items-center gap-3">
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
                            className={`text-[#ebdbb2] ${
                              isCompleted ? "line-through opacity-60" : ""
                            }`}
                          >
                            {task.task.name}
                          </span>
                        </div>
                        <div
                          className={`
                            h-7 w-7 rounded-full border-2 flex items-center justify-center
                            transition-all duration-200
                            ${
                              isCompleted
                                ? "bg-[#fe8019] border-[#fe8019]"
                                : "border-[#3c3836] hover:border-[#fe8019]/50"
                            }
                          `}
                        >
                          {isCompleted && (
                            <Check
                              className="h-4 w-4 text-[#1d2021]"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}

                {hasTasks && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 rounded-lg border border-[#3c3836] bg-[#282828]"
                  >
                    <p className="text-sm text-[#a89984] leading-relaxed">
                      {getInsight}
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
