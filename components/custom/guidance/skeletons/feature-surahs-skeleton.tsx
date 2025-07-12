"use client";

import { Card, CardContent } from "@/components/ui/card";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-[#3c3836] rounded-md animate-pulse ${className}`} />
);

const FeaturedSurahsSkeleton = () => {
  const placeholders = Array(3).fill(0);

  return (
    <Card className="bg-[#282828] border-[#3c3836] rounded-2xl shadow-md">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#fe8019]" />
            <SkeletonBox className="h-4 w-24" />
          </div>
          <SkeletonBox className="h-4 w-12 rounded-full" />
        </div>

        {placeholders.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-xl bg-[#1d2021] border border-[#3c3836]"
          >
            <div className="h-10 w-10 rounded-full bg-[#3c3836] animate-pulse" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex justify-between gap-2">
                <SkeletonBox className="h-4 w-1/3" />
                <SkeletonBox className="h-4 w-1/4" />
              </div>
              <SkeletonBox className="h-1.5 w-full rounded-full" />
            </div>
            <SkeletonBox className="h-4 w-4 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeaturedSurahsSkeleton;
