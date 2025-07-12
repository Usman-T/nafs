import React from "react";
import StatsOverview from "../main/stats-overview";
import { BarChart3 } from "lucide-react";
import { fetchGuidancePageStats } from "@/lib/data";

const StatsOverviewWrapper = async () => {
  const { readingStreak, savedAyahs, reflections } =
    await fetchGuidancePageStats();

  const userStats = {
    totalReflections: reflections,
    savedVerses: savedAyahs,
    completedSurahs: 3,
    listeningHours: 12.5,
    currentStreak: readingStreak,
    totalReadingDays: 45,
  };
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
