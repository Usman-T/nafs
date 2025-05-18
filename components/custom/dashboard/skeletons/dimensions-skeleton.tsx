import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DimensionsSkeleton = () => {
  return (
    <Card className="bg-[#282828] border-[#3c3836]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <Skeleton className="h-6 w-40 bg-[#3c3836]" />
          <Skeleton className="h-5 w-20 bg-[#3c3836]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Radar Chart Skeleton */}
        <div className="flex flex-col items-center">
          <Skeleton className="h-64 w-64 rounded-full bg-[#3c3836]" />
          <div className="mt-4 space-y-2 text-center">
            <Skeleton className="h-5 w-32 mx-auto bg-[#3c3836]" />
            <Skeleton className="h-8 w-16 mx-auto bg-[#3c3836]" />
            <Skeleton className="h-4 w-48 mx-auto bg-[#3c3836]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionsSkeleton;
