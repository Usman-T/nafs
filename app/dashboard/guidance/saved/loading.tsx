// components/ui/loading.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading({
  fullScreen = false,
  text = "Loading saved verses...",
}: {
  fullScreen?: boolean;
  text?: string;
}) {
  return (
    <div
      className={`${
        fullScreen ? "min-h-screen" : ""
      } bg-[#1d2021] text-[#ebdbb2] px-4 py-8`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-8 bg-[#3c3836]" />
          <div className="text-center flex-1">
            <Skeleton className="h-6 w-40 mx-auto bg-[#3c3836]" />
            <Skeleton className="h-4 w-24 mx-auto mt-2 bg-[#3c3836]" />
          </div>
          <Skeleton className="h-8 w-8 bg-[#3c3836]" />
        </div>

        <div className="relative">
          <Skeleton className="h-10 w-full rounded bg-[#3c3836]" />
        </div>

        <div className="flex justify-end items-center gap-2">
          <Skeleton className="h-4 w-4 bg-[#3c3836]" />
          <Skeleton className="h-8 w-32 rounded bg-[#3c3836]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#282828] border border-[#3c3836] rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28 bg-[#3c3836]" />
                <Skeleton className="h-4 w-16 bg-[#3c3836]" />
              </div>
              <Skeleton className="h-6 w-full bg-[#3c3836]" />
              <Skeleton className="h-4 w-3/4 bg-[#3c3836]" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12 bg-[#3c3836]" />
                <Skeleton className="h-4 w-16 bg-[#3c3836]" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#a89984] mt-12">{text}</p>
      </div>
    </div>
  );
}