"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isSameDay } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DailyTask, Task, Dimension, CompletedTask, User, UserChallenge } from "@prisma/client";

interface WeekCalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  tasks: (DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  })[];
  today: Date;
}

const WeekCalendar = ({
  selectedDate,
  setSelectedDate,
  tasks,
  today,
}: WeekCalendarProps) => {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const generateDateRange = (start: Date, days: number) =>
    Array.from({ length: days }).map((_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() - i);
      return date;
    });

  const dates = generateDateRange(today, 8);

  const getCompletionPercentage = (date: Date) => {
    const dateTasks = tasks.filter(
      (task) => task.date.toDateString() === date.toDateString()
    );
    const dateCompletedTasks = dateTasks.filter((task) =>
      task.completions.some((c) => isSameDay(new Date(c.completedAt), date))
    );
    return dateTasks.length > 0
      ? (dateCompletedTasks.length / dateTasks.length) * 100
      : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#ebdbb2]">This Week</h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={() => {
              const prevWeek = new Date(selectedDate);
              prevWeek.setDate(selectedDate.getDate() - 7);
              setSelectedDate(prevWeek);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={() => {
              const nextWeek = new Date(selectedDate);
              nextWeek.setDate(selectedDate.getDate() + 7);
              if (nextWeek <= today) {
                setSelectedDate(nextWeek);
              }
            }}
            disabled={
              selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000 > today.getTime()
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Carousel
        opts={{
          startIndex: 7,
          slidesToScroll: 3,
          breakpoints: {
            "(min-width: 640px)": { slidesToScroll: 5 },
            "(min-width: 1024px)": { slidesToScroll: 7 },
          },
        }}
        className="w-full"
      >
        <CarouselContent className="gap-2">
          {dates.reverse().map((date, i) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isCurrentDay = date.toDateString() === today.toDateString();
            const percentage = getCompletionPercentage(date);
            const isComplete = percentage === 100;

            return (
              <CarouselItem
                key={i}
                className="basis-1/3 sm:basis-1/5 lg:basis-1/7 pl-1"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative cursor-pointer ${
                    date <= today ? "" : "opacity-40 pointer-events-none"
                  }`}
                  onClick={() => {
                    if (date <= today) {
                      setSelectedDate(new Date(date));
                    }
                  }}
                >
                  <div
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 transition-all duration-200 ${
                      isSelected
                        ? "bg-[#fe8019] text-[#1d2021] shadow-lg"
                        : isCurrentDay
                        ? "bg-[#3c3836] text-[#ebdbb2] border border-[#fe8019]"
                        : "bg-[#282828] text-[#a89984] hover:bg-[#3c3836] border border-[#3c3836]"
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">
                      {weekdays[i]}
                    </div>
                    <div className="text-lg font-bold">{date.getDate()}</div>
                    {percentage > 0 && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isComplete ? "bg-[#8ec07c]" : "bg-[#fabd2f]"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
};

export default WeekCalendar;