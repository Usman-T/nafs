"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Flame } from "lucide-react";

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: "Day Streak",
      value: stats.currentStreak,
      icon: Flame,
      color: "#fe8019",
    },
    {
      label: "Saved Verses",
      value: stats.savedVerses,
      icon: Bookmark,
      color: "#fabd2f",
    },
  ];

  return (
    <div className="grid text-center gap-3 grid-cols-2">
      {statItems.map((stat, index) => (
        <Card
          key={stat.label}
          className="bg-[#282828] border-[#3c3836] relative overflow-hidden group hover:border-[#504945] transition-colors flex-1"
        >
          <CardContent className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#ebdbb2] leading-tight">
                {stat.value}
              </span>
              <span className="text-xs text-[#a89984]">{stat.label}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;