"use client";

import { Badge } from "@/components/ui/badge";
import { Challenge, Dimension, Task as TaskType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Task from "./onboarding-task";

type ChallengeTask = {
  task: TaskType & {
    dimension: Dimension;
  };
};

const SelectedChallenge = ({ challengeId }: { challengeId: string }) => {
  const [challenge, setChallenge] = useState<
    (Challenge & { tasks: ChallengeTask[] }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const toggleTaskSelection = (taskIndex: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskIndex)
        ? prev.filter((index) => index !== taskIndex)
        : [...prev, taskIndex]
    );
  };

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const response = await fetch(`/api/challenges/${challengeId}`);
        const data = await response.json();
        setChallenge(data.challenge); 
      } catch (error) {
        console.error("Error fetching challenge:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [challengeId]);



  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Title Skeleton */}
        <div className="text-center space-y-2">
          <div className="h-7 w-3/4 bg-[#3c3836] rounded mx-auto"></div>
          <div className="h-4 w-5/6 bg-[#3c3836] rounded mx-auto"></div>
        </div>

        {/* Badge Skeleton */}
        <div className="flex justify-center">
          <div className="h-8 w-24 bg-[#3c3836] rounded-full"></div>
        </div>

        {/* Tasks Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-1/3 bg-[#3c3836] rounded"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-[#3c3836] rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-[#3c3836] rounded"></div>
          <div className="h-3 w-5/6 bg-[#3c3836] rounded"></div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="text-center space-y-4">
        <div className="text-[#fb4934] text-lg font-medium">
          Challenge not found
        </div>
        <p className="text-[#a89984]">
          The requested challenge could not be loaded. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#ebdbb2]">{challenge.name}</h2>
        <p className="text-[#a89984]">{challenge.description}</p>
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        <Badge className="bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945] transition-colors">
          {challenge.duration} days
        </Badge>
      </div>

      <div className="space-y-3">
        <h3 className="text-[#ebdbb2] font-medium">Challenge Tasks</h3>
        <div className="space-y-2">
          {challenge.tasks.map(({ task }, i) => (
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