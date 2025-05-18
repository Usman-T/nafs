import Tasks from "@/components/custom/dashboard/tasks";
import { fetchCurrentChallenge, fetchDailyTasks } from "@/lib/data";
import { redirect } from "next/navigation";

const TasksWrapper = async () => {
  const currentChallenge = await fetchCurrentChallenge();
  const dailyTasks = await fetchDailyTasks();

  if (!currentChallenge) {
    redirect("/onboarding");
  }

  return <Tasks challenge={currentChallenge} dailyTasks={dailyTasks} />;
};

export default TasksWrapper;
