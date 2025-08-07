import ChallengeOnboarding from "@/components/custom/onboarding/onboarding";
import { fetchDimensions } from "@/lib/data";

const Onboarding = async () => {
  const dimensions = await fetchDimensions();

  return <ChallengeOnboarding dimensions={dimensions} />;
};

export default Onboarding;
