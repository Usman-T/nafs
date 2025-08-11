"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileOnboardingFlow from "@/components/custom/onboarding/mobile-onboarding";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const onboardingDone = localStorage.getItem("onboardingCompleted");
    if (onboardingDone === "true") {
      router.replace("/dashboard");
    }
  }, []);

  const handleComplete = () => {
    router.push("/register");
    localStorage.setItem("onboardingCompleted", "true");
  };

  return <MobileOnboardingFlow onComplete={handleComplete} />;
}
