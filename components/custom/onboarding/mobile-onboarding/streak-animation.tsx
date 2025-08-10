"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import StreakFlame from "../../challenges/completion/day/streak-flame";

interface StreakAnimationProps {
  isActive?: boolean;
}

export function StreakAnimation({ isActive = false }: StreakAnimationProps) {
  const [showPrevious, setShowPrevious] = useState(false);
  const [showConnector, setShowConnector] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [progressWidth, setProgressWidth] = useState("0%");

  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  useEffect(() => {
    if (!isActive) {
      setShowPrevious(false);
      setShowConnector(false);
      setShowCurrent(false);
      setShowDetails(false);
      setProgressWidth("0%");
      clearAllTimeouts();
      return;
    }

    setShowPrevious(false);
    setShowConnector(false);
    setShowCurrent(false);
    setShowDetails(false);
    setProgressWidth("0%");
    clearAllTimeouts();

    const timer1 = setTimeout(() => {
      setShowPrevious(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setShowConnector(true);
    }, 700);

    const timer3 = setTimeout(() => {
      setShowCurrent(true);
    }, 1200);

    const timer4 = setTimeout(() => {
      setShowDetails(true);
    },2000);

    const timer5 = setTimeout(() => {
      setProgressWidth("71%");
    }, 2000);

    timeoutRefs.current = [timer1, timer2, timer3, timer4, timer5];

    return clearAllTimeouts;
  }, [isActive]);

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-0">
      {/* Streak progression */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
        {/* Previous Day 3 */}
        <div className="text-center">
          <div className="text-[#ebdbb2]/60 text-xs sm:text-sm mb-2">
            Previous
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: showPrevious ? 1 : 0,
              opacity: showPrevious ? 1 : 0,
            }}
            transition={{
              stiffness: 400,
              damping: 25,
              duration: 0.5,
            }}
          >
            <StreakFlame streak={4} />
          </motion.div>
        </div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: showConnector ? "60px" : 0,
            opacity: showConnector ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="h-1 bg-gradient-to-r mt-4 from-[#fe8019] to-[#fabd2f] rounded-full"
        />

        {/* Current Day 5 */}
        <div className="text-center">
          <div className="text-[#ebdbb2]/60 text-xs sm:text-sm mb-2">
            Current
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: showCurrent ? [0, 1.15, 1] : 0,
              opacity: showCurrent ? 1 : 0,
            }}
            transition={{
              stiffness: 300,
              damping: 20,
              duration: 0.7,
            }}
          >
            <StreakFlame streak={5} size={50} />
          </motion.div>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showDetails ? 1 : 0,
          y: showDetails ? 0 : 20,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-2"
      >
        <div className="flex justify-between text-[#ebdbb2]/60 text-xs sm:text-sm">
          <span>Streak Progress</span>
          <span>5 days</span>
        </div>
        <div className="w-full h-1.5 sm:h-2 bg-[#3c3836] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: progressWidth }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="h-full bg-gradient-to-r from-[#fe8019] to-[#fabd2f] rounded-full"
          >
            <div className="h-full bg-gradient-to-r from-transparent via-[#ebdbb2]/30 to-transparent animate-pulse"></div>
          </motion.div>
        </div>
        <div className="flex justify-between text-[#ebdbb2]/40 text-xs">
          <span>0 days</span>
          <span>7 days</span>
        </div>
      </motion.div>
    </div>
  );
}
