import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CalendarSkeleton = () => {
  return (
    <Card className="bg-[#282828] border-[#3c3836]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <Skeleton className="h-6 w-40 bg-[#3c3836]" />
          <Skeleton className="h-5 w-24 bg-[#3c3836]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-6 mb-4">
          <Skeleton className="h-6 w-24 bg-[#3c3836]" />
          <Skeleton className="h-6 w-24 bg-[#3c3836]" />
        </div>

        {/* Calendar Grid Skeleton */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {[...Array(7)].map((_, i) => (
            <Skeleton
              key={`weekday-${i}`}
              className="h-4 w-full bg-[#3c3836]"
            />
          ))}

          {[...Array(35)].map((_, i) => (
            <Skeleton
              key={`day-${i}`}
              className="h-8 w-8 rounded-md bg-[#3c3836] mx-auto"
            />
          ))}
        </div>

        <div className="flex justify-between">
          {[...Array(3)].map((_, i) => (
            <div key={`legend-${i}`} className="flex items-center">
              <Skeleton className="h-3 w-3 rounded-sm mr-2 bg-[#3c3836]" />
              <Skeleton className="h-4 w-24 bg-[#3c3836]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSkeleton;
