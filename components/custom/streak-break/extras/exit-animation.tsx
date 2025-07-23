import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import React from "react";

const ExitAnimation = ({ isExiting }: { isExiting: boolean }) => {
  return (
    <AnimatePresence>
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <div className="text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-16 h-16 mx-auto"
            >
              <RotateCcw className="h-16 w-16 text-[#fe8019]" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#ebdbb2]">
                Loading
              </h2>
              <p className="text-[#a89984]">
                Every ending is a new beginning...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitAnimation;
