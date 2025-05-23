import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Flame, BarChart3 } from "lucide-react";

interface CelebrationProps {
  onComplete: () => void;
  currentLevel: number;
  levelUp?: boolean;
  currentStreak: number;
  completedTasks: number;
  totalTasks: number;
  xpEarned: number;
}

const Celebration = ({
  onComplete,
  currentLevel,
  levelUp = false,
  currentStreak,
  completedTasks,
  totalTasks,
  xpEarned
}: CelebrationProps) => {
  const confettiRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (confettiRef.current) {
      const rect = confettiRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // First burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: [
          "#fe8019",
          "#fabd2f",
          "#b8bb26",
          "#8ec07c",
          "#83a598",
          "#d3869b",
          "#fb4934",
        ],
        gravity: 0.8,
        scalar: 1.2,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { x: x / window.innerWidth, y: y / window.innerHeight },
          colors: ["#fe8019", "#fabd2f"],
          gravity: 0.6,
          scalar: 1.5,
          shapes: ["circle"],
        });
      }, 300);
    }

    // Show button after delay
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
      ref={confettiRef}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{
          stiffness: 300,
          damping: 15,
          times: [0, 0.6, 1],
        }}
        className="mb-6"
      >
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#fe8019] to-[#fabd2f] mx-auto flex items-center justify-center">
          <Sparkles className="h-12 w-12 text-[#1d2021]" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-[#ebdbb2] mb-2"
      >
        {levelUp ? `Level Up!` : "Day Complete!"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-[#a89984] mb-6"
      >
        {levelUp
          ? `Congratulations! You've advanced to Level ${currentLevel + 1}!`
          : "Great job completing your tasks today!"}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-[#1d2021] rounded-lg p-5 border border-[#3c3836] mb-6 max-w-xs mx-auto"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#fe8019]" />
            <span className="text-[#ebdbb2] font-medium">Daily Summary</span>
          </div>
          <Badge className="bg-[#3c3836] text-[#a89984]">
            Level {currentLevel}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#a89984]">Tasks Completed</span>
            <span className="text-[#ebdbb2]">
              {completedTasks}/{totalTasks}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[#a89984]">XP Earned</span>
            <span className="text-[#fe8019]">+{xpEarned} XP</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[#a89984]">Streak</span>
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-[#fe8019]" />
              <span className="text-[#ebdbb2]">{currentStreak} days</span>
            </div>
          </div>
        </div>
      </motion.div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90 px-8"
            onClick={onComplete}
            size="lg"
          >
            Continue Journey
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Celebration;