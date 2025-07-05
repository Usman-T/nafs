"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeChallenge, createCustomChallenge } from "@/lib/actions";
import { Dimension } from "@prisma/client";

interface CustomChallenge {
  title: string;
  description: string;
  duration: number;
  tasks: { name: string; dimension: Dimension }[];
}

export const useChallengeCompletion = (
  completedChallengeId: string,
  userLevel: number
) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null
  );
  const [customChallenge, setCustomChallenge] = useState<CustomChallenge>({
    title: "Custom Challenge",
    description: "Your personalized day challenge",
    duration: 3,
    tasks: [],
  });
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChallengeCompletion = async () => {
    try {
      setIsLoading(true);
      const durationMap: Record<number, number> = {
        1: 3,
        2: 5,
        3: 7,
        4: 10,
        5: 15,
        6: 20,
      };
      const duration = durationMap[userLevel + 1] ?? 30;

      await completeChallenge(completedChallengeId);

      let tasksToPass;
      if (selectedChallengeId) {
        tasksToPass = selectedTasks; // passing selected task indices only
      } else {
        tasksToPass = customChallenge?.tasks.map((t) => ({
          name: t?.name,
          dimensionId: t?.dimension.id,
        })); // passing full task objects
      }

      const creationResult = await createCustomChallenge(
        selectedChallengeId,
        duration,
        {
          title: customChallenge?.title,
          description: customChallenge?.description,
          tasks: tasksToPass,
          nextDay: true,
        }
      );

      if (!creationResult.success) {
        throw new Error(creationResult.message);
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
    setCustomChallenge((prev) => ({
      ...prev,
      tasks: [...prev.tasks, task],
    }));
    setSelectedChallengeId(null);
  };

  const removeCustomTask = (index: number) => {
    setCustomChallenge((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const toggleTaskSelection = (taskIndex: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskIndex)
        ? prev.filter((index) => index !== taskIndex)
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
