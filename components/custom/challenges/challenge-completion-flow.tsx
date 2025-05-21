"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import Celebration from "./completion/celebration";
import StreakProgression from "./completion/streak-progression";
import TaskImpactVisualization from "./completion/task-impact";
import DimensionDetail from "./completion/dimension-detail";
import RadarChart from "./completion/radar-chart";
import AnimatedCounter from "./completion/animated-counter";
import Particle from "./completion/particle";

const spiritualDimensions = [
  {
    name: "Salah",
    value: 0.7,
    color: "#83a598",
    description: "Prayer consistency and quality",
  },
  {
    name: "Quran",
    value: 0.5,
    color: "#8ec07c",
    description: "Recitation, understanding, and memorization",
  },
  {
    name: "Charity",
    value: 0.6,
    color: "#fe8019",
    description: "Giving zakat, sadaqah, and helping others",
  },
  {
    name: "Community",
    value: 0.4,
    color: "#fabd2f",
    description: "Involvement with the Muslim ummah",
  },
  {
    name: "Dhikr",
    value: 0.8,
    color: "#d3869b",
    description: "Remembrance of Allah throughout the day",
  },
  {
    name: "Knowledge",
    value: 0.6,
    color: "#b8bb26",
    description: "Learning Islamic teachings and wisdom",
  },
  {
    name: "Character",
    value: 0.7,
    color: "#fb4934",
    description: "Developing good character in daily interactions",
  },
];

const TaskCompletionFlow = ({
  tasks,
  completedTasks,
  currentStreak,
  onComplete,
}: {
  tasks: any[];
  completedTasks: number[];
  currentStreak: number;
  onComplete: (newStreak: number) => void;
}) => {
  const [flowStep, setFlowStep] = useState("welcome");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [updatedDimensions, setUpdatedDimensions] = useState([
    ...spiritualDimensions,
  ]);
  const [animatingDimension, setAnimatingDimension] = useState<{
    name: string;
    oldValue: number;
    newValue: number;
  } | null>(null);
  const [newStreak, setNewStreak] = useState(currentStreak + 1);
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // Get completed tasks
  const completedTasksData = completedTasks.map((index) => tasks[index]);

  // Handle task animation
  useEffect(() => {
    if (
      flowStep === "dimensions" &&
      currentTaskIndex < completedTasksData.length &&
      !isAnimating
    ) {
      const task = completedTasksData[currentTaskIndex];
      if (!task) return;

      const dimensionIndex = updatedDimensions.findIndex(
        (d) => d.name === task.dimension
      );

      if (dimensionIndex !== -1) {
        const oldValue = updatedDimensions[dimensionIndex].value;
        const newValue = Math.min(1, oldValue + task.impact);

        setIsAnimating(true);

        setAnimatingDimension({
          name: task.dimension,
          oldValue,
          newValue,
        });

        const timer = setTimeout(() => {
          setUpdatedDimensions((prevDimensions) => {
            const newDimensions = [...prevDimensions];
            newDimensions[dimensionIndex] = {
              ...newDimensions[dimensionIndex],
              value: newValue,
            };
            return newDimensions;
          });

          setAnimatingDimension(null);
          setIsAnimating(false);
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [flowStep, currentTaskIndex, completedTasksData, isAnimating, updatedDimensions]);

  // Handle next task
  const handleNextTask = useCallback(() => {
    if (currentTaskIndex < completedTasksData.length - 1) {
      setCurrentTaskIndex((prevIndex) => prevIndex + 1);
    } else {
      setFlowStep("streak");
    }
  }, [currentTaskIndex, completedTasksData.length]);

  // Handle dimension click
  const handleDimensionClick = useCallback((dimension: string) => {
    setSelectedDimension(dimension);
  }, []);

  // Handle flow navigation
  const handleContinue = useCallback(() => {
    if (flowStep === "welcome") {
      setFlowStep("dimensions");
    } else if (flowStep === "streak") {
      setFlowStep("celebration");
    } else if (flowStep === "celebration") {
      onComplete(newStreak);
    }
  }, [flowStep, newStreak, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="bg-[#282828] rounded-xl border border-[#3c3836] w-full max-w-md overflow-hidden shadow-xl"
      >
        <div className="p-6">
          <AnimatePresence mode="wait">
            {flowStep === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    times: [0, 0.6, 1],
                  }}
                  className="mb-4"
                >
                  <Sparkles className="w-16 h-16 text-[#fe8019] mx-auto" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-[#ebdbb2] mb-2"
                >
                  Day Complete!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[#a89984] mb-6"
                >
                  Congratulations! You&apos;ve completed all your tasks for today.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative mb-6"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Particle key={i} color="#fe8019" speed={1.5} />
                  ))}

                  <div className="relative z-10 bg-[#1d2021] rounded-lg p-6 border border-[#3c3836]">
                    <div className="text-center mb-4">
                      <div className="text-sm text-[#a89984]">
                        Tasks Completed
                      </div>
                      <motion.div
                        className="text-4xl font-bold text-[#ebdbb2]"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          delay: 0.3,
                        }}
                      >
                        <AnimatedCounter value={completedTasksData.length} />
                      </motion.div>
                    </div>

                    <div className="flex justify-center gap-2 mb-4">
                      {completedTasksData.map((task, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.4 + i * 0.08,
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                          className="h-8 w-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: task.color }}
                        >
                          <Check className="h-4 w-4 text-[#1d2021]" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-sm text-[#a89984] text-center">
                      Let&apos;s see how these tasks have improved your spiritual
                      dimensions.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: 1,
                  }}
                >
                  <Button
                    className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90 px-8"
                    onClick={handleContinue}
                    size="lg"
                  >
                    Continue
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {flowStep === "dimensions" && (
              <motion.div
                key="dimensions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#ebdbb2]">
                    Spiritual Growth
                  </h2>
                  <Badge className="bg-[#3c3836] text-[#a89984]">
                    {currentTaskIndex + 1}/{completedTasksData.length}
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div className="mb-4">
                    <RadarChart
                      dimensions={updatedDimensions}
                      showAnimation={true}
                      animateDimension={animatingDimension}
                      highlightDimension={
                        completedTasksData[currentTaskIndex]?.dimension
                      }
                      interactive={true}
                      onDimensionClick={handleDimensionClick}
                    />
                  </div>

                  <AnimatePresence>
                    {selectedDimension ? (
                      <DimensionDetail
                        dimension={selectedDimension}
                        value={
                          updatedDimensions.find(
                            (d) => d.name === selectedDimension
                          )?.value || 0
                        }
                        color={
                          updatedDimensions.find(
                            (d) => d.name === selectedDimension
                          )?.color || "#fe8019"
                        }
                        description={
                          updatedDimensions.find(
                            (d) => d.name === selectedDimension
                          )?.description || ""
                        }
                        onClose={() => setSelectedDimension(null)}
                      />
                    ) : (
                      <TaskImpactVisualization
                        task={completedTasksData[currentTaskIndex]}
                        dimension={
                          completedTasksData[currentTaskIndex]?.dimension
                        }
                        impact={
                          completedTasksData[currentTaskIndex]?.impact || 0
                        }
                        onComplete={handleNextTask}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {flowStep === "streak" && (
              <motion.div
                key="streak"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[#ebdbb2]">
                    Streak Progress
                  </h2>
                </div>

                <StreakProgression
                  currentStreak={currentStreak}
                  newStreak={newStreak}
                  onComplete={handleContinue}
                />
              </motion.div>
            )}

            {flowStep === "celebration" && (
              <Celebration
                onComplete={handleContinue}
                currentLevel={3}
                levelUp={false}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskCompletionFlow;
