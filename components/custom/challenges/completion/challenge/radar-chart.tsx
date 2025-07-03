"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Dimension } from "@prisma/client";

interface AnimatedRadarChartProps {
  dimensions: Dimension[];
  previousValues: Record<string, number>;
  currentValues: Record<string, number>;
}

const AnimatedRadarChart: React.FC<AnimatedRadarChartProps> = ({
  dimensions,
  previousValues,
  currentValues,
}) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;

  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const duration = 1200;
      const progress = Math.min(elapsed / duration, 1);
      setAnimationProgress(progress);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [dimensions, previousValues, currentValues]);

  const angleStep = (2 * Math.PI) / dimensions.length;

  const getPoints = (values: Record<string, number>, progress = 1) => {
    return dimensions.map((dim, i) => {
      const value = values[dim.id.toLowerCase()] || 0;
      const scaledValue = value * progress;
      const angle = i * angleStep - Math.PI / 2;
      return {
        x: center + Math.cos(angle) * (radius * scaledValue) / 100,
        y: center + Math.sin(angle) * (radius * scaledValue) / 100,
        label: dim.name,
        color: dim.color,
        angle,
      };
    });
  };

  const prevPoints = getPoints(previousValues);
  const currPoints = getPoints(currentValues, animationProgress);

  const pathFromPoints = (points: { x: number; y: number }[]) => {
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
    >
      {/* Grid Circles */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius * level}
          fill="none"
          stroke="#3c3836"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {dimensions.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + Math.cos(angle) * radius}
            y2={center + Math.sin(angle) * radius}
            stroke="#3c3836"
            strokeWidth="1"
          />
        );
      })}

      {/* Previous Path */}
      <motion.path
        d={pathFromPoints(prevPoints)}
        fill="rgba(254, 128, 25, 0.1)"
        stroke="rgba(254, 128, 25, 0.3)"
        strokeWidth={2}
      />

      {/* Current Path (Animated) */}
      <motion.path
        d={pathFromPoints(currPoints)}
        fill="rgba(254, 128, 25, 0.3)"
        stroke="#fe8019"
        strokeWidth={2}
      />

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = radius * 1.2;
        const x = center + Math.cos(angle) * labelRadius;
        const y = center + Math.sin(angle) * labelRadius;
        return (
          <text
            key={dim.id}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill={dim.color}
            className="select-none"
          >
            {dim.name}
          </text>
        );
      })}
    </svg>
  );
};

export default AnimatedRadarChart;
