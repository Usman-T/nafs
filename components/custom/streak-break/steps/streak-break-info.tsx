import { motion } from "framer-motion";
import { X } from "lucide-react";
import BrokenFlame from "../extras/broken-flame";
import RollingCounter from "../extras/rolling-counter";
import { iconMap } from "@/lib/iconMap";
import { useState } from "react";

const StreakBreakInfo = ({
  missedDay,
  previousStreak,
  mockMissedTasks,
  challengeName,
  totalDaysLost,
}: {
  missedDay: number;
  previousStreak: number;
  streakStartDate: string;
  mockMissedTasks: { name: string; icon: string; color: string }[];
  challengeName: string;
  totalDaysLost: number;
}) => {
  const [endAnimation, setEndAnimation] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-10 px-8 py-12"
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
            className={`rounded-full text-[#1d2021] text-2xl p-6 bg-gradient-to-br ${
              endAnimation ? "" : "from-[#fb4934] to-[#cc241d]"
            }flex items-center justify-center shadow-2xl`}
          >
            {!endAnimation ? (
              <RollingCounter
                initialValue={previousStreak}
                markEnd={() => setEndAnimation(true)}
                duration={4000}
              />
            ) : (
              <BrokenFlame animate={true} />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-[#ebdbb2] tracking-tight"
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
            <p className="text-2xl text-[#fe8019] font-bold">
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
            Tasks Missed Yesterday
          </h3>
          <div className="space-y-3">
            {mockMissedTasks.map((task, i) => {
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
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-12 px-8 py-12"
      >
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-black text-[#ebdbb2]"
          >
            Your Streak
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-[#fe8019] font-medium"
          >
            Counting down to zero...
          </motion.p>
        </div>

        <div className="relative">
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 50px rgba(254, 128, 25, 0.2)",
                "0 0 100px rgba(254, 128, 25, 0.4)",
                "0 0 50px rgba(254, 128, 25, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="bg-gradient-to-br from-[#0d1117] via-[#1d2021] to-[#282828] rounded-3xl p-12 border-2 border-[#3c3836] relative z-10">
            <div className="flex items-center justify-center gap-12">
              <BrokenFlame animate={true} />
              <div className="text-center space-y-4">
                <RollingCounter value={0} duration={4000} />
                <div className="text-2xl text-[#a89984] font-medium">days</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 4, duration: 0.8 }}
                  className="text-[#fb4934] text-lg font-bold"
                >
                  RESET
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.8 }}
          className="text-[#a89984] text-lg max-w-lg mx-auto"
        >
          <p>
            {totalDaysLost} days of spiritual growth and{" "}
            {mockMissedTasks.length} daily practices have been interrupted.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default StreakBreakInfo;
