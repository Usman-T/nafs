"use client";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Challenge, Task, Dimension } from "@prisma/client";

interface CustomTask {
  name: string;
  dimension: Dimension;
}

interface CustomChallengeData {
  title: string;
  description: string;
  tasks: CustomTask[];
}

interface ChallengeSelection {
  type: "existing" | "custom" | null;
  challengeId?: string;
  selectedTasks?: number[];
  customChallenge?: CustomChallengeData;
}

type ExtendedChallenge = Challenge & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

interface StreakBreakSummaryProps {
  challengeSelection: ChallengeSelection;
  curretnChallenge?: ExtendedChallenge | null;
  duration: number;
}

const StreakBreakSummary = ({
  challengeSelection,
  currentChallenge,
  duration,
}: StreakBreakSummaryProps) => {
  console.log("MEOWWWWWOWOWOWOW")
  console.log({ challengeSelection, currentChallenge });
  const isCustom = challengeSelection.type === "custom";

  const challengeData = isCustom
    ? {
        title: challengeSelection.customChallenge?.title || "Custom Challenge",
        description:
          challengeSelection.customChallenge?.description ||
          "Your personalized challenge",
        tasks: challengeSelection.customChallenge?.tasks || [],
        duration: duration,
      }
    : {
        title: currentChallenge?.name || "Challenge",
        description: currentChallenge?.description || "Selected challenge",
        tasks:
          challengeSelection.selectedTasks
            ?.map((index) => currentChallenge?.tasks[index]?.task)
            .filter(Boolean) || [],
        duration: duration,
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 p-6"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto h-16 w-16 rounded-full bg-[#fe8019] flex items-center justify-center mb-4"
        >
          <Award className="h-8 w-8 text-[#1d2021]" />
        </motion.div>
        <h2 className="text-xl font-bold text-[#ebdbb2]">
          {isCustom ? "Challenge Created" : "Challenge Selected"}
        </h2>
        <p className="text-[#a89984]">
          You&apos;re ready to begin your {isCustom ? "custom" : "selected"}{" "}
          challenge
        </p>
      </div>

      <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
        <h3 className="text-[#ebdbb2] font-medium mb-2">
          {challengeData.title}
        </h3>
        <div className="text-sm text-[#a89984] mb-3">
          {challengeData.description}
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
          <Badge className="bg-[#3c3836] text-[#ebdbb2]">
            {challengeData.duration} days
          </Badge>
          <Badge className="bg-[#3c3836] text-[#ebdbb2]">
            {challengeData.tasks.length} tasks
          </Badge>
        </div>

        <div className="space-y-2">
          {isCustom
            ? // Render custom tasks
              challengeData.tasks.map((task, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className="h-4 w-4 rounded-full mr-2 flex-shrink-0"
                    style={{ backgroundColor: task.dimension.color }}
                  />
                  <span className="text-sm text-[#ebdbb2]">{task.name}</span>
                </div>
              ))
            : challengeData.tasks.map((task, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className="h-4 w-4 rounded-full mr-2 flex-shrink-0"
                    style={{ backgroundColor: task.dimension.color }}
                  />
                  <span className="text-sm text-[#ebdbb2]">{task.name}</span>
                </div>
              ))}
        </div>
      </div>

      <div className="text-sm text-[#a89984] text-center">
        <p>Your challenge will begin today.</p>
      </div>
    </motion.div>
  );
};

export default StreakBreakSummary;
