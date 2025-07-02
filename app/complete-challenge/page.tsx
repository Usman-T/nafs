import ChallengeCompletionFlow from "@/components/custom/challenges/challenge-completion-flow";
import {
  fetchChallenges,
  fetchDailyTasks,
  fetchDimensions,
  fetchUserChallenge,
  fetchUserDimensions,
} from "@/lib/data";
import React from "react";

const ChallengeCompletionPage = async () => {
  const [
    currentChallenge,
    dailyTasks,
    dimensionValues,
    dimensions,
    challenges,
  ] = await Promise.all([
    fetchUserChallenge(),
    fetchDailyTasks(),
    fetchUserDimensions(),
    fetchDimensions(),
    fetchChallenges(),
  ]);


  return (
    <ChallengeCompletionFlow
      completedChallenge={currentChallenge}
      dailyTasks={dailyTasks}
      dimensions={dimensions}
      dimensionValues={dimensionValues}
      predefinedChallenges={challenges}
    />
  );
};

export default ChallengeCompletionPage;
