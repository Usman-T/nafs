import CalendarMain from "@/components/custom/calendar/calendar-main";
import { fetchDailyTasks } from "@/lib/data";

const CalendarPage = async () => {
  const dailyTasks = await fetchDailyTasks()

  return (
    <div className="space-y">
      <CalendarMain dailyTasks={dailyTasks}/>
    </div>
  );
};

export default CalendarPage;
