import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const SwipeHint = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="text-center text-xs text-[#a89984] mb-4 flex items-center justify-center gap-2"
    >
      <ChevronLeft className="h-3 w-3" />
      <span>Swipe to navigate</span>
      <ChevronRight className="h-3 w-3" />
    </motion.div>
  );
};

export default SwipeHint;
