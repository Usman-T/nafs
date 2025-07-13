"use client";

import { Skeleton } from "@/components/ui/skeleton";

function SurahHeaderSkeleton() {
  return (
    <div className="sticky top-0 z-10 bg-[#1d2021] border-b border-[#3c3836]">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="flex flex-col items-center">
          <Skeleton className="h-5 w-28 mb-1" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </div>
  );
}

function SurahIntroSkeleton() {
  return (
    <div className="mb-8 text-center">
      <Skeleton className="h-6 w-32 mx-auto mb-2" />
      <Skeleton className="h-8 w-48 mx-auto mb-4" />
      <div className="mt-6 p-4 rounded-lg bg-[#282828] border border-[#3c3836]">
        <Skeleton className="h-6 w-64 mx-auto mb-2" />
        <Skeleton className="h-4 w-52 mx-auto" />
      </div>
    </div>
  );
}

function VerseSkeleton() {
  return (
    <div className="mb-6 p-4 rounded-lg bg-[#1d2021] border border-[#3c3836] space-y-4">
      <Skeleton className="h-5 w-14" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-[70%]" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="pb-20">
      <SurahHeaderSkeleton />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <SurahIntroSkeleton />

        {/* Verse Skeletons */}
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <VerseSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
