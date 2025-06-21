import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import Search from "@/components/custom/guidance/search";
import StatsOverviewWrapper from "@/components/custom/guidance/wrappers/stats-overview-wrapper";
import DailyAyahSectionWrapper from "@/components/custom/guidance/wrappers/daily-ayah-wrapper";
import QuickActions from "@/components/custom/guidance/quick-actions";
import FeaturedSurahsSectionWrapper from "@/components/custom/guidance/wrappers/featured-surah-wrapper";
import { CommandPaletteProvider } from "@/components/custom/guidance/context/command-palette-context";
import CommandPaletteWrapper from "@/components/custom/guidance/wrappers/command-palette-wrapper";

const GuidancePage = () => {
  return (
    <div className="space-y-6 pb-16 px-6 py-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#ebdbb2] mb-1">
          Guidance
        </h1>
        <p className="text-[#a89984] text-sm">Your journey through the Quran</p>
      </div>
      <CommandPaletteProvider>
        <Search  />
        <CommandPaletteWrapper />
      </CommandPaletteProvider>
      <Suspense>
        <StatsOverviewWrapper />
      </Suspense>
      
      <Suspense
        fallback={
          <div className="h-40 bg-[#282828] rounded-lg animate-pulse"></div>
        }
      >
        <DailyAyahSectionWrapper />
      </Suspense>
      <div>
        <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-[#fe8019]" />
          Quick Actions
        </h2>
        <QuickActions />
      </div>
      <Suspense
        fallback={
          <div className="h-40 bg-[#282828] rounded-lg animate-pulse"></div>
        }
      >
        <FeaturedSurahsSectionWrapper />
      </Suspense>
    </div>
  );
};

export default GuidancePage;
