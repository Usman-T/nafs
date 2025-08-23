import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSettings = () => {
  const SettingRowSkeleton = () => (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <Skeleton className="h-10 w-10 rounded-xl bg-[#3c3836]" />
        <div className="flex flex-col min-w-0 gap-1">
          <Skeleton className="h-4 w-32 bg-[#3c3836]" />
          <Skeleton className="h-3 w-44 bg-[#3c3836]" />
        </div>
      </div>
      <Skeleton className="h-6 w-10 rounded-full bg-[#3c3836]" />
    </div>
  );

  return (
    <div>
      {/* Tabs Skeleton */}
      <div className="flex gap-2 p-8 mb-4">
        <Skeleton className="h-9 w-24 rounded-md bg-[#3c3836]" />
        <Skeleton className="h-9 w-24 rounded-md bg-[#3c3836]" />
      </div>

      {/* Card Skeleton */}
      <Card className="bg-[#282828] overflow-hidden shadow-lg rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle>
            <Skeleton className="h-5 w-40 bg-[#3c3836]" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* General Section */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 bg-[#3c3836]" />
            <SettingRowSkeleton />
            <SettingRowSkeleton />
          </div>

          <Separator className="bg-[#3c3836]" />

          {/* Privacy Section */}
          <div className="space-y-4 mt-4">
            <Skeleton className="h-4 w-24 bg-[#3c3836]" />
            <SettingRowSkeleton />
            <SettingRowSkeleton />
          </div>

          <Separator className="bg-[#3c3836]" />
        </CardContent>

        <CardFooter className="mt-4 pt-3 flex justify-end">
          <Skeleton className="h-10 w-32 rounded-lg bg-[#3c3836]" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoadingSettings;
