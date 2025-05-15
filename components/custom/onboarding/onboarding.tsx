"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Award,
  Loader2,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/lib/iconMap";
import { Challenge, Dimension } from "@prisma/client";
import CustomTaskForm from "@/components/custom/onboarding/onboarding-task-form";
import ChallengeCard from "@/components/custom/onboarding/onboarding-challenge";
import SelectedChallenge from "@/components/custom/onboarding/onboarding-selected-challenge";
import OnboardingWelcome from "@/components/custom/onboarding/onboarding-welcome";
import ChallengeSummary from "@/components/custom/onboarding/onboarding-challenge-summary";
import {
  createCustomChallenge,
  enrollInExistingChallenge,
} from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function ChallengeOnboarding({
  predefinedChallenges,
  dimensions,
}: {
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null
  );
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
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  const onComplete = async () => {
    try {
      setIsLoading(true);

      if (selectedChallengeId) {
        const result = await enrollInExistingChallenge(
          selectedChallengeId,
          selectedTasks
        );
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

        if (!creationResult.success) {
          throw new Error(creationResult.message);
        }

        console.log(
          "Custom challenge created with ID:",
          creationResult.challengeId
        );
      }

      console.log("Onboarding completed successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
    } finally {
      setIsLoading(false);
    }
    console.log("completed onboarding");
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
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

  const handleAddTask = (task: { name: string; dimension: Dimension }) => {
    setCustomChallenge({
      ...customChallenge,
      tasks: [...customChallenge.tasks, { ...task, dimension: task.dimension }],
    });
    setShowTaskForm(false);
  };

  const handleStartChallenge = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: // Welcome
        return <OnboardingWelcome />;
      case 1: // Choose challenge
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
                onClick={() => setStep(4)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Challenge
              </Button>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {selectedChallengeId && (
              <>
                <SelectedChallenge
                  selectedTasks={selectedTasks}
                  setSelectedTasks={setSelectedTasks}
                  challenge={selectedChallenge}
                  loading={challengeLoading}
                />
              </>
            )}
          </motion.div>
        );

      case 3: // Challenge summary
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {selectedChallengeId && (
              <>
                <ChallengeSummary
                  selectedTasks={selectedTasks}
                  challenge={selectedChallenge}
                />
              </>
            )}
          </motion.div>
        );

      case 4: // Custom challenge - add tasks
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
                    const IconComponent =
                      iconMap[task.dimension.icon] || "BookOpen";
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

      case 5: // Custom challenge summary
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
      case 1:
        return !selectedChallengeId && step !== 3;
      case 2:
        return selectedTasks.length < 3;
      case 4:
        return !(
          customChallenge.tasks.length >= 3 && customChallenge.tasks.length <= 5
        );
      case 5:
        return customChallenge.tasks.length === 0;
      default:
        return false;
    }
  };

  const showFinishButton = () => {
    return (step === 3 && selectedChallengeId) || step === 5;
  };

  const handleNext = () => {
    if (step === 1 && !selectedChallengeId) {
      setStep(4);
    } else if (step === 3 || step === 5) {
      handleStartChallenge();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(1);
    } else {
      setStep(Math.max(0, step - 1));
    }
  };

  return (
    <div className="fixed inset-0 h-screen bg-[#1d2021]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#282828] border border-[#3c3836] rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-b border-[#3c3836] flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-[#fe8019] mr-2" />
            <span className="text-[#ebdbb2] font-medium">
              Challenge Onboarding
            </span>
          </div>
          <div className="text-[#a89984] text-sm">
            Step {step + 1} of {selectedChallengeId ? 4 : 7}
          </div>
        </div>

        <div ref={containerRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <div key={step}>{renderStepContent()}</div>
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
