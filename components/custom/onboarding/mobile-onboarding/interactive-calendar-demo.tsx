

import { useState, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Target,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

const InteractiveCalendarDemo = ({ isActive }: { isActive: boolean }) => {
  const [completedDays, setCompletedDays] = useState<number[]>([
    5, 6, 8, 12, 13,
  ]);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [streak, setStreak] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = 15;

  const handleDayTap = (day: number) => {
    if (day <= today) {
      setSelectedDay(day);

      if (completedDays.includes(day)) {
        setCompletedDays(completedDays.filter((d) => d !== day));
      } else {
        setCompletedDays([...completedDays, day]);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 1000);

        const newCompleted = [...completedDays, day].sort((a, b) => a - b);
        let currentStreak = 0;
        for (let i = today; i >= 1; i--) {
          if (newCompleted.includes(i)) {
            currentStreak++;
          } else {
            break;
          }
        }
        setStreak(currentStreak);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with animated streak */}
      <div className="flex justify-between items-center">
        <div className="text-[#ebdbb2] font-bold text-lg">
          {month[new Date().getDay()]} {new Date().getFullYear()}
        </div>
        <motion.div
          className="flex items-center gap-2 bg-[#1d2021] rounded-full px-3 py-1 border border-[#3c3836]"
          whileHover={{ scale: 1.05 }}
        >
          <Flame className="h-4 w-4 text-[#fe8019]" />
          <motion.span
            key={streak}
            initial={{ scale: 1.5, color: "#fe8019" }}
            animate={{ scale: 1, color: "#ebdbb2" }}
            className="text-[#ebdbb2] font-bold"
          >
            {streak} day streak
          </motion.span>
        </motion.div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className="text-center text-xs text-[#a89984] p-2 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCompleted = completedDays.includes(day);
          const isToday = day === today;
          const isFuture = day > today;
          const isSelected = selectedDay === day;

          return (
            <motion.button
              key={day}
              className={cn(
                "aspect-square rounded-lg text-sm font-bold transition-all relative overflow-hidden",
                isCompleted
                  ? "bg-[#fe8019] text-[#1d2021] shadow-lg"
                  : isToday
                  ? "bg-[#3c3836] text-[#ebdbb2] ring-2 ring-[#fe8019] shadow-lg"
                  : isFuture
                  ? "bg-[#1d2021] text-[#504945] cursor-not-allowed"
                  : "bg-[#282828] text-[#ebdbb2] hover:bg-[#3c3836] border border-[#3c3836]",
                isSelected && !isFuture && "ring-2 ring-[#fabd2f]"
              )}
              onClick={() => handleDayTap(day)}
              disabled={isFuture}
              whileHover={!isFuture ? { scale: 1.1, y: -2 } : {}}
              whileTap={!isFuture ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0,
                rotateY: isActive ? 0 : 180,
              }}
              transition={{ delay: day * 0.02, duration: 0.3, type: "spring" }}
            >
              {day}

              {/* Completion checkmark */}
              <AnimatePresence>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="absolute inset-0 flex items-center justify-center bg-[#fe8019]"
                  >
                    <Check className="h-4 w-4 text-[#1d2021]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Today indicator */}
              {isToday && (
                <motion.div
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#fe8019] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Celebration animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-4xl"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="text-center text-xs text-[#a89984] bg-[#1d2021] rounded-lg p-2 border border-[#3c3836]"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Target className="h-3 w-3 text-[#fe8019]" />
          <span className="font-medium">Build consistent habits</span>
        </div>
        Tap past days to mark them complete
      </motion.div>
    </div>
  );
};

export default InteractiveCalendarDemo;
