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
  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;
  
  const [animationPhase, setAnimationPhase] = useState(0); // 0: initial, 1: showing tasks, 2: complete
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [animatedValues, setAnimatedValues] = useState(previousValues);
  const [showingTask, setShowingTask] = useState<MissedTask | null>(null);

  useEffect(() => {
    const runAnimation = async () => {
      // Phase 1: Show initial state for 800ms
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnimationPhase(1);

      // Phase 2: Animate each missed task
      for (let i = 0; i < missedTasks.length; i++) {
        const task = missedTasks[i];
        setCurrentTaskIndex(i);
        setShowingTask(task);

        // Show task name for 1000ms
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Animate the point reduction
        const newValues = { ...animatedValues };
        if (newValues[task.dimensionId] !== undefined) {
          newValues[task.dimensionId] -= task.points / 100;
        }
        
        setAnimatedValues(newValues);
        
        // Wait for animation to complete
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Clear task name
        setShowingTask(null);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setAnimationPhase(2);
    };

    runAnimation();
  }, [missedTasks, previousValues]);

  const angleStep = (2 * Math.PI) / dimensions.length;

  const getPoints = (values: Record<string, number>) => {
    return dimensions.map((dim, i) => {
      const value = Math.max(0, values[dim.id] || 0); // Ensure non-negative
      const angle = i * angleStep - Math.PI / 2;
      return {
        x: center + (Math.cos(angle) * (radius * value)),
        y: center + (Math.sin(angle) * (radius * value)),
        label: dim.name,
        color: dim.color,
        angle,
        value,
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
    <div className="relative">
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
            opacity={0.3}
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
              opacity={0.3}
            />
          );
        })}

        {/* Previous Path (Ghost/Reference) */}
        <motion.path
          d={pathFromPoints(prevPoints)}
          fill="rgba(235, 219, 178, 0.1)"
          stroke="rgba(235, 219, 178, 0.3)"
          strokeWidth={2}
          strokeDasharray="4,4"
        />

        {/* Current Animated Path */}
        <motion.path
          d={pathFromPoints(animatedPoints)}
          fill="rgba(254, 128, 25, 0.3)"
          stroke="#fe8019"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Dimension Labels */}
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
              fontSize="11"
              fill={dim.color}
              className="select-none font-medium"
              opacity={0.8}
            >
              {dim.name}
            </text>
          );
        })}

        {/* Animated Points */}
        {animatedPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#fe8019"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </svg>

      {/* Task Animation Overlay */}
      <AnimatePresence>
        {showingTask && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-[#1d2021] border-2 border-red-500 rounded-lg px-6 py-4 shadow-2xl max-w-xs text-center">
              <motion.div
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                className="flex items-center justify-center gap-3 mb-2"
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: showingTask.color }}
                />
                <span className="text-lg font-semibold text-red-400">
                  -{showingTask.points} pts
                </span>
              </motion.div>
              
              <div className="text-[#ebdbb2] font-medium mb-1">
                {showingTask.name}
              </div>
              
              <div className="text-[#a89984] text-sm">
                {showingTask.dimension}
              </div>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-1 bg-red-500 rounded-full mt-3 origin-left"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      {missedTasks.length > 0 && animationPhase === 1 && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {missedTasks.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentTaskIndex ? 'bg-red-500' : 'bg-[#3c3836]'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RadarChart;