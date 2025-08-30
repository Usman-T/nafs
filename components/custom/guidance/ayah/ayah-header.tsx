"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

const AyahHeader = ({ verse }) => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between w-full border-b border-[#2e2e2e] bg-[#1d2021]/80 px-6 backdrop-blur-md md:px-8 shadow-lg">
      <div className="flex items-center justify-between w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-[#a89984] hover:text-[#ebdbb2]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="text-center">
          <h1 className="text-lg font-semibold">{verse?.surahName}</h1>
        </div>

        <Link href={`/dashboard/guidance/surah/${verse.surahId}`}>
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
  );
};

export default AyahHeader;
