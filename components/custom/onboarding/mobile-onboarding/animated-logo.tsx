"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../logo";

export function AnimatedLogo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4"
    >
      <Logo className="h-14 w-14 text-[#fe8019]" />
    </motion.div>
  );
}
