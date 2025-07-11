import StreakBreakFlow from "@/components/custom/streak-break/streak-break-flow";
import { loadStreakBreakPageData } from "@/lib/data";

const StreakBreakPage = async () => {
  const { challenges, spiritualDimensions, currentValues, previousValues, missedTasks, currentChallenge, userLevel } = await loadStreakBreakPageData();

  return (
    <StreakBreakFlow
      predefinedChallenges={challenges}
      dimensions={spiritualDimensions}
      currentValues={currentValues}
      previousValues={previousValues}
      missedTasks={missedTasks}
      currentChallenge={currentChallenge}
      userLevel={userLevel}
    />
  );
};

export default StreakBreakPage;
