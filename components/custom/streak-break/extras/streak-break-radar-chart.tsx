"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dimension } from "@prisma/client";

interface MissedTask {
  id: string;
  name: string;
  dimension: string;
  color: string;
  icon: string;
  dimensionId: string;
  points: number;
}

interface RadarChart {
  dimensions: Dimension[];
  previousValues: Record<string, number>;
  currentValues: Record<string, number>;
  missedTasks: MissedTask[];
}

const RadarChart: React.FC<RadarChart> = ({
  dimensions,
  previousValues,
  currentValues,
  missedTasks,
}) => {
  const size = 320;
  const center = size / 2;
  const radius = size * 0.35;

  const [animatedValues, setAnimatedValues] = useState(currentValues);
  const [showingTask, setShowingTask] = useState<MissedTask | null>(null);
  const [affectedDimensionId, setAffectedDimensionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const runAnimation = async () => {
      setAnimatedValues({ ...currentValues });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let progressiveValues = { ...currentValues };

      for (let i = 0; i < missedTasks.length; i++) {
        const task = missedTasks[i];
        setShowingTask(task);
        setAffectedDimensionId(task.dimensionId);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newValues = { ...progressiveValues };
        if (newValues[task.dimensionId] !== undefined) {
          newValues[task.dimensionId] = Math.max(
            0,
            newValues[task.dimensionId] - task.points / 100
          );
        }

        progressiveValues = { ...newValues };
        setAnimatedValues({ ...newValues });

        await new Promise((resolve) => setTimeout(resolve, 1200));
        setShowingTask(null);
        setAffectedDimensionId(null);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };

    runAnimation();
  }, [missedTasks, currentValues]);

  const angleStep = (2 * Math.PI) / dimensions.length;

  const getPoints = (values: Record<string, number>) => {
    return dimensions.map((dim, i) => {
      const value = Math.max(0, Math.min(1, values[dim.id] || 0));
      const angle = i * angleStep - Math.PI / 2;
      return {
        x: center + Math.cos(angle) * (radius * value),
        y: center + Math.sin(angle) * (radius * value),
        label: dim.name,
        color: dim.color,
        angle,
        value,
        dimension: dim,
      };
    });
  };

  const prevPoints = getPoints(previousValues);
  const animatedPoints = getPoints(animatedValues);

  const pathFromPoints = (points: { x: number; y: number }[]) => {
    if (points.length < 3) return "";
    return (
      points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
      " Z"
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto"
      >
        <defs>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Minimal grid circles */}
        {[0.25, 0.5, 0.75, 1].map((level, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Previous path - subtle ghost */}
        {missedTasks.length > 0 && (
          <motion.path
            d={pathFromPoints(prevPoints)}
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth={1}
            strokeDasharray="3,3"
          />
        )}

        {/* Current animated path - the star */}
        <motion.path
          d={pathFromPoints(animatedPoints)}
          fill="rgba(254, 128, 25, 0.12)"
          stroke="#fe8019"
          strokeWidth={2}
          filter="url(#softGlow)"
          animate={{
            d: pathFromPoints(animatedPoints),
          }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Dimension points */}
        {animatedPoints.map((point, i) => (
          <motion.circle
            key={i}
            fill="#fe8019"
            animate={{
              cx: point.x,
              cy: point.y,
            }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}

        {/* Clean dimension labels */}
        {dimensions.map((dim, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius * 1.15;
          const x = center + Math.cos(angle) * labelRadius;
          const y = center + Math.sin(angle) * labelRadius;
          const isAffected = affectedDimensionId === dim.id;

          return (
            <motion.text
              key={dim.id}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill={isAffected ? "#ff6b6b" : dim.color}
              className="select-none font-medium"
              animate={{
                fill: isAffected ? "#ff6b6b" : dim.color,
                scale: isAffected ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {dim.name}
            </motion.text>
          );
        })}
      </svg>
      <AnimatePresence>
        {showingTask && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute -top-20 z-50 border border-white/10 rounded-2xl px-6 py-3 bg-[#1d2021] shadow-lg"
            style={{}}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: showingTask.color }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-white/90 font-medium text-sm">
                {showingTask.name}
              </span>
              <span className="text-red-400/90 font-mono text-sm">
                -{showingTask.points}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RadarChart;
