"use client";

import { Badge } from "@/components/ui/badge";
import { Challenge } from "@prisma/client";

const SelectedChallenge = ({ challenge }: { challenge: Challenge }) => {
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
