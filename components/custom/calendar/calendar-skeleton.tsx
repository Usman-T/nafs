"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CalendarLoading = () => {
  return (
    <div className="bg-[#1d2021] min-h-screen text-[#ebdbb2] animate-pulse">
      {/* Calendar skeleton */}
      <Card className="bg-[#1d2021] border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="h-6 w-32 bg-[#3c3836] rounded"></div>
          <div className="h-9 w-20 bg-[#3c3836] rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="w-full rounded border border-[#3c3836] bg-[#282828] p-4">
            <div className="h-6 w-40 bg-[#3c3836] rounded-2xl mb-3 mx-auto"></div>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={`header-${i}`}
                  className="h-4 w-4 bg-[#3c3836] rounded mx-auto"
                />
              ))}
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={`day-${i}`}
                  className="h-8 w-8 bg-[#3c3836] rounded-lg mx-auto"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks skeleton */}
      <Card className="bg-[#1d2021] border-none shadow-none mt-3">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-24 bg-[#3c3836] rounded"></div>
              <div className="h-5 w-10 bg-[#3c3836] rounded"></div>
            </div>
            <div className="h-12 bg-[#3c3836] rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`task-${i}`}
                className="h-14 bg-[#282828] rounded-lg border border-[#3c3836]"
              ></div>
            ))}
          </div>
          <div className="h-16 bg-[#282828] rounded-lg border border-[#3c3836]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarLoading;
