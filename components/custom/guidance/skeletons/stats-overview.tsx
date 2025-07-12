import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Bookmark, Flame } from "lucide-react";
import React from "react";

const StatsOverviewSkeleton = () => {
  const statItems = [
    { label: "Day Streak", icon: Flame, color: "#fe8019" },
    { label: "Saved Verses", icon: Bookmark, color: "#fabd2f" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
        <BarChart3 className="h-4 w-4 mr-2 text-[#fe8019]" />
        Your Progress
      </h2>
      <div className="grid text-center gap-3 grid-cols-2">
        {statItems.map((stat) => (
          <Card
            key={stat.label}
            className="bg-[#282828] border-[#3c3836] relative overflow-hidden group hover:border-[#504945] transition-colors flex-1"
          >
            <CardContent className="flex items-center gap-4 animate-pulse">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
              </div>
              <div className="flex items-center justify-center flex-col gap-1">
                <div className="h-5 w-10 bg-[#3c3836] rounded-md" />
                <span className="text-xs text-[#a89984]">{stat.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsOverviewSkeleton;
