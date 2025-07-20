import { useState, useRef, useEffect } from "react";
import { Challenge, Dimension } from "@prisma/client";
import {
  createCustomChallenge,
  enrollInExistingChallenge,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

// Types
interface CustomTask {
  name: string;
  dimension: Dimension;
}

interface CustomChallengeState {
  title: string;
  description: string;
  duration: number;
  tasks: CustomTask[];
}

export const useChallengeOnboarding = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [step, setStep] = useState(0);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null
  );
  const [customChallenge, setCustomChallenge] = useState<CustomChallengeState>({
    title: "Custom Challenge",
    description: "Your personalized 3 day challenge",
    duration: 3,
    tasks: [],
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [carouselApi, setCarouselApi] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Effects
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    if (step === 5) {
      setSelectedChallengeId(null);
      setSelectedChallenge(null);
    }
  }, [step]);

  useEffect(() => {
    const loadChallenge = async () => {
      if (!selectedChallengeId) return;

      try {
        setChallengeLoading(true);
        console.log("Fetching challenge with ID:", selectedChallengeId);
        const response = await fetch(`/api/challenges/${selectedChallengeId}`);
        const data = await response.json();
        setSelectedChallenge(data.challenge);
      } catch (error) {
        console.error("Error fetching challenge:", error);
      } finally {
        setChallengeLoading(false);
      }
    };

    if (selectedChallengeId) {
      loadChallenge();
    }
  }, [selectedChallengeId]);

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Handlers
  const handleAddTask = (task: { name: string; dimension: Dimension }) => {
    setCustomChallenge((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { ...task, dimension: task.dimension }],
    }));
    setShowTaskForm(false);
    setSelectedChallengeId(null);
    setSelectedChallenge(null);
  };

  const handleRemoveTask = (index: number) => {
    setCustomChallenge((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleChallengeSelect = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
  };

  const handleStartChallenge = async () => {
    const INITIAL_CHALLENGE_DURATION = 3;

    try {
      setIsLoading(true);

      if (selectedChallengeId) {
        const result = await enrollInExistingChallenge(
          selectedChallengeId,
          selectedTasks,
          INITIAL_CHALLENGE_DURATION,
          false
        );
        if (!result.success) throw new Error(result.message);
      } else if (customChallenge.tasks.length > 0) {
        const creationResult = await createCustomChallenge(
          undefined,
          INITIAL_CHALLENGE_DURATION,
          {
            title: customChallenge.title,
            description: customChallenge.description,
            tasks: customChallenge.tasks.map((t) => ({
              name: t.name,
              dimensionId: t.dimension.id,
            })),
            nextDay: false,
          }
        );

        if (!creationResult.success) {
          throw new Error(creationResult?.message);
        }
      }

      toast.success("Challenge started successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      const isAuthError =
        error.message?.includes("auth") ||
        error.message?.includes("login") ||
        error.message?.includes("session") ||
        error.message?.includes("unauthorized");

      if (isAuthError) {
        toast.error("Session expired", {
          description: "Please log in again to continue",
          action: {
            label: "Login",
            onClick: async () => {
              localStorage.clear();
              signOut({ redirectTo: "/login" });
            },
          },
        });
      } else {
        toast.error("Something went wrong", {
          description: "Most issues are fixed by logging in again",
          action: {
            label: "Login",
            onClick: async () => {
              localStorage.clear();
              signOut({ redirectTo: "/login" });
            },
          },
        });
      }

      console.error("Onboarding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && !selectedChallengeId) {
      setStep(4);
    } else if (step === 3 || step === 5) {
      handleStartChallenge();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(1);
    } else {
      setStep(Math.max(0, step - 1));
    }
  };

  // Computed values
  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !selectedChallengeId && step !== 3;
      case 2:
        return selectedTasks.length < 3;
      case 4:
        return !(
          customChallenge.tasks.length >= 3 && customChallenge.tasks.length <= 5
        );
      case 5:
        return customChallenge.tasks.length === 0;
      default:
        return false;
    }
  };

  const showFinishButton = () => {
    return (step === 3 && selectedChallengeId) || step === 5;
  };

  const totalSteps = selectedChallengeId ? 4 : 7;

  return {
    // State
    step,
    selectedChallengeId,
    customChallenge,
    showTaskForm,
    selectedTasks,
    isLoading,
    challengeLoading,
    selectedChallenge,
    carouselApi,
    currentSlide,
    containerRef,

    // Handlers
    handleAddTask,
    handleRemoveTask,
    handleChallengeSelect,
    handleStartChallenge,
    handleNext,
    handleBack,
    setStep,
    setShowTaskForm,
    setSelectedTasks,
    setCarouselApi,
    setCustomChallenge,

    // Computed
    isNextDisabled,
    showFinishButton,
    totalSteps,
  };
};
