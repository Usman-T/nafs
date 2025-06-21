import Challenges from "@/components/custom/challenges/challenges-main";
import { checkUserStreak, initializeDayTasks } from "@/lib/actions";
import {
  fetchDailyTasks,
  fetchUserChallenge,
  fetchUserDimensions,
  fetchDimensions,
  fetchChallengeCompletionStatus,
  fetchChallenges,
} from "@/lib/data";
import { redirect } from "next/navigation";

const ChallengesPage = async () => {
  await checkUserStreak();

  const [
    currentChallenge,
    dailyTasks,
    dimensionValues,
    dimensions,
    hasCompletedChallenge,
    challenges,
  ] = await Promise.all([
    fetchUserChallenge(),
    fetchDailyTasks(),
    fetchUserDimensions(),
    fetchDimensions(),
    fetchChallengeCompletionStatus(),
    fetchChallenges(),
  ]);

  if (!currentChallenge) {
    redirect("/onboarding");
  }

  const today = new Date();
  let selectedDayTasks = dailyTasks?.filter(
    (t) => t.date.toDateString() === today.toDateString()
  );

  if (!selectedDayTasks || selectedDayTasks.length === 0) {
    await initializeDayTasks(currentChallenge.id);

    const updatedDailyTasks = await fetchDailyTasks();
    selectedDayTasks = updatedDailyTasks?.filter(
      (t) => t.date.toDateString() === today.toDateString()
    );
  }

  return (
    <div className="space-y-8 p-6">
      <Challenges
        challenge={currentChallenge}
        tasks={selectedDayTasks || []}
        dimensions={dimensions}
        dimensionValues={dimensionValues}
        hasCompletedChallenge={hasCompletedChallenge}
        predefinedChallenges={challenges}
        dailyTasks={dailyTasks}
      />
    </div>
  );
};

export default ChallengesPage;
