"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Plus, Award, Loader2, Trash } from "lucide-react";
import {
  Challenge,
  Dimension,
  Task as TaskType,
  UserChallenge,
  DimensionValue,
  DailyTask,
  CompletedTask,
  User,
} from "@prisma/client";
import RadarChart from "./completion/challenge/radar-chart";
import DimensionProgressCard from "./completion/challenge/dimensions-progress";
import CustomTaskForm from "../onboarding/onboarding-task-form";
import ChallengeCard from "./completion/challenge/challenge-card";
import ChallengeWelcome from "./completion/challenge/challenge-welcome";
import ChallengeSummary from "../onboarding/onboarding-challenge-summary";
import { iconMap } from "@/lib/iconMap";
import Task from "../onboarding/onboarding-task";
import { useRouter } from "next/navigation";
import {
  createCustomChallenge,
  enrollInExistingChallenge,
} from "@/lib/actions";

interface DimensionValueWithDimension extends DimensionValue {
  dimension: Dimension;
}

interface TaskWithDimension extends TaskType {
  dimension: Dimension;
}

interface DailyTaskWithDetails extends DailyTask {
  task: TaskWithDimension;
  completions: CompletedTask[];
  user: User & {
    currentChallenge: UserChallenge | null;
    currentStreak?: number;
  };
}

interface ChallengeCompletionFlowProps {
  completedChallenge: UserChallenge & {
    challenge: Challenge;
  };
  dailyTasks: DailyTaskWithDetails[];
  onComplete: () => void;
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
  dimensionValues: DimensionValueWithDimension[];
}

export default function ChallengeCompletionFlow({
  completedChallenge,
  dailyTasks,
  onComplete,
  predefinedChallenges,
  dimensions,
  dimensionValues,
}: ChallengeCompletionFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [customChallenge, setCustomChallenge] = useState({
    title: "Custom Challenge",
    description: "Your personalized 3 day challenge",
    duration: 3,
    tasks: [] as {
      name: string;
      dimension: Dimension;
    }[],
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  // Calculate dimension progress logic (unchanged)
  const calculateDimensionProgress = () => {
    // Get current dimension values from the dimensionValues prop
    const currentValues: Record<string, number> = {};
    const previousValues: Record<string, number> = {};

    // Initialize current values from dimensionValues prop
    dimensionValues.forEach((dimensionValue) => {
      const dimensionKey = dimensionValue.dimension.id;
      currentValues[dimensionKey] = dimensionValue.value * 100;
    });

    // Also initialize for dimensions that might not have values yet
    dimensions.forEach((dim) => {
      if (!(dim.id in currentValues)) {
        currentValues[dim.id] = 0;
      }
    });

    // Calculate the total impact from completed tasks during this challenge
    const dimensionTaskImpacts: Record<
      string,
      { totalCompletions: number; tasks: string[] }
    > = {};

    // Initialize dimension impacts
    dimensions.forEach((dim) => {
      dimensionTaskImpacts[dim.id] = {
        totalCompletions: 0,
        tasks: [],
      };
    });

    // Count completions for each dimension based on the dailyTasks
    dailyTasks.forEach((dailyTask) => {
      const dimensionId = dailyTask.task.dimensionId;
      const completionsCount = dailyTask.completions.length;

      if (dimensionTaskImpacts[dimensionId] && completionsCount > 0) {
        dimensionTaskImpacts[dimensionId].totalCompletions += completionsCount;
        // Only add task name once, even if completed multiple times
        if (
          !dimensionTaskImpacts[dimensionId].tasks.includes(dailyTask.task.name)
        ) {
          dimensionTaskImpacts[dimensionId].tasks.push(dailyTask.task.name);
        }
      }
    });

    // Calculate previous values and dimension impacts
    const dimensionImpacts: Record<string, { value: number; tasks: string[] }> =
      {};

    dimensions.forEach((dim) => {
      const dimensionId = dim.id;
      const currentValue = currentValues[dimensionId] || 0;
      const taskImpactData = dimensionTaskImpacts[dimensionId];

      // Calculate impact: each completion adds points based on the task's point value
      // For now, we'll use a base impact per completion
      const impactPerCompletion = 3; // Adjust this value as needed
      const totalImpact = taskImpactData.totalCompletions * impactPerCompletion;

      // Previous value should be current value minus the impact gained during this challenge
      // But ensure it doesn't go below 0
      previousValues[dimensionId] = Math.max(0, currentValue - totalImpact);

      // Set up dimension impacts for display
      dimensionImpacts[dimensionId] = {
        value: currentValue,
        tasks: taskImpactData.tasks,
      };
    });

    const totalCompletions = Object.values(dimensionTaskImpacts).reduce(
      (sum, impact) => sum + impact.totalCompletions,
      0
    );

    if (totalCompletions === 0) {
      dimensions.forEach((dim) => {
        const dimensionId = dim.id;
        const currentValue = currentValues[dimensionId] || 0;
        previousValues[dimensionId] = Math.max(0, currentValue - 2);
      });
    }

    return { previousValues, currentValues, dimensionImpacts };
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  const { previousValues, currentValues, dimensionImpacts } = calculateDimensionProgress();

  // Load selected challenge data
  useEffect(() => {
    const loadChallenge = async () => {
      if (!selectedChallengeId) return;

      try {
        setChallengeLoading(true);
        const response = await fetch(`/api/challenges/${selectedChallengeId}`);
        const data = await response.json();
        setSelectedChallenge(data.challenge);
      } catch (error) {
        console.error("Error fetching challenge:", error);
      } finally {
        setChallengeLoading(false);
      }
    };

    loadChallenge();
  }, [selectedChallengeId]);

  // Confetti effect for celebration step
  useEffect(() => {
    if (step === 0) {
      // First burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.5, y: 0.5 },
        colors: [
          "#fe8019",
          "#fabd2f",
          "#b8bb26",
          "#8ec07c",
          "#83a598",
          "#d3869b",
          "#fb4934",
        ],
        gravity: 0.8,
        scalar: 1.2,
        shapes: ["circle", "square"],
        ticks: 200,
      });

      // Second burst after a delay
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: ["#fe8019", "#fabd2f"],
          gravity: 0.6,
          scalar: 1.5,
          shapes: ["circle"],
        });
      }, 500);
    }
  }, [step]);

  const handleChallengeCompletion = async () => {
    try {
      setIsLoading(true);

      console.log("king")
      if (selectedChallengeId) {
        const result = await enrollInExistingChallenge(
          selectedChallengeId,
          selectedTasks
        );
        console.log(result)
        if (!result.success) throw new Error(result.message);
      } else if (customChallenge.tasks.length > 0) {
        const creationResult = await createCustomChallenge({
          title: customChallenge.title,
          description: customChallenge.description,
          duration: customChallenge.duration,
          tasks: customChallenge.tasks.map((t) => ({
            name: t.name,
            dimensionId: t.dimension.id,
          })),
        });
        console.log(creationResult)

        if (!creationResult.success) {
          throw new Error(creationResult.message);
        }
      }

      // Redirect to dashboard after successful enrollment
      router.push("/dashboard");
      onComplete();
    } catch (error) {
      console.error("Challenge completion error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = (task: { name: string; dimension: Dimension }) => {
    setCustomChallenge({
      ...customChallenge,
      tasks: [...customChallenge.tasks, { ...task, dimension: task.dimension }],
    });
    setShowTaskForm(false);
  };

  const toggleTaskSelection = (taskIndex: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskIndex)
        ? prev.filter((index) => index !== taskIndex)
        : [...prev, taskIndex]
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: // Celebration
        return (
          <ChallengeWelcome
            completedChallenge={completedChallenge}
            dailyTasks={dailyTasks}
            confettiRef={containerRef}
          />
        );

      case 1: // Dimension Progress
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                Spiritual Growth
              </h2>
              <p className="text-[#a89984]">
                See how your dimensions have grown during this challenge
              </p>
            </div>
            <div className="relative bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
              <RadarChart
                dimensions={dimensions}
                previousValues={previousValues}
                currentValues={currentValues}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[#ebdbb2] font-medium">
                  Dimension Progress
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dimensions
                  .map((dim) => ({
                    dimension: dim,
                    previousValue: previousValues[dim.id] || 0,
                    currentValue: currentValues[dim.id] || 0,
                    tasksContributed: dimensionImpacts[dim.id]?.tasks || [],
                  }))
                  .filter((item) => item.tasksContributed.length > 0)
                  .map((item, i) => (
                    <DimensionProgressCard
                      key={item.dimension.id}
                      dimension={item.dimension}
                      previousValue={item.previousValue}
                      currentValue={item.currentValue}
                      tasksContributed={item.tasksContributed}
                      delay={i * 0.1}
                    />
                  ))}
              </div>
            </div>
            <div className="text-center text-sm text-[#a89984]">
              <p>
                Your spiritual journey continues. Choose a new challenge to keep
                growing in all dimensions.
              </p>
            </div>
          </motion.div>
        );

      case 2: // Choose next challenge
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                Choose a Challenge
              </h2>
              <p className="text-[#a89984]">
                Select a pre-designed challenge or create your own
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {predefinedChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isSelected={selectedChallengeId === challenge.id}
                  onSelect={() => setSelectedChallengeId(challenge.id)}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <Button
                variant="outline"
                className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836] hover:text-[#fe8019]"
                onClick={() => setStep(5)} // Jump to custom challenge step
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Challenge
              </Button>
            </motion.div>
          </motion.div>
        );

      case 3: // Challenge details (for predefined challenges)
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {selectedChallenge && !challengeLoading ? (
              <>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-[#ebdbb2]">
                    {selectedChallenge.name}
                  </h2>
                  <p className="text-[#a89984]">
                    {selectedChallenge.description}
                  </p>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                  <Badge className="bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945] transition-colors">
                    {selectedChallenge.duration} days
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[#ebdbb2] font-medium">
                    Challenge Tasks
                  </h3>
                  <div className="space-y-2">
                    {selectedChallenge.tasks.map(({ task }, i) => (
                      <Task
                        key={i}
                        task={task}
                        isSelected={selectedTasks.includes(i)}
                        onClick={() => toggleTaskSelection(i)}
                        selectedTasks={selectedTasks}
                        setSelectedTasks={setSelectedTasks}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-sm text-[#a89984] text-center">
                  <p>
                    Select at least 3 tasks and complete them daily to progress
                    in your spiritual journey.
                  </p>
                </div>
              </>
            ) : (
              // Loading skeleton (unchanged)
              <div className="space-y-6 animate-pulse">
                <div className="text-center space-y-2">
                  <div className="h-7 w-3/4 bg-[#3c3836] rounded mx-auto"></div>
                  <div className="h-4 w-5/6 bg-[#3c3836] rounded mx-auto"></div>
                </div>
                <div className="flex justify-center">
                  <div className="h-8 w-24 bg-[#3c3836] rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-5 w-1/3 bg-[#3c3836] rounded"></div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-14 bg-[#3c3836] rounded-lg"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-[#3c3836] rounded"></div>
                  <div className="h-3 w-5/6 bg-[#3c3836] rounded"></div>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 4: // Challenge summary (for predefined challenges)
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {selectedChallenge && (
              <ChallengeSummary
                selectedTasks={selectedTasks}
                challenge={selectedChallenge}
              />
            )}
          </motion.div>
        );

      case 5: // Custom challenge - add tasks
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                Add Challenge Tasks
              </h2>
              <p className="text-[#a89984]">
                Create tasks to complete daily during your challenge
              </p>
            </div>

            <div className="space-y-4">
              {customChallenge.tasks.length > 0 ? (
                <div className="space-y-2">
                  {customChallenge.tasks.map((task, i) => {
                    const IconComponent = iconMap[task.dimension.icon] || "BookOpen";
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <IconComponent
                              className="h-4 w-4"
                              style={{
                                color: task.dimension.color,
                                borderColor: task.dimension.color,
                              }}
                            />
                          </div>
                          <div>
                            <span className="text-[#ebdbb2] text-sm sm:text-base">
                              {task.name}
                            </span>
                            <div className="text-xs text-[#a89984] mt-1">
                              {task.dimension.name}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[#a89984] hover:text-[#fb4934] hover:bg-transparent flex-shrink-0"
                          onClick={() => {
                            setCustomChallenge({
                              ...customChallenge,
                              tasks: customChallenge.tasks.filter(
                                (_, index) => index !== i
                              ),
                            });
                          }}
                        >
                          <Trash className="w-6 h-6" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-[#3c3836] rounded-md">
                  <p className="text-[#a89984]">No tasks added yet</p>
                  <p className="text-xs text-[#a89984] mt-1">
                    Add tasks to complete during your challenge
                  </p>
                </div>
              )}

              <AnimatePresence>
                {showTaskForm ? (
                  <CustomTaskForm
                    onAdd={handleAddTask}
                    dimensions={dimensions}
                    onCancel={() => setShowTaskForm(false)}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-dashed border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019] hover:bg-transparent"
                      onClick={() => setShowTaskForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Task
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-sm text-[#a89984] text-center">
              <p>
                Add at least 3 and at max 5 do-able tasks to your challenge.
              </p>
            </div>
          </motion.div>
        );

      case 6: // Custom challenge summary
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto h-16 w-16 rounded-full bg-[#fe8019] flex items-center justify-center mb-4"
              >
                <Award className="h-8 w-8 text-[#1d2021]" />
              </motion.div>
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                Challenge Created
              </h2>
              <p className="text-[#a89984]">
                You&apos;re ready to begin your custom challenge
              </p>
            </div>

            <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
              <h3 className="text-[#ebdbb2] font-medium mb-2">
                {customChallenge.title || "Untitled Challenge"}
              </h3>
              <div className="text-sm text-[#a89984] mb-3">
                {customChallenge.description || "No description provided"}
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                  {customChallenge.duration} days
                </Badge>
                <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                  {customChallenge.tasks.length} tasks
                </Badge>
              </div>

              <div className="space-y-2">
                {customChallenge.tasks.map((task, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className="h-4 w-4 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: task.dimension.color }}
                    ></div>
                    <span className="text-sm text-[#ebdbb2]">{task.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-[#a89984] text-center">
              <p>Your challenge will begin today.</p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 2:
        return !selectedChallengeId;
      case 3:
        return selectedTasks.length < 3;
      case 5:
        return !(customChallenge.tasks.length >= 3 && customChallenge.tasks.length <= 5);
      default:
        return false;
    }
  };

  const showFinishButton = () => {
    return (step === 4 && selectedChallenge) || step === 6;
  };

  const handleNext = () => {
    if (step === 2 && !selectedChallengeId) {
      setStep(5); // Jump to custom challenge
    } else if (step === 4 || step === 6) {
      handleChallengeCompletion();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 5) {
      setStep(2); // Go back to challenge selection
    } else {
      setStep(Math.max(0, step - 1));
    }
  };

  const getTotalSteps = () => {
    if (selectedChallengeId) {
      return 5; // 0: celebration, 1: progress, 2: choose, 3: details, 4: summary
    } else {
      return 7; // 0: celebration, 1: progress, 2: choose, 5: add tasks, 6: custom summary
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1d2021]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#282828] border border-[#3c3836] rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-b border-[#3c3836] flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-[#fe8019] mr-2" />
            <span className="text-[#ebdbb2] font-medium">
              Challenge Journey
            </span>
          </div>
          <div className="text-[#a89984] text-sm">
            Step {step + 1} of {getTotalSteps()}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <div key={step} ref={containerRef}>
              {renderStepContent()}
            </div>
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-[#3c3836] flex justify-between">
          <Button
            variant="outline"
            className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={handleBack}
            disabled={step === 0 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button
            className="bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
            onClick={handleNext}
            disabled={isNextDisabled() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : showFinishButton() ? (
              "Start Challenge"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}