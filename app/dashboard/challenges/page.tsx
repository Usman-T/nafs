import Challenges from "@/components/custom/challenges/challenges-main";
import { fetchDailyTasks, fetchUserChallenge } from "@/lib/data";

const ChallengesPage = async () => {
  const currentChallenge = await fetchUserChallenge();
  const dailyTasks = await fetchDailyTasks();

  if (!currentChallenge) {
    return <div>No active challenge</div>;
  }

  console.log(currentChallenge)

  const today = new Date();
  const selectedDayTasks = dailyTasks?.filter(
    (t) => t.date.toDateString() === today.toDateString()
  );

  return (
    <div className="space-y-8 p-6">
      <Challenges challenge={currentChallenge} tasks={selectedDayTasks || []} />
    </div>
  );
};

export default ChallengesPage;