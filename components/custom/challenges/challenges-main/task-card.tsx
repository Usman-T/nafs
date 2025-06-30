"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { isSameDay } from "date-fns";
import Link from "next/link";
import { iconMap } from "@/lib/iconMap";
import { DailyTask, Task, Dimension, CompletedTask, User, UserChallenge } from "@prisma/client";

interface TaskCardProps {
  dailyTask: DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  };
  selectedDate: Date;
  isToday: boolean;
  index: number;
}

const TaskCard = ({ dailyTask, selectedDate, isToday, index }: TaskCardProps) => {
  const IconComponent =
    iconMap[dailyTask.task.dimension.icon] || iconMap["BookOpen"];
  const isCompleted = dailyTask.completions.some((c) =>
    isSameDay(new Date(c.completedAt), selectedDate)
  );
  const canInteract = isToday;
  const taskColor = dailyTask.task.dimension.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
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
          canInteract && !isCompleted
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
                backgroundColor: isCompleted ? "#8ec07c" : taskColor,
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
};

export default TaskCard;
