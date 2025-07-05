"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Challenge, Dimension } from "@prisma/client";
import { createCustomChallenge, enrollInExistingChallenge } from "@/lib/actions";

interface CustomChallenge {
  title: string;
  description: string;
  duration: number;
  tasks: { name: string; dimension: Dimension }[];
}

export const useChallengeOnboarding = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [customChallenge, setCustomChallenge] = useState<CustomChallenge>({
    title: "Custom Challenge",
    description: "Your personalized 3 day challenge",
    duration: 3,
    tasks: [],
  });
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const INITIAL_CHALLENGE_DURATION = 3;
  const TOTAL_STEPS = 6;

  // Fetch selected challenge details
  useEffect(() => {
    if (!selectedChallengeId) return;

    const loadChallenge = async () => {
      try {
        setChallengeLoading(true);
        const response = await fetch(`/api/challenges/${selectedChallengeId}`);
        const data = await response.json();
        setSelectedChallenge(data.challenge);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        toast.error("Failed to load challenge details");
      } finally {
        setChallengeLoading(false);
      }
    };

    loadChallenge();
  }, [selectedChallengeId]);

  // Clear selection when going to custom challenge
  useEffect(() => {
    if (step === 5) {
      setSelectedChallengeId(null);
      setSelectedChallenge(null);
    }
  }, [step]);

  const handleError = (error: any) => {
    const isAuthError = error.message?.includes("auth") || 
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
  };

  const completeOnboarding = async () => {
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

      toast.success("Challenge started successfully!", {
        description: "Redirecting to your dashboard...",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      handleError(error);
      console.error("Onboarding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigation = {
    next: () => {
      if (step === 1 && !selectedChallengeId) {
        setStep(4); // Go to custom challenge
      } else if (step === 3 || step === 5) {
        completeOnboarding();
      } else {
        setStep(step + 1);
      }
    },
    
    back: () => {
      if (step === 4) {
        setStep(1); // Go back to challenge selection
      } else {
        setStep(Math.max(0, step - 1));
      }
    },
    
    goToStep: (newStep: number) => {
      setStep(newStep);
    }
  };

  const challengeSelection = {
    selectChallenge: (challengeId: string) => {
      setSelectedChallengeId(challengeId);
    },
    
    clearSelection: () => {
      setSelectedChallengeId(null);
      setSelectedChallenge(null);
    }
  };

  const taskManagement = {
    addTask: (task: { name: string; dimension: Dimension }) => {
      setCustomChallenge(prev => ({
        ...prev,
        tasks: [...prev.tasks, task],
      }));
      setShowTaskForm(false);
      challengeSelection.clearSelection();
    },
    
    removeTask: (index: number) => {
      setCustomChallenge(prev => ({
        ...prev,
        tasks: prev.tasks.filter((_, i) => i !== index),
      }));
    },
    
    toggleTaskSelection: (taskIndex: number) => {
      setSelectedTasks(prev =>
        prev.includes(taskIndex)
          ? prev.filter((index) => index !== taskIndex)
          : [...prev, taskIndex]
      );
    }
  };

  const validation = {
    isNextDisabled: () => {
      switch (step) {
        case 1:
          return !selectedChallengeId;
        case 2:
          return selectedTasks.length < 3;
        case 4:
          return !(customChallenge.tasks.length >= 3 && customChallenge.tasks.length <= 5);
        case 5:
          return customChallenge.tasks.length === 0;
        default:
          return false;
      }
    },
    
    showFinishButton: () => {
      return (step === 3 && selectedChallengeId) || step === 5;
    }
  };

  const carousel = {
    currentSlide,
    setCurrentSlide,
    goToSlide: (index: number) => {
      setCurrentSlide(index);
    }
  };

  return {
    // State
    step,
    selectedChallengeId,
    selectedChallenge,
    customChallenge,
    selectedTasks,
    isLoading,
    challengeLoading,
    showTaskForm,
    setShowTaskForm,
    
    // Computed values
    totalSteps: selectedChallengeId ? 4 : TOTAL_STEPS,
    
    // Actions
    navigation,
    challengeSelection,
    taskManagement,
    validation,
    carousel,
    
    // Utilities
    setCustomChallenge,
    setSelectedTasks,
  };
};