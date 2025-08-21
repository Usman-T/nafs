import Challenges from "@/components/custom/challenges/challenges-main";
import { checkUserStreak } from "@/lib/actions";
import { spawnDailyTasksIfMissing } from "@/lib/actions/manage-streak";
import { loadChallengesPageData } from "@/lib/data";
import { redirect } from "next/navigation";

const ChallengesPage = async () => {
  const streakCheck = await checkUserStreak();
  if (streakCheck?.streakBroken) redirect("/streak-break");

  if (!streakCheck?.streakBroken) {
    await spawnDailyTasksIfMissing();
  }

  const {
    currentChallenge,
    dailyTasks,
    dimensions,
    dimensionValues,
    hasCompletedChallenge,
  } = await loadChallengesPageData();

  if (!currentChallenge) redirect("/onboarding");

  return (
    <div className="space-y-8 p-6">
      <Challenges
        challenge={currentChallenge}
        tasks={dailyTasks}
        dimensions={dimensions}
        dimensionValues={dimensionValues}
        hasCompletedChallenge={hasCompletedChallenge}
      />
    </div>
  );
};

export default ChallengesPage;
