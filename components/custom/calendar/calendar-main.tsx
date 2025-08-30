"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
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
  dailyTasks: rawDailyTasks,
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [months, setMonths] = useState<Date[]>([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(6);

  // Parse dates once — critical
  const processedDailyTasks = useMemo<ProcessedDailyTask[]>(() => {
    return rawDailyTasks.map((task) => ({
      ...task,
      date: new Date(task.date),
      completions: task.completions.map((c) => ({
        ...c,
        completedAt: new Date(c.completedAt),
      })),
    }));
  }, [rawDailyTasks]);

  // Generate 13 months: -6 to +6 from current
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const newMonths = Array.from({ length: 13 }, (_, i) => {
      const d = new Date(year, month + i - 6, 1);
      return new Date(d.getFullYear(), d.getMonth(), 1); // Normalize
    });
    setMonths(newMonths);
  }, []);

  // Scroll to "today" month on mount
  useEffect(() => {
    if (api && months.length > 0) {
      api.scrollTo(6, false);
    }
  }, [api, months.length]);

  // Sync index with carousel
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentMonthIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  // Go to today
  const goToToday = () => {
    setSelectedDate(new Date());
    api?.scrollTo(6, true);
    setCurrentMonthIndex(6);
  };

  // Fast date equality
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Get tasks for a date
  const getDailyTasks = (date: Date) =>
    processedDailyTasks.filter((t) => isSameDay(t.date, date));

  // Get completion status
  const getStatus = (date: Date) => {
    const tasks = getDailyTasks(date);
    if (tasks.length === 0) return "none";
    const completed = tasks.filter((t) => t.completions.length > 0).length;
    return completed === tasks.length ? "complete" : "partial"; 
  };

  const isToday = (date: Date) => isSameDay(date, new Date());

  // Render a single month efficiently
  const renderMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthIdx = month.getMonth();
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, monthIdx, 1).getDay(); // 0 = Sun

    const rows = [];
    let week = [];

    // Empty cells for start
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIdx, day);
      const status = getStatus(date);
      const isSelected = isSameDay(date, selectedDate);
      const isT = isToday(date);

      let className = "h-10 w-10 mx-auto rounded-md flex items-center justify-center text-sm font-medium";

      if (isSelected) {
        className += " border-2 border-[#fe8019] bg-[#3c3836] shadow-[0_0_10px_#fe8019] text-[#ebdbb2]";
      } else if (isT) {
        if (status === "complete") className += " bg-[#fe8019] text-[#1d2021] shadow-[0_0_10px_#fe8019]";
        else if (status === "partial") className += " bg-[#3c3836] text-[#ebdbb2] shadow-[0_0_10px_#3c3836]";
        else className += " border-2 border-[#fe8019] text-[#ebdbb2]";
      } else {
        if (status === "complete") className += " bg-[#fe8019] text-[#1d2021]";
        else if (status === "partial") className += " bg-[#3c3836] text-[#ebdbb2]";
        else className += " text-[#a89984]";
      }

      week.push(
        <motion.div
          key={date.getDate()}
          className="cursor-pointer"
          onClick={() => setSelectedDate(date)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.08 }}
        >
          <div className={className}>{date.getDate()}</div>
        </motion.div>
      );

      if ((firstDayOfWeek + day) % 7 === 0 || day === daysInMonth) {
        rows.push(
          <div key={day} className="grid grid-cols-7 gap-2">
            {week}
          </div>
        );
        week = [];
      }
    }

    return (
      <div key={month.toISOString()} className="mt-2">
        <div className="grid grid-cols-7 gap-2 mt-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="text-[#a89984] text-xs font-medium text-center py-1">
              {day}
            </div>
          ))}
        </div>
        {rows}
      </div>
    );
  };

  // Tasks for selected date
  const selectedTasks = getDailyTasks(selectedDate);
  const hasTasks = selectedTasks.length > 0;
  const completedCount = selectedTasks.filter((t) => t.completions.length > 0).length;

  // Insight message
  const insight = hasTasks
    ? completedCount === selectedTasks.length
      ? "Stillness follows action. You honored your path."
      : completedCount >= selectedTasks.length * 0.7
      ? "Rhythm found. Keep moving with intention."
      : completedCount >= selectedTasks.length * 0.4
      ? "You met yourself where you were. That counts."
      : completedCount > 0
      ? "Even a spark can light the way."
      : "Rest is not failure. Breathe. Begin again."
    : null;

  // Mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <CalendarLoading />;

  return (
    <div className="bg-[#1d2021] min-h-screen text-[#ebdbb2]">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="touch-pan-x"
      >
        <Card className="bg-[#1d2021] border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-[#ebdbb2] text-2xl font-bold tracking-tight">Calendar</CardTitle>
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
            <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent>
                {months.map((month) => (
                  <CarouselItem
                    key={month.toISOString()}
                    className="min-w-[280px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[380px] max-w-[480px]"
                  >
                    <div className="bg-[#282828] p-4 rounded-xl h-full border border-[#3c3836]">
                      <h2 className="text-[#ebdbb2] text-lg font-semibold text-center mb-3">
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
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-[#1d2021] border-none shadow-none">
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#fe8019]" />
                <span className="text-[#ebdbb2] text-lg font-medium">
                  {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="text-sm text-[#a89984]">
                {hasTasks ? `${completedCount}/${selectedTasks.length}` : ""}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {!hasTasks ? (
                <div className="p-5 text-center rounded-lg border border-dashed border-[#3c3836] bg-[#282828]">
                  <p className="text-sm text-[#a89984]">No tasks scheduled</p>
                </div>
              ) : (
                selectedTasks.map((task, i) => {
                  const Icon = iconMap[task.task.dimension.icon] || Check;
                  const isCompleted = task.completions.length > 0;
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#282828] border border-[#3c3836] hover:border-[#504945] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${task.task.dimension.color}20` }}
                        >
                          <Icon className="h-4 w-4" style={{ color: task.task.dimension.color }} />
                        </div>
                        <span
                          className={`text-[#ebdbb2] ${isCompleted ? "line-through opacity-60" : ""}`}
                        >
                          {task.task.name}
                        </span>
                      </div>
                      <div
                        className={`h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all
                          ${isCompleted ? "bg-[#fe8019] border-[#fe8019]" : "border-[#3c3836] hover:border-[#fe8019]/50"}`}
                      >
                        {isCompleted && <Check className="h-4 w-4 text-[#1d2021]" strokeWidth={3} />}
                      </div>
                    </motion.div>
                  );
                })
              )}

              {insight && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 rounded-lg border border-[#3c3836] bg-[#282828]"
                >
                  <p className="text-sm text-[#a89984] leading-relaxed">{insight}</p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CalendarMain;