"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStreakBreakContext } from "@/lib/context/streak-break-context";

const StreakBreakSummary = () => {
  const { challengeSelection, getDuration } = useStreakBreakContext();
  
  const duration = getDuration();
  
  const hasValidSelection = challengeSelection.title && challengeSelection.tasks.length > 0;
  
  if (!hasValidSelection) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6 p-6"
      >
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-full bg-[#665c54] flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-[#ebdbb2]" />
          </div>
          <h2 className="text-xl font-bold text-[#ebdbb2]">No Challenge Selected</h2>
          <p className="text-[#a89984]">
            Please go back and select a challenge to continue
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 p-6"
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
        <h2 className="text-xl font-bold text-[#ebdbb2]">
          Challenge Ready!
        </h2>
        <p className="text-[#a89984]">
          You&apos;re ready to begin your challenge and get back on track
        </p>
      </div>

      <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
        <h3 className="text-[#ebdbb2] font-medium mb-2">
          {challengeSelection.title}
        </h3>
        <div className="text-sm text-[#a89984] mb-3">
          {challengeSelection.description}
        </div>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          <Badge className="bg-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]">
            {duration} days
          </Badge>
          <Badge className="bg-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]">
            {challengeSelection.tasks.length} tasks
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-[#a89984] mb-2 uppercase tracking-wide">
            Daily Tasks
          </div>
          {challengeSelection.tasks.map((task, i) => (
            <div key={i} className="flex items-center">
              <div
                className="h-4 w-4 rounded-full mr-3 flex-shrink-0"
                style={{ backgroundColor: task.dimension.color }}
              />
              <span className="text-sm text-[#ebdbb2]">{task.name}</span>
              <span className="text-xs text-[#a89984] ml-auto">
                {task.dimension.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-[#a89984] text-center space-y-1">
        <p>Your challenge will begin today.</p>
        <p className="text-xs">Complete all tasks daily to maintain your streak!</p>
      </div>
    </motion.div>
  );
};

export default StreakBreakSummary;