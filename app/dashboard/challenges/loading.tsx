import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="animate-pulse space-y-8 p-6">
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
        <CardHeader className="pb-3">
          <div className="h-6 w-40 bg-[#3c3836] rounded-md" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="h-4 w-20 bg-[#3c3836] rounded" />
              <div className="h-4 w-16 bg-[#3c3836] rounded" />
            </div>
            <div className="h-2 bg-[#1d2021] rounded-full" />
            <div className="h-4 w-full bg-[#3c3836] rounded-md" />
          </div>

          <div className="space-y-4">
            <div className="h-4 w-32 bg-[#3c3836] rounded" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-md bg-[#1d2021] border border-[#3c3836]"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-[#3c3836]" />
                  <div className="h-4 w-40 bg-[#3c3836] rounded" />
                </div>
                <div className="h-8 w-8 rounded-full bg-[#3c3836]" />
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="border-t border-[#3c3836] pt-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-[#3c3836] rounded" />
              <div className="h-4 w-10 bg-[#3c3836] rounded" />
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 flex-1 rounded-full bg-[#3c3836]"
                ></div>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}