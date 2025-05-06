"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Award, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveRadarChart from "@/components/custom/dashboard/radar-chart";
import Tasks from "@/components/custom/dashboard/tasks";

export default function DashboardPage() {

  const dailyTasks = [
    { id: 1, name: "Fajr and Asr in congregation", color: "#fb4934" },
    { id: 2, name: "Work on self-improvement", color: "#83a598" },
    { id: 3, name: "Exercise for 1+ hour", color: "#8ec07c" },
    { id: 4, name: "Quran memorization (15+ min)", color: "#fabd2f" },
    { id: 5, name: "Read, speak, record", color: "#fe8019" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Tasks dailyTasks={dailyTasks}   />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1"
        >
          <Card className="bg-[#282828] border-[#3c3836] overflow-hidden h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#ebdbb2]">Spiritual Dimensions</span>
                <Link
                  href="/dashboard/progress"
                  className="text-[#fe8019] text-sm hover:underline"
                >
                  View all
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveRadarChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>

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
                  const isCompleted = [
                    1, 2, 3, 7, 8, 9, 15, 16, 22, 23,
                  ].includes(i + 1);
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

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Current Streak",
              value: "12 days",
              icon: <Calendar className="h-5 w-5 text-[#fe8019]" />,
              description: "Keep going! Your best streak is 21 days.",
              link: "/dashboard/calendar",
            },
            {
              title: "Active Challenge",
              value: "Ramadan Readiness",
              icon: <Award className="h-5 w-5 text-[#fe8019]" />,
              description: "Day 3 of 30 - 65% complete",
              link: "/dashboard/challenges",
            },
            {
              title: "Overall Growth",
              value: "72%",
              icon: <BarChart3 className="h-5 w-5 text-[#fe8019]" />,
              description: "Up 8% from last month",
              link: "/dashboard/progress",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={stat.link} className="block h-full">
                <Card className="bg-[#282828] border-[#3c3836] h-full hover:border-[#fe8019] transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#a89984]">{stat.title}</div>
                      <div className="h-8 w-8 rounded-full bg-[#3c3836] flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#ebdbb2] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#a89984]">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
