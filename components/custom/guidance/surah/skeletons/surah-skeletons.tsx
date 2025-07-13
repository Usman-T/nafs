import { Skeleton } from "@/components/ui/skeleton";

export function SurahHeaderSkeleton() {
  return (
    <div className="sticky top-0 z-10 bg-[#1d2021] border-b border-[#3c3836]">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
        
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-5 w-32 bg-[#3c3836]" />
          <Skeleton className="h-3 w-24 bg-[#3c3836]" />
        </div>
        
        <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
      </div>
    </div>
  );
}

export function SurahIntroSkeleton() {
  return (
    <div className="mb-8 p-6 rounded-lg bg-[#282828] border border-[#3c3836]">
      <div className="text-center space-y-4">
        <Skeleton className="h-8 w-48 mx-auto bg-[#3c3836]" />
        <Skeleton className="h-6 w-32 mx-auto bg-[#3c3836]" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-4 w-16 bg-[#3c3836]" />
          <Skeleton className="h-4 w-20 bg-[#3c3836]" />
        </div>
        <Skeleton className="h-16 w-full bg-[#3c3836]" />
      </div>
    </div>
  );
}

export function VerseSkeleton() {
  return (
    <div className="mb-8 p-4 rounded-lg border bg-[#282828] border-[#3c3836]">
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full bg-[#3c3836]" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Arabic text */}
        <div className="text-right space-y-2">
          <Skeleton className="h-8 w-full bg-[#3c3836]" />
          <Skeleton className="h-8 w-4/5 ml-auto bg-[#3c3836]" />
        </div>

        {/* Translation */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full bg-[#3c3836]" />
          <Skeleton className="h-5 w-3/4 bg-[#3c3836]" />
        </div>

        {/* Transliteration */}
        <Skeleton className="h-4 w-2/3 bg-[#3c3836]" />

        {/* Show Tafsir button */}
        <div className="flex justify-center mt-2">
          <Skeleton className="h-8 w-24 bg-[#3c3836]" />
        </div>
      </div>
    </div>
  );
}

export function VersesSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <SurahIntroSkeleton />
      {[...Array(7)].map((_, i) => (
        <VerseSkeleton key={i} />
      ))}
      
      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8">
        <Skeleton className="h-10 w-20 bg-[#3c3836]" />
        <Skeleton className="h-4 w-32 bg-[#3c3836]" />
        <Skeleton className="h-10 w-20 bg-[#3c3836]" />
      </div>
    </div>
  );
}

export function AudioPlayerSkeleton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1d2021] border-t border-[#3c3836] p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
            <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
            <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
          </div>
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16 bg-[#3c3836]" />
            <Skeleton className="h-2 w-32 bg-[#3c3836]" />
          </div>
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
            <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SurahPageSkeleton() {
  return (
    <div className="min-h-screen pb-20 bg-[#1d2021] text-[#ebdbb2]">
      <SurahHeaderSkeleton />