import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="bg-[#1d2021] animate-pulse">
      {/* Hero Section */}
      <div className="p-6">
        {/* Greeting Skeleton */}
        <div className="mb-6">
          <div className="h-6 w-40 bg-[#3c3836] rounded mb-2"></div>
          <div className="h-4 w-60 bg-[#3c3836] rounded"></div>
        </div>

        {/* Streak & Progress Card Skeleton */}
        <div className="bg-[#282828] rounded-3xl p-6 border border-[#3c3836] mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-[#3c3836] rounded-2xl"></div>
              <div>
                <div className="h-6 w-20 bg-[#3c3836] rounded mb-1"></div>
                <div className="h-4 w-24 bg-[#3c3836] rounded"></div>
              </div>
            </div>
            <div>
              <div className="h-6 w-16 bg-[#3c3836] rounded mb-1"></div>
              <div className="h-4 w-24 bg-[#3c3836] rounded"></div>
            </div>
          </div>
          <div className="h-3 bg-[#3c3836] rounded-full mb-3"></div>
          <div className="flex items-center justify-between text-sm">
            <div className="h-4 w-32 bg-[#3c3836] rounded"></div>
            <div className="h-4 w-16 bg-[#3c3836] rounded"></div>
          </div>
        </div>

        {/* Week Calendar Skeleton */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 w-32 bg-[#3c3836] rounded"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-[#3c3836] rounded-full"></div>
              <div className="h-8 w-8 bg-[#3c3836] rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[#3c3836] rounded-2xl"></div>
            ))}
          </div>
        </div>

        {/* Tasks Section Skeleton */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-40 bg-[#3c3836] rounded"></div>
            <div className="h-6 w-20 bg-[#3c3836] rounded"></div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#282828] rounded-2xl p-4 border border-[#3c3836]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#3c3836] rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 w-40 bg-[#3c3836] rounded mb-2"></div>
                    <div className="h-4 w-24 bg-[#3c3836] rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Info Skeleton */}
        <div className="bg-[#282828] rounded-2xl p-4 border border-[#3c3836]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3c3836] rounded-xl"></div>
            <div className="flex-1">
              <div className="h-6 w-40 bg-[#3c3836] rounded mb-2"></div>
              <div className="h-4 w-60 bg-[#3c3836] rounded"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-4 w-32 bg-[#3c3836] rounded mb-2"></div>
            <div className="flex space-x-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-2 flex-1 bg-[#3c3836] rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;