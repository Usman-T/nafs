import { motion } from "framer-motion";

const StreakFlame = ({
  streak,
  size = 40,
}: {
  streak: number;
  size?: number;
}) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Base flame */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-t from-[#fe8019] to-[#fabd2f]"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Flame particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#fabd2f]"
          style={{
            top: "20%",
            left: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            y: [-10, -30],
            opacity: [0.7, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Streak number */}
      <div className="absolute inset-0 flex items-center justify-center text-[#1d2021] font-bold">
        {streak}
      </div>
    </div>
  );
};

export default StreakFlame;
