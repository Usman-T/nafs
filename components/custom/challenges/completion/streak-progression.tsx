import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, ArrowRight, TrendingUp } from "lucide-react";

const StreakProgression = ({
  currentStreak,
  newStreak,
  onComplete,
}: {
  currentStreak: number;
  newStreak: number;
  onComplete: () => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const detailsTimer = setTimeout(() => {
      setShowDetails(true);
    }, 1500);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearTimeout(detailsTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#1d2021] rounded-lg p-5 border border-[#3c3836] relative overflow-hidden"
    >
      {/* Background particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Particle key={i} color="#fe8019" speed={1.5} />
      ))}

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Badge className="bg-[#fe8019] text-[#1d2021] mb-2">
            Streak Extended!
          </Badge>
          <h3 className="text-xl font-medium text-[#ebdbb2]">
            You're on fire!{" "}
            <Flame className="inline-block h-5 w-5 text-[#fe8019] mb-1" />
          </h3>
        </motion.div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.3,
            }}
            className="text-center"
          >
            <div className="text-sm text-[#a89984] mb-2">Previous</div>
            <StreakFlame streak={currentStreak} />
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-[#3c3836] to-[#fe8019]"
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 1,
              times: [0, 0.7, 1],
            }}
            className="text-center"
          >
            <div className="text-sm text-[#a89984] mb-2">Current</div>
            <StreakFlame streak={newStreak} size={50} />
          </motion.div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#a89984]">Streak Progress</span>
                  <span className="text-[#ebdbb2]">{newStreak} days</span>
                </div>
                <div className="relative h-2 w-full bg-[#3c3836] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: `${((currentStreak % 7) / 7) * 100}%` }}
                    animate={{ width: `${((newStreak % 7) / 7) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#fe8019] to-[#fabd2f] rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-[#a89984]">
                  <span>0</span>
                  <span>7 days</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 p-3 bg-[#282828] rounded-lg"
                >
                  <div className="h-8 w-8 rounded-full bg-[#fe8019] flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-[#1d2021]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2]">Consistency Bonus</div>
                    <div className="text-xs text-[#a89984]">
                      +50 XP for maintaining your streak
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 p-3 bg-[#282828] rounded-lg"
                >
                  <div className="h-8 w-8 rounded-full bg-[#8ec07c] flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-[#1d2021]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2]">Growth Multiplier</div>
                    <div className="text-xs text-[#a89984]">
                      x1.5 impact on spiritual dimensions
                    </div>
                  </div>
                </motion.div>
              </div>

              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center pt-2"
                >
                  <Button
                    className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
                    onClick={onComplete}
                  >
                    Continue Journey <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StreakProgression;
