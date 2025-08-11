import { useState, useRef, useEffect } from "react";
import { Dimension } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { startChallenge } from "@/lib/actions";
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

  const [step, setStep] = useState(0);
  const [customChallenge, setCustomChallenge] = useState<CustomChallengeState>({
    title: "Custom Challenge",
    description: "Your personalized 3 day challenge",
    duration: 3,
    tasks: [],
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  const handleAddTask = (task: { name: string; dimension: Dimension }) => {
    setCustomChallenge((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { ...task, dimension: task.dimension }],
    }));
    setShowTaskForm(false);
  };

  const handleRemoveTask = (index: number) => {
    setCustomChallenge((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleStartChallenge = async () => {
    try {
      setIsLoading(true);

      const result = await startChallenge({
        title: customChallenge.title,
        description: customChallenge.description,
        tasks: customChallenge.tasks.map((t) => ({
          name: t.name,
          dimensionId: t.dimension.id,
        })),
        nextDay: false,
        duration: customChallenge.duration,
      });

      if (!result.success) {
        throw new Error(result?.message);
      }

      if (result.success) {
        toast.success("Challenge started successfully!");
        router.push("/dashboard");
      }
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
    if (step === 2) {
      handleStartChallenge();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(Math.max(0, step - 1));
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !(
          customChallenge.tasks.length >= 3 && customChallenge.tasks.length <= 5
        );
      default:
        return false;
    }
  };

  const showFinishButton = () => {
    return step === 2;
  };

  const totalSteps = 3;

  return {
    step,
    customChallenge,
    showTaskForm,
    selectedTasks,
    isLoading,
    containerRef,

    handleAddTask,
    handleRemoveTask,
    handleStartChallenge,
    handleNext,
    handleBack,
    setStep,
    setShowTaskForm,
    setSelectedTasks,
    setCustomChallenge,

    isNextDisabled,
    showFinishButton,
    totalSteps,
  };
};
