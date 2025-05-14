"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Challenge,
  CompletedTask,
  DailyTask,
  Dimension,
  Task,
} from "@prisma/client";
import { iconMap } from "@/lib/iconMap";
import Link from "next/link";

const Tasks = ({
  dailyTasks,
  challenge,
}: {
  dailyTasks: (DailyTask & {
    completions: CompletedTask[];
    task: Task & { dimension: Dimension };
  })[];
  challenge: Challenge;
}) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentWeekDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    return date;
  });

  const dayTasks = dailyTasks.filter(
    (t) => t.date.getDay() === today.getDay()
  );
  const completedTasks = dayTasks.filter((task) => task.completions.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 h-full"
    >
      <Card className="h-full flex flex-col bg-[#282828] border-[#3c3836]">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center justify-between text-[#ebdbb2]">
            <span className="text-2xl font-bold">Daily Tasks</span>
            <span className="text-lg font-medium text-[#a89984]">
              {completedTasks.length}/{dayTasks.length}
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col gap-6">
          <div className="space-y-4">
            <Progress
              value={(completedTasks.length / dayTasks.length) * 100}
              className="h-2 bg-[#1d2021]"
            />

            <p className="text-[#a89984] text-base">
              Complete all daily tasks for{" "}
              <span className="text-[#fe8019] font-medium">
                {challenge.duration} consecutive days
              </span>{" "}
              to advance to the next level
            </p>
          </div>

          <div className="space-y-6 flex-1">
            <div className="border-t border-[#3c3836] pt-4">
              <h3 className="text-[#a89984] text-lg font-medium mb-4">
                Today,{" "}
                {today.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              <div className="flex justify-between mb-6">
                {weekdays.map((day, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center ${
                      i === today.getDay() ? "text-[#fe8019]" : "text-[#a89984]"
                    }`}
                  >
                    <div className="text-sm font-medium">{day.substring(0, 1)}</div>
                    <div className="text-base mt-1">
                      {currentWeekDates[i].getDate()}
                    </div>
                    <div
                      className={`h-1.5 w-1.5 rounded-full mt-1.5 ${
                        i === today.getDay() ? "bg-[#fe8019]" : "bg-[#3c3836]"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {dayTasks.map((dayTask, i) => {
                const IconComponent =
                  iconMap[dayTask.task.dimension.icon] || "BookOpen";
                const isCompleted = dayTask.completions.length > 0;

                return (
                  <div key={i} className="flex items-center justify-between">
                    <Link href="/dashboard/challenges" className="flex-1">
                      <div className="flex hover:cursor-pointer items-center">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <IconComponent
                            className="h-5 w-5"
                            style={{
                              color: dayTask.task.dimension.color,
                              borderColor: dayTask.task.dimension.color,
                            }}
                          />
                        </div>
                        <span 
                          className="text-base font-medium"
                          style={{ color: dayTask.task.dimension.color }}
                        >
                          {dayTask.task.name}
                        </span>
                      </div>
                    </Link>
                    <button
                      className={`h-7 w-7 rounded-full border ${
                        isCompleted
                          ? "bg-[#fe8019] border-[#fe8019]"
                          : "bg-transparent border-[#3c3836]"
                      } flex items-center justify-center transition-all duration-200`}
                    >
                      {isCompleted && (
                        <Check className="h-4 w-4 text-[#1d2021]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Tasks;