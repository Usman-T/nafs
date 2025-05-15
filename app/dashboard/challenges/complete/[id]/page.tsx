import ChallengesComplete from "@/components/custom/challenges/challenges-complete";
import { fetchDailyTasks } from "@/lib/data";

const CompleteChallengePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const dailyTasks = await fetchDailyTasks();
  const task = dailyTasks?.find((task) => task.id === params.id);

  return <ChallengesComplete task={task} />;
};

export default CompleteChallengePage;
