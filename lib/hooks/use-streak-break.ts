import { useState } from "react";

interface CustomTask {
  name: string;
  dimension: Dimension;
}

export const useStreakBreak = () => {
  const [step, setStep] = useState(0);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [customChallenge, setCustomChallenge] = useState({
    title: "Custom Challenge",
    description: "Your personalized streak break challenge",
    duration: 3,
    tasks: [],
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [challengeLoading, setChallengeLoading] = useState(false);

  return {
    step,
    setStep,
    selectedChallenge,
    setSelectedChallenge,
    customChallenge,
    setCustomChallenge,
    showTaskForm,
    setShowTaskForm,
    selectedTasks,
    setSelectedTasks,
    isLoading,
    setIsLoading,
    challengeLoading,
    setChallengeLoading,
  };
};
