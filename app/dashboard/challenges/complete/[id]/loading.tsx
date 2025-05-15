import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-center">
                <Skeleton className="h-6 w-6 rounded-full bg-[#3c3836] mr-2" />
                <Skeleton className="h-6 w-32 bg-[#3c3836]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-8 flex flex-col items-center">
              <div className="text-center space-y-4 w-full">
                <div className="flex justify-center">
                  <Skeleton className="h-12 w-12 rounded-full bg-[#3c3836]" />
                </div>
                <Skeleton className="h-6 w-48 mx-auto bg-[#3c3836]" />
                <Skeleton className="h-4 w-64 mx-auto bg-[#3c3836]" />
              </div>

              <div className="relative w-48 h-48">
                <Skeleton className="absolute inset-0 rounded-full bg-[#3c3836]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="h-32 w-32 rounded-full bg-[#504945]" />
                </div>
              </div>

              <Skeleton className="h-4 w-48 bg-[#3c3836]" />
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
