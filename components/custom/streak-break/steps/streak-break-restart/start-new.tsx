"use client";
import React from "react";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Plus, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StartNewChallengeProps {
  currentChallenge: any;
  completedTasks: any[];
  onContinueChallenge: () => void;
  onStartNew: () => void;
}

const StartNewChallenge: React.FC<StartNewChallengeProps> = ({
  currentChallenge,
  completedTasks,
  onContinueChallenge,
  onStartNew,
}) => {
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card
          className={cn(
            "relative overflow-hidden transition-all duration-500 cursor-pointer group",
            "bg-gradient-to-br from-[#fe8019]/10 to-[#d65d0e]/5 border-2 border-[#fe8019]/30",
            "hover:border-[#fe8019] hover:shadow-lg hover:shadow-[#fe8019]/20"
          )}
          onClick={onContinueChallenge}
        >
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-[#ebdbb2] text-2xl font-bold">
              <div className="p-3 bg-[#fe8019]/20 rounded-xl mr-4">
                <RotateCcw className="h-8 w-8 text-[#fe8019]" />
              </div>
              Continue Current Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#a89984] text-lg leading-relaxed">
              Restart {currentChallenge.name}
            </p>
            <div className="flex items-center gap-4">
              <Badge className="bg-[#3c3836] text-[#ebdbb2] px-3 py-1">
                Day {currentChallenge?.currentDay || 1} of{" "}
                {currentChallenge.duration}
              </Badge>
              <Badge className="bg-[#8ec07c]/20 text-[#8ec07c] px-3 py-1">
                {completedTasks.length}/{currentChallenge?.tasks.length} tasks
                completed
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="text-center">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#3c3836]"></div>
          <span className="text-[#a89984] text-sm font-medium px-4">
            OR START A NEW CHALLENGE
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#3c3836]"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          className={cn(
            "w-full h-20 text-lg font-medium transition-all duration-500 bg-transparent",
            "border-2 border-dashed",
            "border-[#fe8019] text-[#fe8019] bg-[#fe8019]/5 shadow-lg shadow-[#fe8019]/10"
          )}
          onClick={onStartNew}
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#fe8019]/20 rounded-lg">
              <Plus className="h-6 w-6 text-[#fe8019]" />
            </div>
            <div className="text-left">
              <div className="font-bold">Start New Challenge</div>
            </div>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};

export default StartNewChallenge;
