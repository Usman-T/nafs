import Tasks from "@/components/custom/dashboard/tasks";
import Dimensions from "@/components/custom/dashboard/dimensions";
import DashboardCalendar from "@/components/custom/dashboard/calendar-dashboard";
import StatsCards from "@/components/custom/dashboard/stats-cards";

export default function DashboardPage() {
  const dailyTasks = [
    { id: 1, name: "Fajr and Asr in congregation", color: "#fb4934" },
    { id: 2, name: "Work on self-improvement", color: "#83a598" },
    { id: 3, name: "Exercise for 1+ hour", color: "#8ec07c" },
    { id: 4, name: "Quran memorization (15+ min)", color: "#fabd2f" },
    { id: 5, name: "Read, speak, record", color: "#fe8019" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Tasks dailyTasks={dailyTasks} />
        <Dimensions />
      </div>
      <DashboardCalendar />
      <StatsCards />
    </div>
  );
}
