"use client";

import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
import { Challenge } from "@prisma/client";

const SelectedChallenge = ({ challenge }: { challenge: Challenge }) => {
=======
import { fetchChallengeById } from "@/lib/data";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const SelectedChallenge = ({
  challengeId,
}: {
  challengeId: string | undefined;
}) => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const selectedChallenge = await fetchChallengeById(challengeId);
        setChallenge(selectedChallenge);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [challengeId]);

  if (loading) {
    return <Loader2 className="h-6 w-6 animate-spin" />;
  }

>>>>>>> ff1d490b6917e4b4a79e64a7e68bbb6a6bc45e9a
  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#ebdbb2]">{challenge.name}</h2>
        <p className="text-[#a89984]">{challenge.description}</p>
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        <Badge className="bg-[#3c3836] text-[#ebdbb2]">
          {challenge.duration} days
        </Badge>
      </div>

      <div className="space-y-3">
        <h3 className="text-[#ebdbb2] font-medium">Challenge Tasks</h3>
        <div className="space-y-2">
          {selectedChallenge.tasks.map((task, i) => (
            <Task
              key={i}
              task={task}
              isSelected={selectedTasks.includes(i)}
              onClick={() => toggleTaskSelection(i)}
            />
          ))}
        </div>
      </div>

      <div className="text-sm text-[#a89984]">
        <p>
          Complete these tasks daily to progress in your spiritual journey. You
          can always modify your challenge later.
        </p>
      </div>
    </>
  );
};

export default SelectedChallenge;
