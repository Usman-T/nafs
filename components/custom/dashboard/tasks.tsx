"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const Tasks = ({ dailyTasks }) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleTask = (index: number) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentWeekDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    return date;
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1"
    >
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="text-[#ebdbb2]">Daily Tasks</div>
            <div className="text-sm text-[#a89984]">
              {completedTasks.length}/{dailyTasks.length}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress
            value={(completedTasks.length / dailyTasks.length) * 100}
            className="h-2 bg-[#1d2021]"
          />

          <div className="text-[#a89984] text-sm">
            Complete all daily tasks for{" "}
            <span className="text-[#fe8019]">5 consecutive days</span> to
            advance to the next level
          </div>

          <div className="border-t border-[#3c3836] pt-4 mt-4">
            <div className="text-[#a89984] text-sm mb-4">
              Today,{" "}
              {today.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="flex justify-between mb-6">
              {weekdays.map((day, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center ${
                    i === today.getDay() ? "text-[#fe8019]" : "text-[#a89984]"
                  }`}
                >
                  <div className="text-xs">{day.substring(0, 1)}</div>
                  <div className="text-sm mt-1">
                    {currentWeekDates[i].getDate()}
                  </div>
                  <div
                    className={`h-1 w-1 rounded-full mt-1 ${
                      i === today.getDay() ? "bg-[#fe8019]" : "bg-[#3c3836]"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {dailyTasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-[#a89984] mr-2">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-[#ebdbb2]">{task.name}</span>
                  </div>
                  <button
                    onClick={() => toggleTask(i)}
                    className={`h-6 w-6 rounded-full border ${
                      completedTasks.includes(i)
                        ? "bg-[#fe8019] border-[#fe8019]"
                        : "bg-transparent border-[#3c3836]"
                    } flex items-center justify-center transition-all duration-200`}
                  >
                    {completedTasks.includes(i) && (
                      <Check className="h-4 w-4 text-[#1d2021]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Tasks;
