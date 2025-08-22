import { motion } from "framer-motion";
import RadarChart from "@/components/custom/streak-break/extras/streak-break-radar-chart";
import { iconMap } from "@/lib/iconMap";
import { BookOpen } from "lucide-react";
import { useStreakBreakContext } from "@/lib/context/streak-break-context";

const StreakBreakVisual = () => {
  const { dimensions, missedTasks, previousValues, currentValues } =
    useStreakBreakContext();

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
      >
        <RadarChart
          dimensions={dimensions}
          previousValues={previousValues}
          currentValues={currentValues}
          missedTasks={missedTasks}
        />

        {missedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 bg-[#1d2021] border border-[#3c3836] rounded-lg p-4"
          >
            <h4 className="text-lg font-semibold text-[#ebdbb2] mb-3 text-center">
              All missed tasks
            </h4>
            <div className="space-y-2">
              {missedTasks.map((task, index) => {
                const IconComponent = iconMap[task.icon || ""] || BookOpen;
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between py-2 px-3 bg-[#282828] rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl flex items-center justify-center transition-all duration-200`}
                      >
                        <IconComponent
                          style={{ color: task.color }}
                          className="h-4 w-4 text-[#1d2021]"
                        />
                      </div>
                      <span className="text-[#ebdbb2] font-medium">
                        {task.name}
                      </span>
                    </div>
                    <span className="text-red-400 font-semibold">
                      -{task.points}%
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StreakBreakVisual;
