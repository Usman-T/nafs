"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardCalendar = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-[#ebdbb2]">Monthly Progress</span>
            <Link
              href="/dashboard/calendar"
              className="text-[#fe8019] text-sm hover:underline"
            >
              View full calendar
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center gap-6 mb-4">
              <span className="text-[#ebdbb2] border-b-2 border-[#ebdbb2] pb-1">
                May
              </span>
              <span className="text-[#a89984]">Jun</span>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-6">
              {weekdays.map((day, i) => (
                <div key={i} className="text-[#a89984] text-xs text-center">
                  {day.charAt(0)}
                </div>
              ))}

              {Array.from({ length: 31 }).map((_, i) => {
                const isCompleted = [1, 2, 3, 7, 8, 9, 15, 16, 22, 23].includes(
                  i + 1
                );
                const isPartial = [4, 10, 11, 17, 24].includes(i + 1);
                const isToday =
                  i + 1 === today.getDate() && today.getMonth() === 4; // May is month 4 (0-indexed)

                return (
                  <div key={i} className="flex justify-center">
                    <div
                      className={`h-8 w-8 rounded-md flex items-center justify-center ${
                        isCompleted
                          ? "bg-[#fe8019] text-[#1d2021]"
                          : isPartial
                          ? "bg-[#3c3836] text-[#ebdbb2]"
                          : isToday
                          ? "border-2 border-[#fe8019] text-[#ebdbb2]"
                          : "border border-[#3c3836] text-[#a89984]"
                      }`}
                    >
                      {i + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-sm text-[#a89984] mt-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-[#fe8019] rounded-sm mr-2"></div>
                <span>All tasks completed</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-[#3c3836] rounded-sm mr-2"></div>
                <span>Partial completion</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 border border-[#3c3836] rounded-sm mr-2"></div>
                <span>No tasks completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCalendar;
