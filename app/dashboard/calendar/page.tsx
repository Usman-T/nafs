import CalendarMain from "@/components/custom/calendar/calendar-main";
import { fetchDailyTasks } from "@/lib/data";

const CalendarPage = async () => {
  const dailyTasks = await fetchDailyTasks();

  return <CalendarMain dailyTasks={dailyTasks} />;
};

export default CalendarPage;
