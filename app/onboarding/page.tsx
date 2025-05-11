import { fetchChallenges } from "@/lib/data";
import ChallengeOnboarding from "@/components/custom/onboarding/onboarding";

const Onboarding = async () => {
  const predefinedChallenges = await fetchChallenges();
  console.log(predefinedChallenges)

  return <div className="flex h-screen justify-center items-center">
    <ChallengeOnboarding predefinedChallenges={predefinedChallenges} />
  </div>;
};

export default Onboarding;
