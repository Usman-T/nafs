import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] max-w-4xl mx-auto">
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between w-full border-b border-[#2e2e2e] bg-[#1d2021]/80 px-6 backdrop-blur-md md:px-8 shadow-lg">
        <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
        <div className="text-center">
          <Skeleton className="h-6 w-32 bg-[#3c3836] mx-auto mb-1" />
          <Skeleton className="h-4 w-20 bg-[#3c3836] mx-auto" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
      </div>

      <div className="mt-8 mb-8 p-4">
        <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836]">
          <CardContent className="sm:p-8">
            <div className="flex justify-center mb-6">
              <Skeleton className="h-8 w-24 rounded-full bg-[#fe8019]/30" />
            </div>

            <div className="text-center mb-6">
              <Skeleton className="h-10 w-full mb-4 bg-[#3c3836]" />
            </div>

            <div className="text-center mb-6">
              <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-[#3c3836]" />
              <Skeleton className="h-4 w-1/2 mx-auto bg-[#3c3836]" />
            </div>

            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 w-8 rounded-full bg-[#3c3836]"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#282828] border-[#3c3836] mb-8">
        <CardContent className="p-4">
          <Skeleton className="h-6 w-40 mb-4 bg-[#3c3836]" />
          <Skeleton className="h-4 w-full mb-2 bg-[#3c3836]" />
          <Skeleton className="h-4 w-5/6 mb-2 bg-[#3c3836]" />
          <Skeleton className="h-4 w-2/3 bg-[#3c3836]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;
