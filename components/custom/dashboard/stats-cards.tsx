"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Award, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatsCards = () => {
  return (
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
  );
};

export default StatsCards;
