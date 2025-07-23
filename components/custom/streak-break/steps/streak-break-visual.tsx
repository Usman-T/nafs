import { Dimension } from "@prisma/client";
import { motion } from "framer-motion";
import RadarChart from "@/components/custom/streak-break/extras/streak-break-radar-chart";
import { iconMap } from "@/lib/iconMap";
import { BookOpen } from "lucide-react";

interface MissedTask {
  id: string;
  name: string;
  dimension: string;
  color: string;
  icon: string;
  dimensionId: string;
  points: number;
}

const StreakBreakVisual = ({
  dimensions,
  missedTasks,
  previousValues,
  currentValues,
}: {
  dimensions: Dimension[];
  missedTasks: MissedTask[];
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
      >
        <h3 className="text-2xl font-bold text-[#ebdbb2] mb-6 text-center">
          Spiritual Dimensions Impact
        </h3>

        {missedTasks.length > 0 ? (
          <div className="text-center mb-6">
            <p className="text-[#a89984] text-sm">
              Watch how missing {missedTasks.length} task
              {missedTasks.length !== 1 ? "s" : ""} affects your spiritual
              growth
            </p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <p className="text-green-400 text-sm">
              No tasks missed! Your spiritual dimensions remain strong.
            </p>
          </div>
        )}

        <RadarChart
          dimensions={dimensions}
          previousValues={previousValues}
          currentValues={currentValues}
          missedTasks={missedTasks}
        />

        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ebdbb2] opacity-40"></div>
            <span className="text-[#a89984]">Before</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#fe8019]"></div>
            <span className="text-[#a89984]">After</span>
          </div>
        </div>

        {missedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
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
                    transition={{ delay: 2.2 + index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between py-2 px-3 bg-[#282828] rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl flex items-center justify-center transition-all duration-200`}
                      >
                        <IconComponent
                          style={{ color: task.color }}
                          className="h-6 w-6 text-[#1d2021]"
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
            <div className="mt-4 pt-3 border-t border-[#3c3836]">
              <div className="flex justify-between items-center">
                <span className="text-[#a89984]">Total Impact:</span>
                <span className="text-red-400 font-bold text-lg">
                  -{missedTasks.reduce((sum, task) => sum + task.points, 0)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StreakBreakVisual;
