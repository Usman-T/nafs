"use client";

import { motion } from "framer-motion";

interface OnboardingProgressProps {
  current: number;
  total: number;
}

export function OnboardingProgress({
  current,
  total,
}: OnboardingProgressProps) {
  return (
    <div className="flex justify-center px-6 py-4">
      <div className="flex items-center space-x-2">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index <= current ? "bg-[#fe8019]" : "bg-[#3c3836]"
            }`}
            animate={index <= current ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
