import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import AyahContent from "@/components/custom/guidance/ayah/ayah-content";
import Particles from "@/components/custom/guidance/ayah/particles";
import Link from "next/link";
import { fetchVerse } from "@/lib/utils/guidance";

type AyahPageProps = {
  params: {
    surahId: string;
    ayahId: string;
  };
};

const AyahPage = async ({ params }: AyahPageProps) => {
  const surahId = Number(params.surahId);
  const ayahId = Number(params.ayahId);

  // Fetch verse using your helper — already shaped properly
  const verse = await fetchVerse(surahId, ayahId);

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] relative overflow-hidden">
      {/* Background particles */}
      <Particles />

      {/* Header */}
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between w-full border-b border-[#2e2e2e] bg-[#1d2021]/80 px-6 backdrop-blur-md md:px-8 shadow-lg">
        <div className="flex items-center justify-between w-full">
          <Link href={`/dashboard/guidance/`}>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#a89984] hover:text-[#ebdbb2]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-lg font-semibold">
              Surah {verse.surahId} - Ayah {verse.ayahId}
            </h1>
            <p className="text-sm text-[#a89984]">{verse.reference}</p>
          </div>

          <Link href={`/dashboard/guidance/surah/${surahId}`}>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#a89984] hover:text-[#ebdbb2]"
            >
              <BookOpen className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <AyahContent verse={verse} ayahId={ayahId} />
    </div>
  );
};

export default AyahPage;
