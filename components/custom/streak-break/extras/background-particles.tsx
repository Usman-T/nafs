"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BackgroundParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: Math.random() * window.innerWidth,
        dy: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 10,
      };
    });

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#fe8019] rounded-full opacity-20"
          initial={{ x: p.x, y: p.y }}
          animate={{ x: p.dx, y: p.dy }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;
