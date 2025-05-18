import Tasks from "@/components/custom/dashboard/tasks";
import Dimensions from "@/components/custom/dashboard/dimensions";
import DashboardCalendar from "@/components/custom/dashboard/calendar-dashboard";
import StatsCards from "@/components/custom/dashboard/stats-cards";
import {
  fetchCurrentChallenge,
  fetchDailyTasks,
  fetchUserDimensions,
} from "@/lib/data";
import { redirect } from "next/navigation";
import SpiritualPath from "@/components/custom/dashboard/path-dashboard";

const DashboardPage = async () => {
  const currentChallenge = await fetchCurrentChallenge();
  const dailyTasks = await fetchDailyTasks();
  const dimensionValues = await fetchUserDimensions();

  if (!currentChallenge) {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-8 p-8">
      <SpiritualPath currentLevel={1} currentStreak={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Tasks challenge={currentChallenge} dailyTasks={dailyTasks} />
        <Dimensions dimensions={dimensionValues} />
      </div>
      <DashboardCalendar dailyTasks={dailyTasks} />
      <StatsCards />
    </div>
  );
};

export default DashboardPage;
