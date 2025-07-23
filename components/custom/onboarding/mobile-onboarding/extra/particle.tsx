import { motion } from "framer-motion";

const Particle = ({
  color,
  size: baseSize = 6,
  speed = 1,
  top = "random",
  left = "random",
}: {
  color: string;
  size?: number;
  speed?: number;
  top?: string | number;
  left?: string | number;
}) => {
  const randomX = typeof left === "string" ? Math.random() * 100 : left;
  const randomY = typeof top === "string" ? Math.random() * 100 : top;
  const size = Math.random() * baseSize + 2;
  const duration = (Math.random() * 10 + 10) / speed;
  const delay = Math.random() * 2;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top: typeof randomY === "number" ? `${randomY}%` : randomY,
        left: typeof randomX === "number" ? `${randomX}%` : randomX,
      }}
      initial={{ opacity: 0 }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 0.4, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

export default Particle;
