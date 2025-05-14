import Tasks from "@/components/custom/dashboard/tasks";
import Dimensions from "@/components/custom/dashboard/dimensions";
import DashboardCalendar from "@/components/custom/dashboard/calendar-dashboard";
import StatsCards from "@/components/custom/dashboard/stats-cards";
import { fetchCurrentChallenge, fetchDailyTasks } from "@/lib/data";
import { redirect } from "next/navigation";
import SpiritualPath from "@/components/custom/dashboard/path-dashboard";

const DashboardPage = async () => {
  const currentChallenge = await fetchCurrentChallenge();
  const dailyTasks = await fetchDailyTasks();

  if (!currentChallenge) {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-8 p-6">
      <SpiritualPath currentLevel={1} currentStreak={3} />
      <div className="grid gap-6 md:grid-cols-2">
        <Tasks challenge={currentChallenge} dailyTasks={dailyTasks} />
        <Dimensions />
      </div>
      <DashboardCalendar />
      <StatsCards />
    </div>
  );
};

export default DashboardPage;
