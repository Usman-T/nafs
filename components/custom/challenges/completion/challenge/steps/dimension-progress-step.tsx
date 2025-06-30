import React from "react";
import { motion } from "framer-motion";
import { Dimension } from "@prisma/client";
import RadarChart from "../radar-chart";
import DimensionProgressCard from "../dimensions-progress";

interface DimensionProgressStepProps {
  dimensions: Dimension[];
  previousValues: Record<string, number>;
  currentValues: Record<string, number>;
  dimensionImpacts: Record<string, { value: number; tasks: string[] }>;
}

export const DimensionProgressStep: React.FC<DimensionProgressStepProps> = ({
  dimensions,
  previousValues,
  currentValues,
  dimensionImpacts,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#ebdbb2]">Spiritual Growth</h2>
        <p className="text-[#a89984]">
          See how your dimensions have grown during this challenge
        </p>
      </div>

      <div className="relative bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
        <RadarChart
          dimensions={dimensions}
          previousValues={previousValues}
          currentValues={currentValues}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[#ebdbb2] font-medium">Dimension Progress</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions
            .map((dim) => ({
              dimension: dim,
              previousValue: previousValues[dim.id] || 0,
              currentValue: currentValues[dim.id] || 0,
              tasksContributed: dimensionImpacts[dim.id]?.tasks || [],
            }))
            .filter((item) => item.tasksContributed.length > 0)
            .map((item, i) => (
              <DimensionProgressCard
                key={item.dimension.id}
                dimension={item.dimension}
                previousValue={item.previousValue}
                currentValue={item.currentValue}
                tasksContributed={item.tasksContributed}
                delay={i * 0.1}
              />
            ))}
        </div>
      </div>

      <div className="text-center text-sm text-[#a89984]">
        <p>
          Your spiritual journey continues. Choose a new challenge to keep
          growing in all dimensions.
        </p>
      </div>
    </motion.div>
  );
};
