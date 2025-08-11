import ChallengeOnboarding from "@/components/custom/onboarding/onboarding";
import { fetchDimensions } from "@/lib/data";

const Onboarding = async () => {
  const dimensions = await fetchDimensions();

  console.log({
    dimensionsInServer: dimensions.length,
    success: dimensions.length > 0,
  });

  return <ChallengeOnboarding dimensions={dimensions} />;
};

export default Onboarding;
