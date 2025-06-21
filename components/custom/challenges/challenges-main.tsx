"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Award,
  ArrowRight,
  Sparkles,
  Flame,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Star,
} from "lucide-react";
import {
  Challenge,
  CompletedTask,
  DailyTask,
  DimensionValue,
  Task,
  UserChallenge,
} from "@prisma/client";
import { useEffect, useState } from "react";
import { Dimension, User } from "@prisma/client";
import TaskCompletionFlow from "./day-completion-flow";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { completeDayAndUpdateStreak } from "@/lib/actions";
import { differenceInDays, isSameDay } from "date-fns";
import LoadingSkeleton from "./challenges-skeleton";
import { iconMap } from "@/lib/iconMap";
import Link from "next/link";
import CompletedChallenge from "./completed-challenge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ChallengesProps {
  challenge: UserChallenge & {
    challenge: Challenge &
      {
        tasks: {
          task: Task & {
            dimension: Dimension;
          };
        };
      }[];
  };
  tasks: (DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  })[];
  dimensionValues: DimensionValue[];
  dimensions: Dimension[];
  hasCompletedChallenge: boolean;
  predefinedChallenges: Challenge[];
  dailyTasks: DailyTask[];
}

const Challenges = ({
  challenge,
  tasks,
  dimensionValues,
  dimensions,
  hasCompletedChallenge,
  predefinedChallenges,
  dailyTasks,
}: ChallengesProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionFlow, setShowCompletionFlow] = useState(false);
  const [isCompletingDay, setIsCompletingDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayCompleted, setDayCompleted] = useLocalStorage<{
    date: string;
    completed: boolean;
  }>("dayCompleted", { date: "", completed: false });

  const today = new Date();
  const currentStreak = tasks[0]?.user.currentStreak || 0;

  // Generate week dates for calendar
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const currentWeekDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    return date;
  });

  const generateDateRange = (start: Date, days: number) =>
    Array.from({ length: days }).map((_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() - i);
      return date;
    });

  const dates = generateDateRange(today, 8);
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

  const completionPercentage =
    selectedDateTasks.length > 0
      ? (completedTasks.length / selectedDateTasks.length) * 100
      : 0;

  const isTodayCompleted = () => {
    if (!dayCompleted?.date) return false;
    const todayStr = new Date().toDateString();
    return dayCompleted.date === todayStr && dayCompleted.completed;
  };

  // Calculate completion percentage for a date
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

  const handleCompletionFlowFinished = async () => {
    setIsCompletingDay(true);

    try {
      const result = await completeDayAndUpdateStreak();
      console.log(result);

      if (result.success) {
        setShowCompletionFlow(false);
        setDayCompleted({
          date: new Date().toDateString(),
          completed: true,
        });
        localStorage.removeItem("nafs-hide-mobile-nav");
        window.dispatchEvent(new Event("storage"));
        router.refresh();
      } else {
        console.error("Failed to complete day:", result.message);
        setShowCompletionFlow(false);
        localStorage.removeItem("nafs-hide-mobile-nav");
      }
    } catch (error) {
      console.error("Error completing day:", error);
      setShowCompletionFlow(false);
      localStorage.removeItem("nafs-hide-mobile-nav");
      window.dispatchEvent(new Event("storage"));
    } finally {
      setIsCompletingDay(false);
    }
  };

  const handleShowCompletionFlow = () => {
    if (allTasksCompleted && isToday && !isTodayCompleted()) {
      setShowCompletionFlow(true);
      localStorage.setItem("nafs-hide-mobile-nav", "true");
      window.dispatchEvent(new Event("storage"));
    }
  };

  // Get current time greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || isLoading) {
    return <LoadingSkeleton />;
  }

  const currentDay = Math.min(
    differenceInDays(new Date(), tasks[0]?.user.lastActiveDate || new Date()) +
      1,
    challenge.challenge.duration
  );

  return (
    <>
      <div className=" bg-[#1d2021]">
        {hasCompletedChallenge && (
          <CompletedChallenge
            predefinedChallenges={predefinedChallenges}
            dimensions={dimensions}
            challenge={challenge}
            tasks={tasks}
            dailyTasks={dailyTasks}
            dimensionValues={dimensionValues}
          />
        )}

        {/* Hero Section */}
        <div className="">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold text-[#ebdbb2] mb-1">
              {getTimeGreeting()}
            </h1>
            <p className="text-[#a89984]">
              Let&apos;s continue your spiritual journey
            </p>
          </motion.div>

          {/* Streak & Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#282828] rounded-3xl p-6 border border-[#3c3836] mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 bg-[#fe8019] rounded-2xl flex items-center justify-center">
                    <Flame className="w-7 h-7 text-[#1d2021]" />
                  </div>
                  <motion.div
                    className="absolute -inset-1 bg-[#fe8019] rounded-2xl opacity-20"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#ebdbb2]">
                    {currentStreak}
                  </div>
                  <div className="text-sm text-[#a89984]">Day Streak</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#fe8019]">
                  {Math.round(completionPercentage)}%
                </div>
                <div className="text-sm text-[#a89984]">
                  {isToday
                    ? "Today"
                    : selectedDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-[#1d2021] rounded-full overflow-hidden mb-3">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#fe8019] to-[#fabd2f] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#a89984]">
                {completedTasks.length} of {selectedDateTasks.length} completed
              </span>
              {allTasksCompleted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[#8ec07c] font-semibold flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Complete!
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Week Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-[#ebdbb2]">
                This Week
              </h3>
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
                    selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000 >
                    today.getTime()
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
                  const isSelected =
                    date.toDateString() === selectedDate.toDateString();
                  const isCurrentDay =
                    date.toDateString() === today.toDateString();
                  const percentage = getCompletionPercentage(date);
                  const isComplete = percentage === 100;
                  return (
                    <CarouselItem
                      key={i}
                      className="basis-1/3 sm:basis-1/5 lg:basis-1/7 pl-1"
                    >
                      <motion.div
                        key={i}
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
                          <div className="text-lg font-bold">
                            {date.getDate()}
                          </div>
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
        </div>

        {/* Tasks Section */}
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
                selectedDateTasks.map((dailyTask, i) => {
                  const IconComponent =
                    iconMap[dailyTask.task.dimension.icon] ||
                    iconMap["BookOpen"];
                  const isCompleted = dailyTask.completions.some((c) =>
                    isSameDay(new Date(c.completedAt), selectedDate)
                  );
                  const canInteract = isToday;
                  const taskColor = dailyTask.task.dimension.color;

                  return (
                    <motion.div
                      key={dailyTask.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      whileHover={canInteract ? { y: -2 } : {}}
                      whileTap={canInteract ? { scale: 0.98 } : {}}
                      className={`relative bg-[#282828] rounded-2xl p-4 border transition-all duration-200 ${
                        isCompleted
                          ? "border-[#8ec07c]/50 bg-[#8ec07c]/5"
                          : "border-[#3c3836] hover:border-[#fe8019]/50"
                      } ${canInteract ? "cursor-pointer" : "opacity-60"}`}
                    >
                      <Link
                        href={
                          canInteract
                            ? `/dashboard/challenges/complete/${dailyTask.id}`
                            : "#"
                        }
                        className="block"
                        onClick={(e) => !canInteract && e.preventDefault()}
                      >
                        <div className="flex items-center gap-4">
                          {/* Task Icon */}
                          <div className="relative">
                            <motion.div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200`}
                              style={{
                                backgroundColor: isCompleted
                                  ? "#8ec07c"
                                  : taskColor,
                              }}
                            >
                              {isCompleted ? (
                                <motion.div
                                  initial={{ scale: 0, rotate: -90 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 15,
                                  }}
                                >
                                  <Check className="h-6 w-6 text-[#1d2021]" />
                                </motion.div>
                              ) : (
                                <IconComponent className="h-6 w-6 text-[#1d2021]" />
                              )}
                            </motion.div>
                          </div>

                          {/* Task Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4
                                className={`font-semibold transition-all duration-200 ${
                                  isCompleted
                                    ? "text-[#a89984] line-through"
                                    : "text-[#ebdbb2]"
                                }`}
                              >
                                {dailyTask.task.name}
                              </h4>
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge
                                className="text-xs px-2 py-1"
                                style={{
                                  backgroundColor: taskColor + "20",
                                  color: taskColor,
                                  border: `1px solid ${taskColor}30`,
                                }}
                              >
                                {dailyTask.task.dimension.name}
                              </Badge>
                              {canInteract && !isCompleted && (
                                <ArrowRight className="w-4 h-4 text-[#a89984]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#282828] rounded-2xl p-8 border border-[#3c3836] text-center"
                >
                  <Calendar className="w-12 h-12 text-[#a89984] mx-auto mb-4 opacity-60" />
                  <p className="text-[#a89984] text-lg mb-2">
                    No tasks scheduled
                  </p>
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
                onClick={handleShowCompletionFlow}
                size="lg"
                disabled={isCompletingDay}
              >
                <div className="flex items-center justify-center gap-3">
                  <Award className="h-6 w-6" />
                  <span>
                    {isCompletingDay ? "Completing..." : "Complete Day"}
                  </span>
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

          {/* Challenge Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 bg-[#282828] rounded-2xl p-4 border border-[#3c3836]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fe8019]/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#fe8019]" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#ebdbb2]">
                  {challenge.challenge.name}
                </h4>
                <p className="text-sm text-[#a89984]">
                  {challenge.challenge.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-[#fe8019]">
                  {currentDay}/{challenge.challenge.duration}
                </div>
                <div className="text-xs text-[#a89984]">Days</div>
              </div>
            </div>

            {/* Challenge Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#a89984]">Challenge Progress</span>
                <span className="text-[#ebdbb2]">
                  {Math.round(
                    (currentStreak / challenge.challenge.duration) * 100
                  )}
                  %
                </span>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: challenge.challenge.duration }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full ${
                        i < currentStreak ? "bg-[#fe8019]" : "bg-[#3c3836]"
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Task Completion Flow */}
      <AnimatePresence>
        {showCompletionFlow && (
          <TaskCompletionFlow
            tasks={tasks}
            currentStreak={currentStreak}
            userLevel={tasks[0]?.user.level || 1}
            onComplete={handleCompletionFlowFinished}
            challengeDuration={challenge.challenge.duration}
            dimensionValues={dimensionValues}
            dimensions={dimensions}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Challenges;
