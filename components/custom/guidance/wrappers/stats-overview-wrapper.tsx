import React from "react";
import StatsOverview from "../stats-overview";
import { BarChart3 } from "lucide-react";

const userStats = {
  totalReflections: 24,
  savedVerses: 18,
  completedSurahs: 3,
  listeningHours: 12.5,
  currentStreak: 7,
  totalReadingDays: 45,
};

const StatsOverviewWrapper = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
        <BarChart3 className="h-4 w-4 mr-2 text-[#fe8019]" />
        Your Progress
      </h2>
      <StatsOverview stats={userStats} />
    </div>
  );
};

export default StatsOverviewWrapper;
