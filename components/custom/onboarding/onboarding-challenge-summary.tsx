import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React from "react";
import { Challenge, ChallengeTask, Dimension, Task } from "@prisma/client";

const ChallengeSummary = ({
  challenge,
  selectedTasks,
}: {
  challenge: Challenge & {
    tasks: ChallengeTask[] & { task: Task & { dimension: Dimension } }[];
  };
  selectedTasks: number[];
}) => {
  return (
    <>
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto h-16 w-16 rounded-full bg-[#fe8019] flex items-center justify-center mb-4"
        >
          <Award className="h-8 w-8 text-[#1d2021]" />
        </motion.div>
        <h2 className="text-xl font-bold text-[#ebdbb2]">Ready to Begin</h2>
        <p className="text-[#a89984]">
          You&apos;re all set to start your challenge
        </p>
      </div>

      <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
        <h3 className="text-[#ebdbb2] font-medium mb-2">{challenge.name}</h3>
        <div className="text-sm text-[#a89984] mb-3">
          {challenge.description}
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          <Badge className="bg-[#3c3836] text-[#ebdbb2]">
            {challenge.duration} days
          </Badge>
          <Badge className="bg-[#3c3836] text-[#ebdbb2]">
            {selectedTasks.length > 0
              ? selectedTasks.length
              : challenge.tasks.length}{" "}
            tasks selected
          </Badge>
        </div>

        <div className="space-y-2">
          {selectedTasks.length > 0 ? (
            selectedTasks.map((index) => (
              <div key={index} className="flex items-center">
                <div
                  className="h-4 w-4 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      challenge.tasks[index].task.dimension.color,
                  }}
                ></div>
                <span className="text-sm text-[#ebdbb2]">
                  {challenge.tasks[index].task.name}
                </span>
              </div>
            ))
          ) : (
            <div className="text-sm text-[#a89984]">
              All tasks will be included
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-[#a89984] text-center">
        <p>Your challenge will begin today.</p>
      </div>
    </>
  );
};

export default ChallengeSummary;
