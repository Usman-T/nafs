"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dimension } from "@prisma/client";

interface CustomTask {
  name: string;
  dimension: Dimension;
}

interface CustomChallengeState {
  title: string;
  description: string;
  duration: number;
  tasks: CustomTask[];
}

export const CustomChallengeSummaryStep = ({
  customChallenge,
}: {
  customChallenge: CustomChallengeState;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-6"
  >
    <div className="text-center space-y-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto h-16 w-16 rounded-full bg-[#fe8019] flex items-center justify-center mb-4"
      >
        <Award className="h-8 w-8 text-[#1d2021]" />
      </motion.div>
      <h2 className="text-xl font-bold text-[#ebdbb2]">Challenge Created</h2>
      <p className="text-[#a89984]">
        You&apos;re ready to begin your custom challenge
      </p>
    </div>

    <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
      <h3 className="text-[#ebdbb2] font-medium mb-2">
        {customChallenge.title || "Untitled Challenge"}
      </h3>
      <div className="text-sm text-[#a89984] mb-3">
        {customChallenge.description || "No description provided"}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <Badge className="bg-[#3c3836] text-[#ebdbb2]">
          {customChallenge.duration} days
        </Badge>
        <Badge className="bg-[#3c3836] text-[#ebdbb2]">
          {customChallenge.tasks.length} tasks
        </Badge>
      </div>

      <div className="space-y-2">
        {customChallenge.tasks.map((task, i) => (
          <div key={i} className="flex items-center">
            <div
              className="h-4 w-4 rounded-full mr-2 flex-shrink-0"
              style={{ backgroundColor: task.dimension.color }}
            />
            <span className="text-sm text-[#ebdbb2]">{task.name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="text-sm text-[#a89984] text-center">
      <p>Your challenge will begin today.</p>
    </div>
  </motion.div>
);
