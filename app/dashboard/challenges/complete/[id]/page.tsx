import ChallengesComplete from "@/components/custom/challenges/challenges-complete";
import { fetchDailyTasks } from "@/lib/data";

interface PageProps {
  params: {
    id: string;
  };
}

const CompleteChallengePage = async ({ params }: PageProps) => {
  const dailyTasks = await fetchDailyTasks();
  const task = dailyTasks?.find((task) => task.id === params.id);

  return <ChallengesComplete task={task} />;
};

export default CompleteChallengePage;
