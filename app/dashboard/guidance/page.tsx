import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import Search from "@/components/custom/guidance/search-surahs/search";
import StatsOverviewWrapper from "@/components/custom/guidance/wrappers/stats-overview-wrapper";
import DailyAyahSectionWrapper from "@/components/custom/guidance/wrappers/daily-ayah-wrapper";
import QuickActions from "@/components/custom/guidance/main/quick-actions";
import FeaturedSurahsSectionWrapper from "@/components/custom/guidance/wrappers/featured-surah-wrapper";
import { CommandPaletteProvider } from "@/components/custom/guidance/context/command-palette-context";
import CommandPaletteWrapper from "@/components/custom/guidance/wrappers/command-palette-wrapper";
import StatsOverviewSkeleton from "@/components/custom/guidance/skeletons/stats-overview";
import DailyAyahSectionSkeleton from "@/components/custom/guidance/skeletons/daily-ayah";
import FeaturedSurahsSkeleton from "@/components/custom/guidance/skeletons/feature-surahs-skeleton";

const GuidancePage = async () => {
  return (
    <div className="space-y-6 pb-16 px-6 py-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#ebdbb2] mb-1">
          Guidance
        </h1>
        <p className="text-[#a89984] text-sm">Your journey through the Quran</p>
      </div>
      <CommandPaletteProvider>
        <Search />
        <CommandPaletteWrapper />
      </CommandPaletteProvider>
      <Suspense fallback={<StatsOverviewSkeleton />}>
        <StatsOverviewWrapper />
      </Suspense>

      <Suspense fallback={<DailyAyahSectionSkeleton />}>
        <DailyAyahSectionWrapper />
      </Suspense>
      <div>
        <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-[#fe8019]" />
          Quick Actions
        </h2>
        <QuickActions />
      </div>
      <Suspense fallback={<FeaturedSurahsSkeleton />}>
        <FeaturedSurahsSectionWrapper />
      </Suspense>
    </div>
  );
};

export default GuidancePage;
