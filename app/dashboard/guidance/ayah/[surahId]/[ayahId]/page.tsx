"use server";

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
  try {
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
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] relative overflow-hidden flex items-center justify-center">
        <Particles />
        <div className="text-center p-6 bg-[#282828]/80 rounded-lg backdrop-blur-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Not found</h2>
          <p className="mb-6">Couldn't find this verse</p>
          <Link href="/dashboard/guidance">
            <Button
              variant="outline"
              className="text-[#ebdbb2] border-[#a89984] hover:bg-[#3c3836]"
            >
              Back to Guidance
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default AyahPage;
