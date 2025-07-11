import { Dimension } from "@prisma/client";
import { motion } from "framer-motion";
import RadarChart from "@/components/custom/streak-break/extras/streak-break-radar-chart";

const StreakBreakVisual = ({
  dimensions,
  missedTasks,
  previousValues,
  currentValues,
}: {
  dimensions: Dimension[];
  missedTasks: any[];
  previousValues: Record<string, number>;
  currentValues: Record<string, number>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 px-8 py-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#1d2021] to-[#282828] rounded-2xl p-8 border border-[#3c3836] max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-[#ebdbb2] mb-6 text-center">
          Spiritual Dimensions Impact
        </h3>
        <RadarChart
          dimensions={dimensions}
          previousValues={previousValues}
          currentValues={currentValues}
          animate={true}
        />
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ebdbb2] opacity-40"></div>
            <span className="text-[#a89984]">Before</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#fe8019]"></div>
            <span className="text-[#a89984]">After</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StreakBreakVisual;
