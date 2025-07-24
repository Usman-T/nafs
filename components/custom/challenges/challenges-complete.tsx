"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Award, BookOpen } from "lucide-react";
import { DailyTask, Dimension, Task } from "@prisma/client";
import { completeTask as completeTaskAction } from "@/lib/actions";
import { iconMap } from "@/lib/iconMap";
import { toast } from "sonner";

interface ChallengesCompleteProps {
  task: DailyTask & { task: Task & { dimension: Dimension } };
}

const ChallengesComplete = ({ task }: ChallengesCompleteProps) => {
  const router = useRouter();
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  const controls = useAnimation();
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.5, 1], [0, 1, 1]);

  const IconComponent = iconMap[task.task.dimension.icon] || BookOpen;

  useEffect(() => {
    return () => {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    pathLength.set(progress / 100);
  }, [progress, pathLength]);

  const startHolding = () => {
    setIsHolding(true);
    progressTimer.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          completeTask();
          return 100;
        }
        return newProgress;
      });
    }, 50);
  };

  const stopHolding = () => {
    setIsHolding(false);
    if (progressTimer.current) clearInterval(progressTimer.current);
    if (progress < 100) setProgress(0);
  };

  const completeTask = async () => {
    try {
      setCompleted(true);
      pathLength.set(1);
      controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.5 } });

      const result = await completeTaskAction(task.id);

      if (!result.success) {
        return router.push("/dashboard");
      }

      toast.success("Task completed successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("An unexpected error occurred.");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-center">
              <Award className="h-6 w-6 text-[#fe8019] mr-2" />
              <span className="text-[#ebdbb2]">Complete Task</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 flex flex-col items-center">
            <div className="text-center">
              <div className="h-12 w-12 border-2 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent
                  className="h-12 w-12"
                  style={{ color: task.task.dimension.color }}
                />
              </div>
              <h2 className="text-xl font-medium text-[#ebdbb2] mb-2">
                {task.task.name}
              </h2>
              <p className="text-sm text-[#a89984]">
                Hold the button below to mark this task as complete
              </p>
            </div>

            <div className="relative w-48 h-48">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full transform -rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#3c3836"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#fe8019"
                  strokeWidth="8"
                  strokeLinecap="round"
                  style={{ pathLength, opacity }}
                />
              </svg>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={controls}
              >
                <motion.button
                  className={`h-32 w-32 rounded-full flex items-center justify-center ${
                    completed
                      ? "bg-[#fe8019] text-[#1d2021]"
                      : "bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945]"
                  } focus:outline-none transition-colors duration-200`}
                  onMouseDown={startHolding}
                  onMouseUp={stopHolding}
                  onMouseLeave={stopHolding}
                  onTouchStart={startHolding}
                  onTouchEnd={stopHolding}
                  whileTap={{ scale: 0.95 }}
                  disabled={completed}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {completed ? (
                    <Check className="h-16 w-16" />
                  ) : (
                    <span className="text-lg font-medium">Hold</span>
                  )}
                </motion.button>
              </motion.div>
            </div>

            <div className="text-center">
              {completed ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#fe8019] font-medium"
                >
                  Task completed! Redirecting...
                </motion.div>
              ) : (
                <div className="text-sm text-[#a89984]">
                  {isHolding ? "Keep holding..." : "Press and hold to complete"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChallengesComplete;
