import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { iconMap } from "@/lib/iconMap";
import {
  DailyTask,
  User,
  Task,
  Dimension,
  UserChallenge,
  CompletedTask,
} from "@prisma/client";
import Link from "next/link";

interface ChallengeTaskProps {
  dailyTask: DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  };
  dayCompleted: { date: string; completed: boolean };
}

const ChallengeTask = ({ dailyTask, dayCompleted }: ChallengeTaskProps) => {
  const IconComponent = iconMap[dailyTask.task.dimension.icon] || "BookOpen";
  const isCompleted = dailyTask.completions.length > 0;

  const isTodayCompleted = () => {
    if (!dayCompleted?.date) return false;
    const today = new Date().toDateString();
    return dayCompleted.date === today && dayCompleted.completed;
  };

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
            isCompleted || isTodayCompleted() ? "line-through opacity-70" : ""
          } ${isTodayCompleted() ? "text-[#a89984]" : "text-[#ebdbb2]"}`}
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
};

export default ChallengeTask;
