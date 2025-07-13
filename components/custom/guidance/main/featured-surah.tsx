"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookDashed,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

const FeaturedSurahsSection = ({ surahs }) => {
  const router = useRouter();
  const { ref } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Card className="bg-[#282828] border-[#3c3836] rounded-2xl shadow-md">
      <CardContent className="">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#ebdbb2] flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-[#fe8019]" />
            Continue Reading
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/guidance/surah")}
            className="text-[#a89984] hover:text-[#ebdbb2] h-7 px-2 text-xs"
          >
            View All
          </Button>
        </div>

        <div ref={ref} className="space-y-3">
          {surahs.length > 0 ? (
            surahs.map((surah) => (
              <div
                key={surah.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-[#1d2021] border border-[#3c3836] hover:border-[#504945] transition-all cursor-pointer group"
                onClick={() =>
                  router.push(`/dashboard/guidance/surah/${surah.id}`)
                }
              >
                <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center text-[#ebdbb2] font-semibold text-sm">
                  {surah.surahId}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <h4 className="text-[#ebdbb2] text-sm font-medium truncate">
                      {surah.name}
                    </h4>
                    <p className="text-[#fe8019] font-arabic text-sm truncate">
                      {surah.arabicName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#a89984]">Progress</span>
                      <span className="text-[#ebdbb2]">
                        {surah.currentVerse}%
                      </span>
                    </div>
                    <div className="w-full bg-[#3c3836] rounded-full h-1.5">
                      <div
                        className="bg-[#8ec07c] h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${surah.currentVerse}%` }}
                      />
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#a89984] group-hover:text-[#fe8019] transition" />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center rounded-2xl mb-4 shadow-inner">
              <div className="bg-[#3c3836] p-3 rounded-full mb-3">
                {" "}
                <BookDashed className="h-6 w-6 text-[#fe8019]" />{" "}
              </div>
              <h4 className="text-[#ebdbb2] text-sm font-semibold mb-1">
                No Surahs Read Yet
              </h4>
              <p className="text-[#a89984] text-xs">
                Start reading a surah. Your progress will appear here.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedSurahsSection;
