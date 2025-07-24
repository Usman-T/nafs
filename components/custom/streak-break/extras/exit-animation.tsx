import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Logo from "../../logo";

const ExitAnimation = ({ isExiting }: { isExiting: boolean }) => {
  return (
    <AnimatePresence>
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#1d2021] z-[9999] flex items-center justify-center"
        >
          <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 1.5,
                ease: "easeOut",
              }}
              className="w-12 h-12"
            >
              <Logo className="w-full h-full text-[#fe8019] " />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              className="text-center space-y-1"
            >
              <h2 className="text-2xl text-[#ebdbb2] font-semibold ">
                Loading
              </h2>
              <p className="text-sm text-[#a89984] italic">
                Angels begin writing again...
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitAnimation;
