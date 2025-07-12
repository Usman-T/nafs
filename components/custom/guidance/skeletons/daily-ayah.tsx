"use client";

import { Card, CardContent } from "@/components/ui/card";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-[#3c3836] rounded-md animate-pulse ${className}`} />
);

const DailyAyahSectionSkeleton = () => {
  return (
    <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] shadow-xl rounded-3xl relative overflow-hidden">
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#3c3836] animate-pulse" />
            <div className="space-y-1">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-3 w-16" />
            </div>
          </div>
          <SkeletonBox className="h-8 w-8 rounded-full" />
        </div>

        <div className="bg-[#1d2021] rounded-2xl p-5 border border-[#3c3836] shadow space-y-3">
          <SkeletonBox className="h-8 w-full" />
          <SkeletonBox className="h-5 w-3/4" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <SkeletonBox className="h-9 w-9 rounded-full" />
            <SkeletonBox className="h-9 w-9 rounded-full" />
            <SkeletonBox className="h-9 w-9 rounded-full" />
          </div>
          <SkeletonBox className="h-9 w-9 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyAyahSectionSkeleton;
