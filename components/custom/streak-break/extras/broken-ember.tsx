import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
} from "lucide-react";

const BrokenEmber = ({ animate = false }: { animate?: boolean }) => {
  const [showCracks, setShowCracks] = useState(false);
  const [showEmbers, setShowEmbers] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => setShowCracks(true), 1000);
      setTimeout(() => setShowEmbers(true), 2000);
    } else {
      setShowCracks(true);
    }
  }, [animate]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px rgba(254, 128, 25, 0.3)",
            "0 0 40px rgba(254, 128, 25, 0.5)",
            "0 0 20px rgba(254, 128, 25, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Main flame container */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Main flame */}
        <motion.div
          initial={{ scale: 1, opacity: 1, rotate: 0 }}
          animate={
            animate
              ? {
                  scale: [1, 1.1, 0.9, 1.05, 0.8, 0.9, 0.6, 0.4, 0.2, 0],
                  opacity: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.1, 0],
                  rotate: [0, -3, 3, -2, 2, -4, 3, -2, 0, 0],
                }
              : { scale: 0.3, opacity: 0.2, rotate: -5 }
          }
          transition={{ duration: animate ? 4 : 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <Flame className="h-32 w-32 text-[#fe8019] drop-shadow-lg" />
        </motion.div>

        {/* Crack overlay */}
        <AnimatePresence>
          {showCracks && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                className="absolute inset-0"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(251, 73, 52, 0.8))",
                }}
              >
                {/* Main crack */}
                <motion.path
                  d="M64 15 L68 35 L62 55 L66 75 L60 95 L64 115"
                  stroke="#fb4934"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
                />
                {/* Side cracks */}
                <motion.path
                  d="M45 30 L55 45 L50 60 L58 75"
                  stroke="#fb4934"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                />
                <motion.path
                  d="M80 35 L75 50 L78 65 L70 80"
                  stroke="#fb4934"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                />
                {/* Small cracks */}
                <motion.path
                  d="M40 50 L48 58"
                  stroke="#fb4934"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                />
                <motion.path
                  d="M85 60 L78 68"
                  stroke="#fb4934"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ember particles */}
        <AnimatePresence>
          {showEmbers &&
            Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-[#fe8019] to-[#fb4934] rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0.6, 0.4, 0.2, 0],
                  scale: [0, 1, 0.8, 0.6, 0.4, 0.2, 0],
                  x: (Math.random() - 0.5) * 150,
                  y: Math.random() * 100 + 30,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  delay: i * 0.1,
                  duration: 3,
                  ease: "easeOut",
                }}
                style={{
                  left: `${45 + Math.random() * 20}%`,
                  top: `${40 + Math.random() * 30}%`,
                }}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrokenEmber;