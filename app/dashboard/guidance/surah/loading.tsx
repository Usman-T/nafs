import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const SurahsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2]">
      <div className="sticky top-0 z-10 bg-[#1d2021] border-b border-[#3c3836]">
        <div className="px-4 py-3 flex justify-between items-center">
          <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
          <div className="flex flex-col justify-center items-center">
            <Skeleton className="h-5 w-40 bg-[#3c3836] mb-1" />
            <Skeleton className="h-4 w-28 bg-[#3c3836]" />
          </div>
          <div></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-[#282828] rounded-lg p-6 border border-[#3c3836] mb-6">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-full bg-[#3c3836]" />
            <div className="flex gap-2 w-full lg:w-1/2">
              <Skeleton className="h-10 w-full bg-[#3c3836]" />
              <Skeleton className="h-10 w-full bg-[#3c3836]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="bg-[#282828] border-[#3c3836] overflow-hidden relative group"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <Skeleton className="h-12 w-12 rounded-full bg-[#3c3836]" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 bg-[#3c3836] mb-2" />
                      <Skeleton className="h-4 w-24 bg-[#3c3836]" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 bg-[#3c3836]" />
                </div>

                <div className="gap-2 mt-4 w-full items-center flex space-x-3 justify-between">
                  <Skeleton className="h-8 rounded bg-[#3c3836] w-full" />
                  <Skeleton className="h-8 rounded bg-[#3c3836] w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurahsPageSkeleton;
