import ChallengeOnboarding from "@/components/custom/onboarding/onboarding";
import { fetchChallenges, fetchDimensions } from "@/lib/data";

const Onboarding = async () => {
  const predefinedChallenges = await fetchChallenges();
  const dimensions = await fetchDimensions();

  return (
    <ChallengeOnboarding
      dimensions={dimensions}
      predefinedChallenges={predefinedChallenges}
    />
  );
};

export default Onboarding;
