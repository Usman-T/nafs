import Challenges from "@/components/custom/challenges/challenges-main";
import { checkUserStreak } from "@/lib/actions";
import { loadChallengesPageData } from "@/lib/data";
import { redirect } from "next/navigation";

const ChallengesPage = async () => {
  await checkUserStreak();
  const {
    currentChallenge,
    dailyTasks,
    dimensions,
    dimensionValues,
    hasCompletedChallenge,
    redirectToOnboarding,
  } = await loadChallengesPageData();

  if (redirectToOnboarding) redirect("/onboarding");

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
