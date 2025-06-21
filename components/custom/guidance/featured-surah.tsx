"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

const FeaturedSurahsSection = ({ surahs }) => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Card className="bg-[#282828] border-[#3c3836]">
      <CardContent className="">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[#ebdbb2] flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-[#fe8019]" />
            Continue Reading
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/guidance/surahs")}
            className="text-[#a89984] hover:text-[#ebdbb2] h-7 px-2 text-xs"
          >
            View All
          </Button>
        </div>

        <div ref={ref} className="space-y-3">
          {surahs.map((surah) => (
            <div
              key={surah.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#1d2021] border border-[#3c3836] hover:border-[#504945] transition-colors cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/guidance/surah/${surah.id}`)
              }
            >
              <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center text-[#ebdbb2] font-medium flex-shrink-0 text-sm">
                {surah.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-[#ebdbb2] text-sm font-medium">
                    {surah.name}
                  </h4>
                  <p className="text-[#fe8019] font-arabic text-sm">
                    {surah.arabicName}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#a89984]">Progress</span>
                    <span className="text-[#ebdbb2]">{surah.progress}%</span>
                  </div>
                  <div className="w-full bg-[#3c3836] rounded-full h-1.5">
                    <div
                      className="bg-[#8ec07c] h-1.5 rounded-full"
                      style={{ width: `${surah.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#a89984]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedSurahsSection;
