import ChallengeOnboarding from "@/components/custom/onboarding/onboarding";
import { fetchChallenges, fetchDimensions } from "@/lib/data";

const Onboarding = async () => {
  const predefinedChallenges = await fetchChallenges();
  const dimensions = await fetchDimensions();

  return (
    <div className="flex h-screen justify-center items-center">
      <ChallengeOnboarding
        dimensions={dimensions}
        predefinedChallenges={predefinedChallenges}
      />
    </div>
  );
};

export default Onboarding;
