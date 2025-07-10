"use client";

import { motion } from "framer-motion";

const GreetingSection = ({ username }: { username: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h1 className="text-2xl font-bold text-[#ebdbb2] mb-1">
        Salam {username || "Brother"}!
      </h1>
      <p className="text-[#a89984]">
        Let&apos;s continue your spiritual journey
      </p>
    </motion.div>
  );
};

export default GreetingSection;
