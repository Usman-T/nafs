"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Award, ArrowRight, Sparkles } from "lucide-react";
import {
  Challenge,
  CompletedTask,
  DailyTask,
  DimensionValue,
  Task,
  UserChallenge,
} from "@prisma/client";
import { iconMap } from "@/lib/iconMap";
import { useEffect, useState } from "react";
import { Dimension, User } from "@prisma/client";
import TaskCompletionFlow from "./challenge-completion-flow";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { updateUserStreak } from "@/lib/actions";
import { differenceInDays, isSameDay } from "date-fns";

interface ChallengesProps {
  challenge: UserChallenge & { challenge: Challenge };
  tasks: (DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  })[];
  dimensionValues: DimensionValue[];
  dimensions: Dimension[];
}

const Challenges = ({
  challenge,
  tasks,
  dimensionValues,
  dimensions,
}: ChallengesProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionFlow, setShowCompletionFlow] = useState(false);
  const [dayCompleted, setDayCompleted] = useLocalStorage<{
    date: string;
    completed: boolean;
  }>("dayCompleted", { date: "", completed: false });

  const today = new Date();
  const completedTasks = tasks.filter((task) =>
    task.completions.some((c) => isSameDay(new Date(c.completedAt), today))
  );
  const currentStreak = tasks[0]?.user.currentStreak || 0;

  const isTodayCompleted = () => {
    if (!dayCompleted?.date) return false;
    const today = new Date().toDateString();
    return dayCompleted.date === today && dayCompleted.completed;
  };

  const handleCompletionFlowFinished = async () => {
    setShowCompletionFlow(false);
    setDayCompleted({
      date: new Date().toDateString(),
      completed: true,
    });
    localStorage.removeItem("hideMobileNav");
    await updateUserStreak();
    router.refresh();
  };

  const handleShowCompletionFlow = () => {
    if (completedTasks.length > 0 && !isTodayCompleted()) {
      setShowCompletionFlow(true);
      localStorage.setItem("hideMobileNav", "true");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || isLoading) {
    return <LoadingSkeleton />;
  }

  const progress = (completedTasks.length / tasks.length) * 100 || 0;
  const currentDay = Math.min(
    differenceInDays(new Date(), new Date(challenge.startDate)) + 1,
    challenge.challenge.duration
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Award className="h-6 w-6 text-[#fe8019] mr-2" />
              <span className="text-[#ebdbb2]">{challenge.challenge.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#a89984]">
                  Day {currentDay} of {challenge.challenge.duration}
                </span>
                <span className="text-[#ebdbb2]">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <Progress value={progress} className="h-2 bg-[#1d2021]" />
              <p className="text-sm text-[#a89984] mt-2">
                {challenge.challenge.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#ebdbb2] font-medium">
                  Today&apos;s Tasks
                </h3>
                {isTodayCompleted() && (
                  <Badge className="bg-[#fe8019]/90 flex items-center py-1 hover:bg-[#fe8019]/80 font-semibold text-[#ebdbb2]">
                    <Check className="h-4 w-4 mr-1" />
                    <p className="font-bold">Completed</p>
                  </Badge>
                )}
              </div>
              <AnimatePresence mode="wait">
                {tasks.map((dailyTask) => {
                  const IconComponent =
                    iconMap[dailyTask.task.dimension.icon] || "BookOpen";
                  const isCompleted = dailyTask.completions.length > 0;

                  return (
                    <motion.div
                      key={dailyTask.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center justify-between p-4 rounded-md border ${
                        isTodayCompleted()
                          ? "bg-[#1d2021]/50 border-[#3c3836]/50"
                          : "bg-[#1d2021] border-[#3c3836]"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <IconComponent
                            className="h-4 w-4"
                            style={{
                              color: dailyTask.task.dimension.color,
                              borderColor: dailyTask.task.dimension.color,
                            }}
                          />
                        </div>
                        <span
                          className={`${
                            isCompleted || isTodayCompleted()
                              ? "line-through opacity-70"
                              : ""
                          } ${
                            isTodayCompleted()
                              ? "text-[#a89984]"
                              : "text-[#ebdbb2]"
                          }`}
                        >
                          {dailyTask.task?.name}
                        </span>
                      </div>
                      <Link
                        href={
                          isTodayCompleted()
                            ? "#"
                            : !isCompleted
                            ? `/dashboard/challenges/complete/${dailyTask.id}`
                            : "#"
                        }
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className={`h-8 w-8 rounded-full p-0 ${
                            isCompleted || isTodayCompleted()
                              ? "bg-[#fe8019] border-[#fe8019] text-[#1d2021]"
                              : "border-[#3c3836] hover:border-[#fe8019] hover:text-[#fe8019]"
                          }`}
                          disabled={isTodayCompleted()}
                        >
                          {isCompleted || isTodayCompleted() ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                        </Button>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#3c3836] pt-4">
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-[#a89984]">Challenge Streak</div>
                <div className="text-sm font-medium text-[#fe8019]">
                  {currentStreak} days
                </div>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: challenge.challenge.duration }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full ${
                        i < currentStreak ? "bg-[#fe8019]" : "bg-[#3c3836]"
                      }`}
                    ></div>
                  )
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {completedTasks.length === tasks.length && !isTodayCompleted() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-6"
        >
          <Button
            className="bg-gradient-to-r from-[#fe8019] to-[#d65d0e] font-semibold text-[#1d2021] hover:from-[#fe8019]/90 hover:to-[#d65d0e]/90 px-8 shadow-lg hover:shadow-[#fe8019]/20"
            onClick={handleShowCompletionFlow}
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Complete Day
          </Button>
        </motion.div>
      )}

      {isTodayCompleted() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-6"
        >
          <Button
            className="bg-gradient-to-r from-[#fe8019] to-[#d65d0e] font-semibold text-[#1d2021] hover:from-[#fe8019]/90 hover:to-[#d65d0e]/90 px-8 shadow-lg hover:shadow-[#fe8019]/20"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Day Complete!
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {showCompletionFlow && (
          <TaskCompletionFlow
            tasks={tasks}
            currentStreak={currentStreak}
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

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
      <CardHeader className="pb-3">
        <div className="h-6 w-40 bg-[#3c3836] rounded-md" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="h-4 w-20 bg-[#3c3836] rounded" />
            <div className="h-4 w-16 bg-[#3c3836] rounded" />
          </div>
          <div className="h-2 bg-[#1d2021] rounded-full" />
          <div className="h-4 w-full bg-[#3c3836] rounded-md" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-32 bg-[#3c3836] rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-md bg-[#1d2021] border border-[#3c3836]"
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-[#3c3836]" />
                <div className="h-4 w-40 bg-[#3c3836] rounded" />
              </div>
              <div className="h-8 w-8 rounded-full bg-[#3c3836]" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-[#3c3836] pt-4">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-[#3c3836] rounded" />
            <div className="h-4 w-10 bg-[#3c3836] rounded" />
          </div>
          <div className="flex space-x-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-2 flex-1 rounded-full bg-[#3c3836]"
              ></div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  </div>
);

export default Challenges;
