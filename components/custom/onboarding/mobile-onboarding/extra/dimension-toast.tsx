import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({
  message,
  icon: Icon,
  color,
  show,
  onClose,
}: {
  message: string;
  icon: React.ElementType;
  color: string;
  show: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div
            className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-sm"
            style={{
              backgroundColor: `${color}20`,
              borderColor: `${color}30`,
              boxShadow: `0 0 20px ${color}30`,
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="p-2 rounded-full"
              style={{ backgroundColor: color }}
            >
              <Icon className="h-5 w-5 text-[#1d2021]" />
            </motion.div>
            <div>
              <div className="text-[#ebdbb2] font-bold text-lg">{message}</div>
              <div className="text-[#a89984] text-sm">
                Great job! Keep going
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast