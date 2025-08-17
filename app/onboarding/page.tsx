import ChallengeOnboarding from "@/components/custom/onboarding/onboarding";
import { fetchDimensions, getUserChallenge } from "@/lib/data";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const dimensions = await fetchDimensions();
  const currentChallenge = await getUserChallenge();

  if (currentChallenge) {
    redirect("/dashboard");
  }

  return <ChallengeOnboarding dimensions={dimensions} />;
};

export default Onboarding;
