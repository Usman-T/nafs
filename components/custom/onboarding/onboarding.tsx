"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Plus,
  Award,
  BookOpen,
  Heart,
  Users,
  Moon,
  Sunrise,
  Compass,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Custom PrayingHands icon
function PrayingHandsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 11h3v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
      <path d="M15 7h3a1 1 0 0 1 1 1v7h-4" />
      <path d="M4.6 9a9 9 0 0 1 .4-2.8A1 1 0 0 1 6 5.5h12a1 1 0 0 1 1 .7 9 9 0 0 1 .4 2.8" />
      <path d="M7 5.5V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v.5" />
      <path d="M14 16v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

// Predefined challenges
const predefinedChallenges = [
  {
    id: "ramadan-readiness",
    title: "Ramadan Readiness",
    description: "Prepare spiritually and physically for the blessed month",
    duration: 30,
    difficulty: "Medium",
    tasks: [
      {
        name: "Fasting Monday & Thursday",
        dimension: "Salah",
        icon: PrayingHandsIcon,
        color: "#fb4934",
      },
      {
        name: "Read 5 pages of Quran",
        dimension: "Quran",
        icon: BookOpen,
        color: "#8ec07c",
      },
      {
        name: "Give charity today",
        dimension: "Charity",
        icon: Heart,
        color: "#fe8019",
      },
      {
        name: "Attend Islamic lecture",
        dimension: "Knowledge",
        icon: Compass,
        color: "#fabd2f",
      },
      {
        name: "Extra night prayers",
        dimension: "Dhikr",
        icon: Moon,
        color: "#d3869b",
      },
    ],
  },
  {
    id: "quran-connection",
    title: "Quran Connection",
    description: "Deepen your relationship with the Book of Allah",
    duration: 21,
    difficulty: "Easy",
    tasks: [
      {
        name: "Read 1 page with translation",
        dimension: "Quran",
        icon: BookOpen,
        color: "#8ec07c",
      },
      {
        name: "Memorize 3 new verses",
        dimension: "Quran",
        icon: BookOpen,
        color: "#8ec07c",
      },
      {
        name: "Review previously memorized verses",
        dimension: "Quran",
        icon: BookOpen,
        color: "#8ec07c",
      },
      {
        name: "Listen to Quran recitation",
        dimension: "Dhikr",
        icon: Moon,
        color: "#d3869b",
      },
      {
        name: "Share a verse with a friend",
        dimension: "Community",
        icon: Users,
        color: "#fabd2f",
      },
    ],
  },
  {
    id: "character-excellence",
    title: "Character Excellence",
    description: "Embody the prophetic character in daily interactions",
    duration: 14,
    difficulty: "Medium",
    tasks: [
      {
        name: "Practice patience in a difficult situation",
        dimension: "Character",
        icon: Sunrise,
        color: "#fb4934",
      },
      {
        name: "Express gratitude to someone",
        dimension: "Character",
        icon: Sunrise,
        color: "#fb4934",
      },
      {
        name: "Forgive someone who wronged you",
        dimension: "Character",
        icon: Sunrise,
        color: "#fb4934",
      },
      {
        name: "Help someone in need",
        dimension: "Charity",
        icon: Heart,
        color: "#fe8019",
      },
      {
        name: "Smile and spread positivity",
        dimension: "Community",
        icon: Users,
        color: "#fabd2f",
      },
    ],
  },
];

// Custom task component
const Task = ({
  task,
  isSelected = false,
  onClick,
}: {
  task: { name: string; dimension: string; icon: any; color: string };
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const IconComponent = task.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "flex items-center justify-between p-3 rounded-md border transition-all duration-200 cursor-pointer",
        isSelected
          ? "bg-[#1d2021] border-[#fe8019]"
          : "bg-[#1d2021] border-[#3c3836] hover:border-[#504945]"
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: task.color }}
        >
          <IconComponent className="h-4 w-4 text-[#1d2021]" />
        </div>
        <div>
          <span className="text-[#ebdbb2] text-sm sm:text-base">
            {task.name}
          </span>
          <div className="text-xs text-[#a89984] mt-1">{task.dimension}</div>
        </div>
      </div>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center flex-shrink-0"
        >
          <Check className="h-3 w-3 text-[#1d2021]" />
        </motion.div>
      )}
    </motion.div>
  );
};

// Challenge card component
const ChallengeCard = ({
  challenge,
  isSelected = false,
  onSelect,
}: {
  challenge: (typeof predefinedChallenges)[0];
  isSelected?: boolean;
  onSelect: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card
        className={cn(
          "bg-[#282828] border transition-all duration-300 h-full cursor-pointer overflow-hidden",
          isSelected
            ? "border-[#fe8019]"
            : "border-[#3c3836] hover:border-[#504945]"
        )}
        onClick={onSelect}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-[#ebdbb2] text-base sm:text-lg">
            <Award className="h-5 w-5 text-[#fe8019] mr-2 flex-shrink-0" />
            {challenge.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs sm:text-sm text-[#a89984]">
            {challenge.description}
          </p>

          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945] text-xs">
              {challenge.duration} days
            </Badge>
            <Badge className="bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945] text-xs">
              {challenge.difficulty}
            </Badge>
          </div>

          <div className="space-y-2">
            {challenge.tasks.slice(0, 3).map((task, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full flex-shrink-0 mr-2"
                  style={{ backgroundColor: task.color }}
                ></div>
                <span className="text-xs text-[#ebdbb2] truncate">
                  {task.name}
                </span>
              </div>
            ))}
            {challenge.tasks.length > 3 && (
              <div className="text-xs text-[#a89984]">
                +{challenge.tasks.length - 3} more tasks
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          {isSelected ? (
            <Button
              className="w-full bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
              size="sm"
            >
              Selected
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836] hover:text-[#fe8019]"
              size="sm"
            >
              Select Challenge
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Custom task form
const CustomTaskForm = ({
  onAdd,
  onCancel,
}: {
  onAdd: (task: { name: string; dimension: string }) => void;
  onCancel: () => void;
}) => {
  const [taskName, setTaskName] = useState("");
  const [dimension, setDimension] = useState("Salah");

  const dimensions = [
    "Salah",
    "Quran",
    "Charity",
    "Community",
    "Dhikr",
    "Knowledge",
    "Character",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 overflow-hidden"
    >
      <div className="space-y-2">
        <label className="text-sm text-[#a89984]">Task Name</label>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-[#fe8019]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-[#a89984]">Dimension</label>
        <div className="flex flex-wrap gap-2">
          {dimensions.map((dim) => (
            <Badge
              key={dim}
              className={cn(
                "cursor-pointer transition-all",
                dimension === dim
                  ? "bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
                  : "bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945]"
              )}
              onClick={() => setDimension(dim)}
            >
              {dim}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          className="flex-1 border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
          onClick={() => {
            if (taskName.trim()) {
              onAdd({ name: taskName, dimension });
              setTaskName("");
            }
          }}
          disabled={!taskName.trim()}
        >
          Add Task
        </Button>
      </div>
    </motion.div>
  );
};

// Main onboarding component
export default function ChallengeOnboarding() {
  const [step, setStep] = useState(0);
  const [selectedChallenge, setSelectedChallenge] = useState<
    (typeof predefinedChallenges)[0] | null
  >(null);
  const [customChallenge, setCustomChallenge] = useState({
    title: "",
    description: "",
    duration: 7,
    tasks: [] as {
      name: string;
      dimension: string;
      icon: any;
      color: string;
    }[],
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const onComplete = () => {
    console.log("completed onboarding");
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  // Get icon and color for a dimension
  const getDimensionIconAndColor = (dimension: string) => {
    switch (dimension) {
      case "Salah":
        return { icon: PrayingHandsIcon, color: "#fb4934" };
      case "Quran":
        return { icon: BookOpen, color: "#8ec07c" };
      case "Charity":
        return { icon: Heart, color: "#fe8019" };
      case "Community":
        return { icon: Users, color: "#fabd2f" };
      case "Dhikr":
        return { icon: Moon, color: "#d3869b" };
      case "Knowledge":
        return { icon: Compass, color: "#fabd2f" };
      case "Character":
        return { icon: Sunrise, color: "#fb4934" };
      default:
        return { icon: Award, color: "#fe8019" };
    }
  };

  // Handle adding a custom task
  const handleAddTask = (task: { name: string; dimension: string }) => {
    const { icon, color } = getDimensionIconAndColor(task.dimension);
    setCustomChallenge({
      ...customChallenge,
      tasks: [...customChallenge.tasks, { ...task, icon, color }],
    });
    setShowTaskForm(false);
  };

  // Handle task selection in step 3
  const toggleTaskSelection = (index: number) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter((i) => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  // Handle challenge start
  const handleStartChallenge = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 0: // Welcome
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
              <h2 className="text-2xl font-bold text-[#ebdbb2]">
                Welcome to Nafs
              </h2>
              <p className="text-[#a89984]">
                Let&apos;s start your spiritual growth journey with a challenge
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start"
              >
                <div className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="h-3 w-3 text-[#1d2021]" />
                </div>
                <div>
                  <span className="text-[#ebdbb2]">
                    Track your spiritual growth
                  </span>
                  <p className="text-sm text-[#a89984]">
                    Monitor progress across 7 spiritual dimensions
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start"
              >
                <div className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="h-3 w-3 text-[#1d2021]" />
                </div>
                <div>
                  <span className="text-[#ebdbb2]">
                    Build consistent habits
                  </span>
                  <p className="text-sm text-[#a89984]">
                    Develop routines that strengthen your faith
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start"
              >
                <div className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="h-3 w-3 text-[#1d2021]" />
                </div>
                <div>
                  <span className="text-[#ebdbb2]">Achieve your goals</span>
                  <p className="text-sm text-[#a89984]">
                    Complete challenges and earn achievements
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

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
                  isSelected={selectedChallenge?.id === challenge.id}
                  onSelect={() => setSelectedChallenge(challenge)}
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
                onClick={() => setStep(4)} // Skip to custom challenge creation
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Challenge
              </Button>
            </motion.div>
          </motion.div>
        );

      case 2: // Challenge details
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {selectedChallenge && (
              <>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-[#ebdbb2]">
                    {selectedChallenge.title}
                  </h2>
                  <p className="text-[#a89984]">
                    {selectedChallenge.description}
                  </p>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                  <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                    {selectedChallenge.duration} days
                  </Badge>
                  <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                    {selectedChallenge.difficulty}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[#ebdbb2] font-medium">
                    Challenge Tasks
                  </h3>
                  <div className="space-y-2">
                    {selectedChallenge.tasks.map((task, i) => (
                      <Task
                        key={i}
                        task={task}
                        isSelected={selectedTasks.includes(i)}
                        onClick={() => toggleTaskSelection(i)}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-sm text-[#a89984]">
                  <p>
                    Complete these tasks daily to progress in your spiritual
                    journey. You can always modify your challenge later.
                  </p>
                </div>
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
            {selectedChallenge && (
              <>
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
                    Ready to Begin
                  </h2>
                  <p className="text-[#a89984]">
                    You&apos;re all set to start your challenge
                  </p>
                </div>

                <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
                  <h3 className="text-[#ebdbb2] font-medium mb-2">
                    {selectedChallenge.title}
                  </h3>
                  <div className="text-sm text-[#a89984] mb-3">
                    {selectedChallenge.description}
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                      {selectedChallenge.duration} days
                    </Badge>
                    <Badge className="bg-[#3c3836] text-[#ebdbb2]">
                      {selectedTasks.length > 0
                        ? selectedTasks.length
                        : selectedChallenge.tasks.length}{" "}
                      tasks selected
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {selectedTasks.length > 0 ? (
                      selectedTasks.map((index) => (
                        <div key={index} className="flex items-center">
                          <div
                            className="h-4 w-4 rounded-full mr-2"
                            style={{
                              backgroundColor:
                                selectedChallenge.tasks[index].color,
                            }}
                          ></div>
                          <span className="text-sm text-[#ebdbb2]">
                            {selectedChallenge.tasks[index].name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-[#a89984]">
                        All tasks will be included
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm text-[#a89984]">
                  <p>
                    Your challenge will begin today. Complete tasks daily to
                    build your streak and grow spiritually.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        );

      case 4: // Custom challenge - basic info
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                Create Your Challenge
              </h2>
              <p className="text-[#a89984]">
                Design a custom challenge tailored to your needs
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-[#a89984]">Challenge Name</label>
                <Input
                  value={customChallenge.title}
                  onChange={(e) =>
                    setCustomChallenge({
                      ...customChallenge,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter challenge name"
                  className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-[#fe8019]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#a89984]">Description</label>
                <Textarea
                  value={customChallenge.description}
                  onChange={(e) =>
                    setCustomChallenge({
                      ...customChallenge,
                      description: e.target.value,
                    })
                  }
                  placeholder="What is this challenge about?"
                  className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-[#fe8019]"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#a89984]">
                  Duration (days)
                </label>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  {[7, 14, 21, 30].map((days) => (
                    <Badge
                      key={days}
                      className={cn(
                        "cursor-pointer transition-all",
                        customChallenge.duration === days
                          ? "bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
                          : "bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945]"
                      )}
                      onClick={() =>
                        setCustomChallenge({
                          ...customChallenge,
                          duration: days,
                        })
                      }
                    >
                      {days} days
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
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
                  {customChallenge.tasks.map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]"
                    >
                      <div className="flex items-center">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                          style={{ backgroundColor: task.color }}
                        >
                          <task.icon className="h-4 w-4 text-[#1d2021]" />
                        </div>
                        <div>
                          <span className="text-[#ebdbb2] text-sm sm:text-base">
                            {task.name}
                          </span>
                          <div className="text-xs text-[#a89984] mt-1">
                            {task.dimension}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </Button>
                    </div>
                  ))}
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

            <div className="text-sm text-[#a89984]">
              <p>
                Add at least 3 tasks to create a balanced challenge. Tasks
                should be achievable daily.
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
                      style={{ backgroundColor: task.color }}
                    ></div>
                    <span className="text-sm text-[#ebdbb2]">{task.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-[#a89984]">
              <p>
                Your challenge will begin today. Complete tasks daily to build
                your streak and grow spiritually.
              </p>
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
        return !selectedChallenge && step !== 4;
      case 4:
        return !customChallenge.title.trim();
      case 5:
        return customChallenge.tasks.length === 0;
      default:
        return false;
    }
  };

  // Determine if finish button should be shown
  const showFinishButton = () => {
    return (step === 3 && selectedChallenge) || step === 6;
  };

  // Handle next step
  const handleNext = () => {
    if (step === 1 && !selectedChallenge) {
      // If no challenge selected, go to custom challenge creation
      setStep(4);
    } else if (step === 3 || step === 6) {
      // If on summary step, finish onboarding
      handleStartChallenge();
    } else {
      // Otherwise, go to next step
      setStep(step + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    if (step === 4) {
      // If on custom challenge creation, go back to challenge selection
      setStep(1);
    } else {
      // Otherwise, go to previous step
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
            Step {step + 1} of {selectedChallenge ? 4 : 7}
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
