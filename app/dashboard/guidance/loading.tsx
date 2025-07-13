"use client";

import { Sparkles, BarChart3 } from "lucide-react";
import StatsOverviewSkeleton from "@/components/custom/guidance/skeletons/stats-overview";
import DailyAyahSectionSkeleton from "@/components/custom/guidance/skeletons/daily-ayah";
import FeaturedSurahsSkeleton from "@/components/custom/guidance/skeletons/feature-surahs-skeleton";

const GuidanceLoading = () => {
  return (
    <div className="space-y-6 pb-16 px-6 py-8">
      <div className="text-center space-y-1">
        <div className="h-7 w-40 mx-auto bg-[#3c3836] rounded-md animate-pulse" />
        <div className="h-4 w-48 mx-auto bg-[#3c3836] rounded-md animate-pulse" />
      </div>
      <div className="h-12 w-full bg-[#3c3836] rounded-md animate-pulse" />{" "}
      <div>
        <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
          <BarChart3 className="h-4 w-4 mr-2 text-[#fe8019]" />
          Your Progress
        </h2>
        <StatsOverviewSkeleton />
      </div>
      <DailyAyahSectionSkeleton />
      <div>
        <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-[#fe8019]" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-[#282828] border-[#3c3836] rounded-2xl h-32 animate-pulse"
            />
          ))}
        </div>
      </div>
      <FeaturedSurahsSkeleton />
    </div>
  );
};

export default GuidanceLoading;
