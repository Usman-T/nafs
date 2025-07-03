"use client";

import { iconMap } from "@/lib/iconMap";
import { Dimension } from "@prisma/client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const DimensionProgressCard = ({
  dimension,
  previousValue,
  currentValue,
  tasksContributed,
  delay = 0,
}: {
  dimension: Dimension;
  previousValue: number;
  currentValue: number;
  tasksContributed: string[];
  delay?: number;
}) => {
  const growth = currentValue - previousValue;
  const growthAngle = Math.min((growth / 100) * 360, 360);
  const IconComponent = iconMap[dimension.icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-xl bg-[#282828] p-4 flex flex-col gap-3 shadow-sm"
    >
      {/* Icon with Circular Growth Indicator */}
      <div className="relative w-12 h-12 mx-auto">
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="#1d2021"
            strokeWidth="3"
          />
          {growth > 0 && (
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke={dimension.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(growthAngle / 360) * (2 * Math.PI * 22)}, ${
                2 * Math.PI * 22
              }`}
              transform="rotate(-90 24 24)"
              initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1, delay: delay + 0.2 }}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <IconComponent className="h-5 w-5 "  style={{color: dimension.color}}/>
        </div>
      </div>

      {/* Name and description */}
      <div className="text-center">
        <div className="text-[#ebdbb2] font-semibold text-sm">{dimension.name}</div>
        <div className="text-xs text-[#a89984]">{dimension.description}</div>
      </div>

      {/* Growth Text */}
      {growth > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.4 }}
          className="text-xs text-[#fe8019] text-center font-medium"
        >
          +{growth}% improvement
        </motion.div>
      ) : (
        <div className="text-xs text-center text-[#928374]">no growth yet</div>
      )}

      {/* Contributing Tasks */}
      <div className="flex flex-col gap-1 mt-2">
        {[...new Set(tasksContributed)].slice(0, 3).map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.6 + i * 0.1 }}
            className="flex items-center text-xs text-[#ebdbb2]"
          >
            <Check className="h-3 w-3 text-[#fe8019] mr-2" />
            {task}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DimensionProgressCard;
