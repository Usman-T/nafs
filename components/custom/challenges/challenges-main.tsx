"use client";

import { motion, AnimatePresence } from "framer-motion";
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
import { useEffect, useState } from "react";
import { Dimension, User } from "@prisma/client";
import TaskCompletionFlow from "./day-completion-flow";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { completeDayAndUpdateStreak } from "@/lib/actions";
import { differenceInDays, isSameDay } from "date-fns";
import LoadingSkeleton from "./challenges-skeleton";
import ChallengeTask from "./challenge-tasks";
import CompletedChallenge from "./completed-challenge";

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
    } finally {
      setIsCompletingDay(false);
    }
  };

  const handleShowCompletionFlow = () => {
    if (
      completedTasks.length === tasks.length &&
      completedTasks.length > 0 &&
      !isTodayCompleted()
    ) {
      setShowCompletionFlow(true);
      localStorage.setItem("nafs-hide-mobile-nav", "true");
      window.dispatchEvent(new Event("storage"));
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const allTasksCompleted =
    completedTasks.length === tasks.length && tasks.length > 0;

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
<div className="h-2 w-full bg-[#1d2021] rounded-full overflow-hidden">
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="h-full bg-[#fe8019] rounded-full"
  />
</div>
              <p className="text-sm text-[#a89984] mt-2">
                {challenge.challenge.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#ebdbb2] font-medium">
                  Today&apos;s Tasks
                </h3>
                {isTodayCompleted() || hasCompletedChallenge && (
                  <Badge className="bg-[#fe8019]/90 flex items-center py-1 hover:bg-[#fe8019]/80 font-semibold text-[#ebdbb2]">
                    <Check className="h-4 w-4 mr-1" />
                    <p className="font-bold">Completed</p>
                  </Badge>
                )}
              </div>
              <AnimatePresence mode="wait">
                {tasks.map((dailyTask) => (
                  <ChallengeTask
                    key={dailyTask.id}
                    dailyTask={dailyTask}
                    dayCompleted={dayCompleted || hasCompletedChallenge}
                  />
                ))}
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

      {allTasksCompleted && !isTodayCompleted() && (
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
            disabled={isCompletingDay}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {isCompletingDay ? "Completing..." : "Complete Day"}
          </Button>
        </motion.div>
      )}

      {isTodayCompleted() || hasCompletedChallenge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-6"
        >
          <Button
            className="bg-gradient-to-r from-[#fe8019] to-[#d65d0e] font-semibold text-[#1d2021] hover:from-[#fe8019]/90 hover:to-[#d65d0e]/90 px-8 shadow-lg hover:shadow-[#fe8019]/20"
            size="lg"
            disabled
          >
            <Check className="mr-2 h-5 w-5" />
            Day Complete!
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {showCompletionFlow && (
          <TaskCompletionFlow
            tasks={tasks}
            currentStreak={currentStreak}
            userLevel={tasks[0].user.level}
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
