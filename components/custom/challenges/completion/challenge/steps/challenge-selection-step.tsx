import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Challenge } from "@prisma/client";
import ChallengeCard from "@/components/custom/challenges/completion/challenge/challenge-card";

interface ChallengeSelectionStepProps {
  predefinedChallenges: Challenge[];
  selectedChallengeId: string | null;
  onSelectChallenge: (id: string) => void;
  onCreateCustom: () => void;
}

export const ChallengeSelectionStep: React.FC<ChallengeSelectionStepProps> = ({
  predefinedChallenges,
  selectedChallengeId,
  onSelectChallenge,
  onCreateCustom,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#ebdbb2]">Choose a Challenge</h2>
        <p className="text-[#a89984]">
          Select a pre-designed challenge or create your own
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {predefinedChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isSelected={selectedChallengeId === challenge.id}
            onSelect={() => onSelectChallenge(challenge.id)}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <Button
          variant="outline"
          className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836] hover:text-[#fe8019]"
          onClick={onCreateCustom}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Challenge
        </Button>
      </motion.div>
    </motion.div>
  );
};
