import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-8 bg-[#3c3836]" />
        <div className="text-center flex-1">
          <Skeleton className="h-6 w-40 mx-auto bg-[#3c3836]" />
          <Skeleton className="h-4 w-24 mx-auto mt-2 bg-[#3c3836]" />
        </div>
        <Skeleton className="h-8 w-8 bg-[#3c3836]" />
      </div>

      <Skeleton className="h-10 w-full bg-[#3c3836]" />
      <Skeleton className="h-8 w-32 ml-auto bg-[#3c3836]" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#282828] border border-[#3c3836] rounded-lg p-6 space-y-4"
          >
            <Skeleton className="h-4 w-24 bg-[#3c3836]" />
            <Skeleton className="h-6 w-full bg-[#3c3836]" />
            <Skeleton className="h-4 w-3/4 bg-[#3c3836]" />
            <Skeleton className="h-4 w-20 bg-[#3c3836]" />
          </div>
        ))}
      </div>
    </div>
  );
}
