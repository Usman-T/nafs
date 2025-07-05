import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RollingCounter = ({
  initialValue,
  duration = 3000,
  markEnd,
}: {
  initialValue: number;
  duration?: number;
  markEnd: (end: boolean) => void;
}) => {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = displayValue
    const endValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4);
      let currentValue = Math.round(
        startValue - (startValue - endValue) * easeOut
      );

      // Add dramatic pauses
      if (progress > 0.3 && progress < 0.4 && currentValue > 5) {
        currentValue = 8;
      } else if (progress > 0.6 && progress < 0.7 && currentValue > 2) {
        currentValue = 3;
      }

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        markEnd(true);
      }
    };

    requestAnimationFrame(animate);
  }, [displayValue, duration, markEnd, initialValue]);

  return (
    <div className="relative">
      <motion.div
        key={displayValue}
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-black tabular-nums relative z-10"
        style={{
          textShadow:
            "0 0 20px rgba(254, 128, 25, 0.5), 0 0 40px rgba(254, 128, 25, 0.3)",
        }}
      >
        {displayValue}
      </motion.div>
      {isAnimating && (
        <motion.div
          className="absolute inset-0 font-black tabular-nums opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {displayValue}
        </motion.div>
      )}
    </div>
  );
};

export default RollingCounter;
