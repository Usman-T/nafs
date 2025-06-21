"use client";

import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({
  text = "Loading...",
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen
          ? "fixed inset-0 bg-[#1d2021]/80 backdrop-blur-sm z-50"
          : "py-12"
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="relative h-12 w-12 mb-4"
      >
        <Moon className="absolute inset-0 h-full w-full text-[#fe8019]" />
      </motion.div>
      <p className="text-[#ebdbb2]">{text}</p>
    </div>
  );
}
