import { Suspense } from "react";
import DimensionsWrapper from "@/components/custom/dashboard/wrappers/dimensions-wrapper";
import DimensionsSkeleton from "@/components/custom/dashboard/skeletons/dimensions-skeleton";
import TasksWrapper from "@/components/custom/dashboard/wrappers/tasks-wrapper";
import TasksSkeleton from "@/components/custom/dashboard/skeletons/tasks-skeleton";
import CalendarWrapper from "@/components/custom/dashboard/wrappers/calendar-wrapper";
import CalendarSkeleton from "@/components/custom/dashboard/skeletons/calendar-skeleton";
import SpiritualPath from "@/components/custom/dashboard/path-dashboard";

const DashboardPage = async () => {
  return (
    <div className="space-y-8 p-8">
      <SpiritualPath currentLevel={1} currentStreak={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<TasksSkeleton />}>
          <TasksWrapper />
        </Suspense>
        <Suspense fallback={<DimensionsSkeleton />}>
          <DimensionsWrapper />
        </Suspense>
      </div>
      <Suspense fallback={<CalendarSkeleton />}>
        <CalendarWrapper />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
