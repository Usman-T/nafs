"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileOnboardingFlow from "@/components/custom/onboarding/mobile-onboarding";
import DesktopLanding from "@/components/custom/onboarding/desktop-landing";

export default function OnboardingPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const onboardingDone = localStorage.getItem("onboardingCompleted");
    if (onboardingDone === "true") {
      router.replace("/dashboard");
    }
    const userAgent =
      typeof window !== "undefined"
        ? navigator.userAgent || navigator.vendor || ""
        : "";

    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    setIsMobile(isAndroid || isIOS);
  }, []);

  const handleComplete = () => {
    router.push("/register");
    localStorage.setItem("onboardingCompleted", "true");
  };

  if (isMobile === null) return null; // or a loading spinner

  return isMobile ? (
    <MobileOnboardingFlow onComplete={handleComplete} />
  ) : (
    <DesktopLanding />
  );
}
