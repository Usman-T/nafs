import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 p-8">
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <Skeleton className="h-6 w-40 bg-[#3c3836]" />
            <Skeleton className="h-5 w-24 bg-[#3c3836]" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full bg-[#3c3836]" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-[#3c3836]" />
              <Skeleton className="h-4 w-48 bg-[#3c3836]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32 bg-[#3c3836]" />
              <Skeleton className="h-4 w-10 bg-[#3c3836]" />
            </div>
            <Skeleton className="h-2 w-full bg-[#3c3836]" />
            <Skeleton className="h-4 w-48 bg-[#3c3836]" />
          </div>
        </CardContent>
      </Card>

      {/* Tasks and Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tasks Skeleton */}
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
                  <Skeleton key={i} className="h-[72px] w-full rounded-lg bg-[#3c3836]" />
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

        {/* Dimensions Skeleton */}
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
      </div>

      {/* Calendar Skeleton */}
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
              <Skeleton key={`weekday-${i}`} className="h-4 w-full bg-[#3c3836]" />
            ))}
            
            {[...Array(35)].map((_, i) => (
              <Skeleton key={`day-${i}`} className="h-8 w-8 rounded-md bg-[#3c3836] mx-auto" />
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

      {/* Stats Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-[#282828] border-[#3c3836]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-5 w-24 bg-[#3c3836]" />
                <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
              </div>
              <Skeleton className="h-8 w-20 bg-[#3c3836] mb-1" />
              <Skeleton className="h-4 w-full bg-[#3c3836]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;