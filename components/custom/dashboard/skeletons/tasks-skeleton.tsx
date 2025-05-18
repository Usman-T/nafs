import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TasksSkeleton = () => {
  return (
    <Card className="bg-[#282828] border-[#3c3836]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center justify-between">
          <Skeleton className="h-7 w-32 bg-[#3c3836]" />
          <Skeleton className="h-6 w-16 bg-[#3c3836]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-2 w-full bg-[#3c3836]" />

          {/* Date Carousel Skeleton */}
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-[72px] w-full rounded-lg bg-[#3c3836]"
              />
            ))}
          </div>

          <Skeleton className="h-5 w-full bg-[#3c3836]" />
        </div>

        {/* Task List Skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full bg-[#3c3836] mr-3" />
                <Skeleton className="h-5 w-32 bg-[#3c3836]" />
              </div>
              <Skeleton className="h-7 w-7 rounded-full bg-[#3c3836]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksSkeleton;
