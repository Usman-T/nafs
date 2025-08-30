"use server";

import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import AyahContent from "@/components/custom/guidance/ayah/ayah-content";
import Particles from "@/components/custom/guidance/ayah/particles";
import Link from "next/link";
import { fetchVerse } from "@/lib/utils/guidance";
import AyahHeader from "@/components/custom/guidance/ayah/ayah-header";

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
        <Particles />

        <AyahHeader verse={verse} />

        <AyahContent verse={verse} ayahId={ayahId} />
      </div>
    );
  } catch (error) {
    console.log(error);
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
