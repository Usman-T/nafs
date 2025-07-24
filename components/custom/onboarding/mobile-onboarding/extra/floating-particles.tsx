import { motion } from "framer-motion";
import Particle from "./particle";

const EnhancedFloatingParticles = ({ count = 25 }: { count?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="relative mb-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Particle key={i} color="#fe8019" speed={1.5} />
      ))}
    </motion.div>
  );
};

export default EnhancedFloatingParticles;
