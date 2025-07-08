import StreakBreakFlow from "@/components/custom/streak-break/streak-break-flow";
import { fetchChallenges } from "@/lib/data";

const StreakBreakPage = async () => {
  const [challenges] = await Promise.all([fetchChallenges()]);

  return <StreakBreakFlow predefinedChallenges={challenges} />;
};

export default StreakBreakPage;
