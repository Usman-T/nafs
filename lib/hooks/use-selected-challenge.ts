import { useState, useEffect } from "react";
import { Challenge } from "@prisma/client";

export const useSelectedChallenge = (selectedChallengeId: string | null) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [challengeLoading, setChallengeLoading] = useState(false);

  useEffect(() => {
    const loadChallenge = async () => {
      if (!selectedChallengeId) return;

      try {
        setChallengeLoading(true);
        const response = await fetch(`/api/challenges/${selectedChallengeId}`);
        const data = await response.json();
        setSelectedChallenge(data.challenge);
      } catch (error) {
        console.error("Error fetching challenge:", error);
      } finally {
        setChallengeLoading(false);
      }
    };

    loadChallenge();
  }, [selectedChallengeId]);

  return { selectedChallenge, challengeLoading };
};
