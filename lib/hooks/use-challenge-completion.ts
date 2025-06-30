"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  completeChallenge,
  createCustomChallenge,
  enrollInExistingChallenge
} from "@/lib/actions";
import { Challenge, Dimension } from "@prisma/client";

interface CustomChallenge {
  title: string;
  description: string;
  duration: number;
  tasks: { name: string; dimension: Dimension }[];
}

export const useChallengeCompletion = (completedChallengeId: string) => {
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

  const handleChallengeCompletion = async (onComplete: () => void) => {
    try {
      setIsLoading(true);
      await completeChallenge(completedChallengeId);

      if (selectedChallengeId) {
        const result = await enrollInExistingChallenge(
          selectedChallengeId,
          selectedTasks,
          true
        );
        if (!result.success) throw new Error(result.message);
      } else if (customChallenge.tasks.length > 0) {
        const creationResult = await createCustomChallenge({
          title: customChallenge.title,
          description: customChallenge.description,
          duration: customChallenge.duration,
          tasks: customChallenge.tasks.map((t) => ({
            name: t.name,
            dimensionId: t.dimension.id,
          })),
          nextDay: true,
        });
        if (!creationResult.success) {
          throw new Error(creationResult.message);
        }
      }

      router.push("/dashboard");
      onComplete();
    } catch (error) {
      console.error("Challenge completion error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCustomTask = (task: { name: string; dimension: Dimension }) => {
    setCustomChallenge(prev => ({
      ...prev,
      tasks: [...prev.tasks, task],
    }));
    setSelectedChallengeId(null);
  };

  const removeCustomTask = (index: number) => {
    setCustomChallenge(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const toggleTaskSelection = (taskIndex: number) => {
    setSelectedTasks(prev =>
      prev.includes(taskIndex)
        ? prev.filter(index => index !== taskIndex)
        : [...prev, taskIndex]
    );
  };

  return {
    step,
    setStep,
    selectedChallengeId,
    setSelectedChallengeId,
    customChallenge,
    setCustomChallenge,
    selectedTasks,
    setSelectedTasks,
    isLoading,
    handleChallengeCompletion,
    addCustomTask,
    removeCustomTask,
    toggleTaskSelection,
  };
};