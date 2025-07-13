import { notFound } from "next/navigation";
import { SurahProvider } from "@/lib/context/surah-page-context";
import SurahHeader from "@/components/custom/guidance/surah/surah-header";
import SurahIntro from "@/components/custom/guidance/surah/surah-intro";
import Verse from "@/components/custom/guidance/surah/surah-verse";
import AudioPlayer from "@/components/custom/guidance/surah/surah-audio-player";
import SettingsPanel from "@/components/custom/guidance/surah/surah-settings";
import VerseListPanel from "@/components/custom/guidance/surah/surah-verse-list";
import SurahInfoPanel from "@/components/custom/guidance/surah/surah-info-panel";
import { SurahDataService } from "@/lib/context/surah-data-service";

export default async function SurahPage({ params }: { params: { id: string } }) {
  const surahId = Number(params.id);
  if (isNaN(surahId)) return notFound();

  const surah = await SurahDataService.getSurah(surahId);
  const verses = await SurahDataService.getSurahVerses(surahId);

  if (!surah || !verses || verses.length === 0) return notFound();

  return (
    <SurahProvider initialSurah={surah} initialVerses={verses}>
      <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] pb-20">
        <SurahHeader />
        <div className="max-w-3xl mx-auto px-4 py-6">
          <SurahIntro />
          <div className="space-y-6">
            {verses.map((verse) => (
              <Verse key={verse.id} verse={verse} />
            ))}
          </div>
        </div>
        <AudioPlayer />
        <SettingsPanel />
        <SurahInfoPanel />
        <VerseListPanel />
      </div>
    </SurahProvider>
  );
}