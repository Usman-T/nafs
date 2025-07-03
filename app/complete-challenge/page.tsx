import ChallengeCompletionFlow from "@/components/custom/challenges/challenge-completion-flow";
import {
  fetchChallenges,
  fetchDailyTasks,
  fetchDimensions,
  fetchUserChallenge,
  fetchUserDimensions,
  fetchUserLevel,
} from "@/lib/data";
import React from "react";

const ChallengeCompletionPage = async () => {
  const [
    currentChallenge,
    dailyTasks,
    dimensionValues,
    dimensions,
    challenges,
    userLevel,
  ] = await Promise.all([
    fetchUserChallenge(),
    fetchDailyTasks(),
    fetchUserDimensions(),
    fetchDimensions(),
    fetchChallenges(),
    fetchUserLevel(),
  ]);

  return (
    <ChallengeCompletionFlow
      completedChallenge={currentChallenge}
      dailyTasks={dailyTasks}
      dimensions={dimensions}
      dimensionValues={dimensionValues}
      predefinedChallenges={challenges}
      userLevel={userLevel}
    />
  );
};

export default ChallengeCompletionPage;
