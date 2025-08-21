import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BrokenEmber from "@/components/custom/streak-break/extras/broken-ember";
import { iconMap } from "@/lib/iconMap";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const StreakBreakInfo = ({
  missedDay,
  missedTasks,
  challengeName,
}: {
  missedDay: number;
  missedTasks: { name: string; icon: string; color: string }[];
  challengeName: string;
  isActive: boolean;
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-10 px-4 py-"
      >
        <div className="relative flex items-center justify-center ">
          <motion.div
            className="absolute rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(251, 73, 52, 0.4)",
                "0 0 0 20px rgba(251, 73, 52, 0)",
                "0 0 0 0 rgba(251, 73, 52, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <div
            className={`rounded-full text-[#1d2021] text-2xl p-6 bg-gradient-to-br flex items-center justify-center shadow-2xl`}
          >
            <BrokenEmber animate={true} />
          </div>
        </div>

        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-4xl font-black text-[#ebdbb2] tracking-tight"
            style={{
              textShadow: "0 0 30px rgba(254, 128, 25, 0.3)",
            }}
          >
            Streak Broken
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="space-y-3"
          >
            <p className="text-xl text-[#fe8019] font-bold">
              Day {missedDay} of {challengeName}
            </p>
          </motion.div>
        </div>

        {/* Missed tasks summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="bg-gradient-to-br from-[#1d2021] to-[#282828] rounded-2xl p-6 border border-[#3c3836] max-w-md mx-auto"
        >
          <h3 className="text-[#ebdbb2] font-bold text-lg mb-4">
            Tasks Missed
          </h3>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <ScrollArea className="h-32 ">
              <div className="space-y-3">
                {missedTasks.map((task, i) => {
                  const IconComponent = iconMap[task.icon] || X;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3 text-[#a89984]"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${task.color}20` }}
                      >
                        <IconComponent
                          className="h-4 w-4"
                          style={{ color: task.color }}
                        />
                      </div>
                      <span className="text-sm">{task.name}</span>
                    </motion.div>
                  );
                })}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>{" "}
          </motion.div>
          <div className="flex justify-center pt-2 text-[#928374] text-xs animate-pulse">
            ↓
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default StreakBreakInfo;
