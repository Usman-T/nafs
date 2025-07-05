"use client";

import { AnimatePresence } from "framer-motion";
import { differenceInDays } from "date-fns";

import { useChallenges } from "@/lib/hooks/use-challenges";

import GreetingSection from "@/components/custom/challenges/challenges-main/greeting-section";
import StreakProgressCard from "@/components/custom/challenges/challenges-main/streak-progress-card";
import WeekCalendar from "@/components/custom/challenges/challenges-main/week-calendar";
import TasksSection from "@/components/custom/challenges/challenges-main/tasks-section";
import ChallengeInfoCard from "@/components/custom/challenges/challenges-main/challenge-info-card";
import DayCompletionFlow from "@/components/custom/challenges/day-completion-flow";
import LoadingSkeleton from "@/components/custom/challenges/challenges-skeleton";
import CompletedChallenge from "@/components/custom/challenges/completed-challenge";

import { ChallengesProps } from "@/components/custom/challenges/challenges-main/type";

const Challenges = ({
  challenge,
  tasks,
  dimensionValues,
  dimensions,
  hasCompletedChallenge,
}: ChallengesProps) => {
  const {
    isMounted,
    isLoading,
    showCompletionFlow,
    isCompletingDay,
    selectedDate,
    setSelectedDate,
    handleCompletionFlowFinished,
    isTodayCompleted,
    handleShowCompletionFlow,
  } = useChallenges();

  const today = new Date();
  const currentStreak = tasks[0]?.user.currentStreak || 0;

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
      <div className="bg-[#1d2021]">
        {hasCompletedChallenge && <CompletedChallenge />}

        <div className="">
          <GreetingSection />

          <StreakProgressCard
            currentStreak={currentStreak}
            selectedDate={selectedDate}
            tasks={tasks}
            today={today}
          />

          <WeekCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            tasks={tasks}
            today={today}
          />
        </div>

        <div className="space-y-4">
          <TasksSection
            selectedDate={selectedDate}
            tasks={tasks}
            today={today}
            currentDay={currentDay}
            isTodayCompleted={isTodayCompleted}
            isCompletingDay={isCompletingDay}
            hasCompletedChallenge={hasCompletedChallenge}
            onShowCompletionFlow={handleShowCompletionFlow}
          />

          <ChallengeInfoCard
            currentStreak={currentStreak}
            challenge={challenge}
            currentDay={currentDay}
          />
        </div>
      </div>

      <AnimatePresence>
        {showCompletionFlow && (
          <DayCompletionFlow
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
