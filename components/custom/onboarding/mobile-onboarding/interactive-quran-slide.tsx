import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Heart,
  Check,
  Volume2,
  ArrowUp,
  Info,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import Toast from "./extra/dimension-toast";
import DimensionPopover from "./extra/dimension-popover";

const QuranDemoSlide = ({
  isActive,
  onTaskComplete,
}: {
  isActive: boolean;
  onTaskComplete: () => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showFaithPopover, setShowFaithPopover] = useState(false);

  useEffect(() => {
    if (isActive && isPlaying && !hasCompleted) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setHasCompleted(true);
            setShowToast(true);
            onTaskComplete();
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isActive, isPlaying, hasCompleted, onTaskComplete]);

  const handlePlay = () => {
    if (!hasCompleted && !isPlaying) {
      setIsPlaying(true);
    }
  };

  const faithDimension = {
    name: "Faith",
    icon: Sparkles,
    color: "#00FFF7",
    description: "Iman in practice - Salah, sincerity, intentions, tawakkul",
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-8 min-h-[500px]">
      <Toast
        message="+5 Faith"
        icon={Sparkles}
        color="#fe8019"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <DimensionPopover
        dimension={faithDimension}
        show={showFaithPopover}
        onClose={() => setShowFaithPopover(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={
          isActive
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 50 }
        }
        transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        className="relative"
      >
        <div className="w-80 bg-[#1d2021] rounded-3xl p-6 border-4 border-[#3c3836] shadow-2xl">
          {/* Surah Header */}
          <div className="text-center mb-6">
            <div className="text-[#fe8019] font-bold text-2xl mb-2">
              Surah Al-Fatiha
            </div>
            <div className="text-[#a89984] text-sm">The Opening</div>
          </div>

          {/* Ayah Card */}
          <div className="bg-[#282828] rounded-2xl p-6 mb-6 border border-[#3c3836]">
            <div className="text-right text-2xl text-[#fe8019] font-arabic leading-relaxed mb-4">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="text-[#ebdbb2] text-sm leading-relaxed">
              In the name of Allah, the Entirely Merciful, the Especially
              Merciful.
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-between bg-[#282828] rounded-xl p-4 border border-[#3c3836] mb-4">
            <div className="flex items-center gap-3">
              <motion.button
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-[#1d2021] transition-all",
                  hasCompleted ? "bg-[#8ec07c]" : "bg-[#fe8019]"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}
                disabled={hasCompleted}
              >
                {hasCompleted ? (
                  <Check className="h-6 w-6" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" />
                )}
              </motion.button>
              <div>
                <div className="text-[#ebdbb2] text-sm font-medium">
                  Sheikh Mishary
                </div>
                <div className="text-[#a89984] text-xs">
                  {hasCompleted
                    ? "Completed!"
                    : isPlaying
                    ? "Playing..."
                    : "Tap to listen"}
                </div>
              </div>
            </div>
            <Volume2 className="h-5 w-5 text-[#a89984]" />
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-[#3c3836] rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-[#fe8019] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Task Label */}
          <div className="text-center">
            <div className="text-[#a89984] text-sm">Listening to Quran</div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setShowFaithPopover(true)}
                className="text-[#00FFF7] font-bold hover:text-[#a3c5e8] transition-colors flex items-center gap-1"
              >
                Faith Dimension
                <Info className="h-3 w-3" />
              </button>
            </div>
            <div className="text-[#a89984] text-xs mt-1">Tap to learn more</div>
          </div>
        </div>
      </motion.div>

      {!hasCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-[#a89984] text-sm flex items-center gap-2"
        >
          <ArrowUp className="h-4 w-4" />
          Complete the task to continue
        </motion.div>
      )}
    </div>
  );
};

export default QuranDemoSlide;
