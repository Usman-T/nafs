import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

const Loading = () => {
  return (
    <div className="space-y-8 p-8">
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <Skeleton className="h-6 w-24 bg-[#3c3836]" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-md bg-[#3c3836]" />
              <Skeleton className="h-8 w-16 rounded-md bg-[#3c3836]" />
              <Skeleton className="h-8 w-8 rounded-md bg-[#3c3836]" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-32 mb-4 bg-[#3c3836]" />
          <div className="grid grid-cols-7 gap-1 mb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-6 bg-[#3c3836]" />
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: 42 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-md bg-[#3c3836]" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-[#fe8019] mr-2" />
              <Skeleton className="h-5 w-48 bg-[#3c3836]" />
            </div>
            <Skeleton className="h-4 w-16 bg-[#3c3836]" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-12 w-full rounded-md bg-[#3c3836]"
            />
          ))}
          <Skeleton className="h-24 w-full rounded-md bg-[#3c3836]" />
        </CardContent>
      </Card>
    </div>
  )
}

export default Loading