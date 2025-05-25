"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
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
  Trophy,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Challenge, Dimension } from "@prisma/client"
import RadarChart from "./completion/challenge/radar-chart"
import DimensionProgressCard from "./completion/challenge/dimensions-progress"

export default function ChallengeCompletionFlow({
  completedChallenge,
  onComplete,
  predefinedChallenges,
  dimensions
}: {
  completedChallenge: {
    id: string
    title: string
    description: string
    duration: number
    difficulty: string
    tasks: any[]
  }
  onComplete: () => void
  predefinedChallenges: Challenge[];
  dimensions: Dimension[];
}) {
  const [step, setStep] = useState(0)
  const [selectedChallenge, setSelectedChallenge] = useState<(typeof predefinedChallenges)[0] | null>(null)
  const [customChallenge, setCustomChallenge] = useState({
    title: "",
    description: "",
    duration: 7,
    tasks: [] as { name: string; dimension: string; icon: any; color: string }[],
  })
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const confettiRef = useRef<HTMLDivElement>(null)
  const [showAllDimensions, setShowAllDimensions] = useState(false)

  const calculateDimensionProgress = () => {
    const previousValues: Record<string, number> = {
      salah: 35,
      quran: 42,
      charity: 28,
      community: 20,
      dhikr: 30,
      knowledge: 25,
      character: 38,
    }

    const dimensionImpacts: Record<string, { value: number; tasks: string[] }> = {}

    // Initialize with previous values
    dimensions.forEach((dim) => {
      dimensionImpacts[dim.id.toLowerCase()] = {
        value: previousValues[dim.id.toLowerCase()] || 0,
        tasks: [],
      }
    })

    // Add impact from each task
    completedChallenge.tasks.forEach((task) => {
      const dimensionId = task.dimension.toLowerCase()
      if (dimensionImpacts[dimensionId]) {
        // Add 5-15% growth per task
        const impact = Math.floor(Math.random() * 10) + 5
        dimensionImpacts[dimensionId].value += impact
        dimensionImpacts[dimensionId].tasks.push(task.name)
      }
    })

    // Cap values at 100%
    Object.keys(dimensionImpacts).forEach((key) => {
      dimensionImpacts[key].value = Math.min(dimensionImpacts[key].value, 100)
    })

    // Extract current values
    const currentValues: Record<string, number> = {}
    Object.keys(dimensionImpacts).forEach((key) => {
      currentValues[key] = dimensionImpacts[key].value
    })

    return { previousValues, currentValues, dimensionImpacts }
  }

  const { previousValues, currentValues, dimensionImpacts } = calculateDimensionProgress()

  // Get most improved dimensions (top 3)
  const getMostImprovedDimensions = () => {
    return Object.entries(dimensionImpacts)
      .map(([id, data]) => ({
        id,
        growth: data.value - (previousValues[id] || 0),
        tasks: data.tasks,
      }))
      .sort((a, b) => b.growth - a.growth)
      .slice(0, 3)
      .map((item) => ({
        dimension: dimensions.find((d) => d.id.toLowerCase() === item.id.toLowerCase())!,
        growth: item.growth,
        tasks: item.tasks,
      }))
  }

  const mostImprovedDimensions = getMostImprovedDimensions()

  // Trigger confetti on mount
  useEffect(() => {
    if (confettiRef.current && step === 0) {
      const rect = confettiRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      // First burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ["#fe8019", "#fabd2f", "#b8bb26", "#8ec07c", "#83a598", "#d3869b", "#fb4934"],
        gravity: 0.8,
        scalar: 1.2,
        shapes: ["circle", "square"],
        ticks: 200,
      })

      // Second burst after a delay
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { x: x / window.innerWidth, y: y / window.innerHeight },
          colors: ["#fe8019", "#fabd2f"],
          gravity: 0.6,
          scalar: 1.5,
          shapes: ["circle"],
        })
      }, 500)
    }
  }, [step])

  // Get icon and color for a dimension
  const getDimensionIconAndColor = (dimension: string) => {
    switch (dimension) {
      case "Salah":
        return { icon: PrayingHandsIcon, color: "#fb4934" }
      case "Quran":
        return { icon: BookOpen, color: "#8ec07c" }
      case "Charity":
        return { icon: Heart, color: "#fe8019" }
      case "Community":
        return { icon: Users, color: "#fabd2f" }
      case "Dhikr":
        return { icon: Moon, color: "#d3869b" }
      case "Knowledge":
        return { icon: Compass, color: "#fabd2f" }
      case "Character":
        return { icon: Sunrise, color: "#fb4934" }
      default:
        return { icon: Award, color: "#fe8019" }
    }
  }

  // Handle adding a custom task
  const handleAddTask = (task: { name: string; dimension: string }) => {
    const { icon, color } = getDimensionIconAndColor(task.dimension)
    setCustomChallenge({
      ...customChallenge,
      tasks: [...customChallenge.tasks, { ...task, icon, color }],
    })
    setShowTaskForm(false)
  }

  // Handle challenge start
  const handleStartChallenge = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 1500)
  }

  // Handle next step
  const handleNext = () => {
    if (step === 0) {
      // From celebration to dimension progress
      setStep(1)
    } else if (step === 1) {
      // From dimension progress to challenge selection
      setStep(2)
    } else if (step === 2 && !selectedChallenge) {
      // If no challenge selected, go to custom challenge creation
      setStep(5)
    } else if (step === 4 || step === 7) {
      // If on summary step, finish flow
      handleStartChallenge()
    } else {
      // Otherwise, go to next step
      setStep(step + 1)
    }
  }

  // Handle back step
  const handleBack = () => {
    if (step === 5) {
      // If on custom challenge creation, go back to challenge selection
      setStep(2)
    } else {
      // Otherwise, go to previous step
      setStep(Math.max(0, step - 1))
    }
  }

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 0: // Celebration
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 text-center"
            ref={confettiRef}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[#fe8019] to-[#fabd2f] flex items-center justify-center mb-4"
            >
              <Trophy className="h-10 w-10 text-[#1d2021]" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#ebdbb2]">Challenge Completed!</h2>
            <p className="text-[#a89984]">
              Congratulations! You've successfully completed the {completedChallenge.title} challenge.
            </p>

            <div className="relative">
              {/* Background particles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <Particle key={i} color="#fe8019" speed={1.5} />
              ))}

              <div className="relative z-10 bg-[#1d2021] rounded-lg p-6 border border-[#3c3836]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#fe8019]" />
                    <span className="text-[#ebdbb2] font-medium">{completedChallenge.title}</span>
                  </div>
                  <Badge className="bg-[#fe8019] text-[#1d2021]">Completed</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a89984]">Duration</span>
                    <span className="text-[#ebdbb2]">{completedChallenge.duration} days</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#a89984]">Tasks Completed</span>
                    <motion.span
                      className="text-[#ebdbb2]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <AnimatedCounter value={completedChallenge.tasks.length} />/{completedChallenge.tasks.length}
                    </motion.span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#a89984]">Spiritual Growth</span>
                    <motion.span
                      className="text-[#fe8019]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      +<AnimatedCounter value={15} />%
                    </motion.span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#a89984]">Experience Gained</span>
                    <motion.span
                      className="text-[#ebdbb2]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      +<AnimatedCounter value={500} /> XP
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-center gap-3 p-3 bg-[#282828] rounded-lg border border-[#3c3836]"
              >
                <div className="h-8 w-8 rounded-full bg-[#fe8019] flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-[#1d2021]" />
                </div>
                <div>
                  <div className="text-[#ebdbb2]">Achievement Unlocked</div>
                  <div className="text-xs text-[#a89984]">Challenge Master</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="flex items-center gap-3 p-3 bg-[#282828] rounded-lg border border-[#3c3836]"
              >
                <div className="h-8 w-8 rounded-full bg-[#8ec07c] flex items-center justify-center">
                  <Star className="h-4 w-4 text-[#1d2021]" />
                </div>
                <div>
                  <div className="text-[#ebdbb2]">Streak Bonus</div>
                  <div className="text-xs text-[#a89984]">+3 days added to your streak</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )

      case 1: // Dimension Progress
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">Spiritual Growth</h2>
              <p className="text-[#a89984]">See how your dimensions have grown during this challenge</p>
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
                <h3 className="text-[#ebdbb2] font-medium">Most Improved Dimensions</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#a89984] hover:text-[#fe8019] hover:bg-transparent"
                  onClick={() => setShowAllDimensions(!showAllDimensions)}
                >
                  {showAllDimensions ? "Show Top 3" : "Show All"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(showAllDimensions
                  ? dimensions.map((dim) => ({
                      dimension: dim,
                      previousValue: previousValues[dim.id.toLowerCase()] || 0,
                      currentValue: currentValues[dim.id.toLowerCase()] || 0,
                      tasksContributed: dimensionImpacts[dim.id.toLowerCase()]?.tasks || [],
                    }))
                  : mostImprovedDimensions.map(({ dimension, tasks }) => ({
                      dimension,
                      previousValue: previousValues[dimension.id.toLowerCase()] || 0,
                      currentValue: currentValues[dimension.id.toLowerCase()] || 0,
                      tasksContributed: tasks,
                    }))
                ).map((item, i) => (
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
              <p>Your spiritual journey continues. Choose a new challenge to keep growing in all dimensions.</p>
            </div>
          </motion.div>
        )

      case 2: // Choose next challenge
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">Choose Your Next Challenge</h2>
              <p className="text-[#a89984]">Select a pre-designed challenge or create your own</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {predefinedChallenges.map((challenge, i) => (
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
                onClick={() => setStep(5)} // Skip to custom challenge creation
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Challenge
              </Button>
            </motion.div>
          </motion.div>
        )

      case 3: // Challenge details
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
                  <h2 className="text-xl font-bold text-[#ebdbb2]">{selectedChallenge.title}</h2>
                  <p className="text-[#a89984]">{selectedChallenge.description}</p>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                  <Badge className="bg-[#3c3836] text-[#ebdbb2]">{selectedChallenge.duration} days</Badge>
                  <Badge className="bg-[#3c3836] text-[#ebdbb2]">{selectedChallenge.difficulty}</Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[#ebdbb2] font-medium">Challenge Tasks</h3>
                  <div className="space-y-2">
                    {selectedChallenge.tasks.map((task, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-md bg-[#1d2021] border border-[#3c3836]"
                      >
                        <div className="flex items-center">
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                            style={{ backgroundColor: task.color }}
                          >
                            <task.icon className="h-4 w-4 text-[#1d2021]" />
                          </div>
                          <div>
                            <span className="text-[#ebdbb2]">{task.name}</span>
                            <div className="text-xs text-[#a89984] mt-1">Impacts: {task.dimension}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-[#a89984]">
                  <p>
                    Complete these tasks daily to progress in your spiritual journey. You can always modify your
                    challenge later.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )

      case 4: // Challenge summary
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
                  <h2 className="text-xl font-bold text-[#ebdbb2]">Ready to Begin</h2>
                  <p className="text-[#a89984]">You're all set to start your new challenge</p>
                </div>

                <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
                  <h3 className="text-[#ebdbb2] font-medium mb-2">{selectedChallenge.title}</h3>
                  <div className="text-sm text-[#a89984] mb-3">{selectedChallenge.description}</div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    <Badge className="bg-[#3c3836] text-[#ebdbb2]">{selectedChallenge.duration} days</Badge>
                    <Badge className="bg-[#3c3836] text-[#ebdbb2]">{selectedChallenge.tasks.length} tasks</Badge>
                  </div>

                  <div className="space-y-2">
                    {selectedChallenge.tasks.map((task, i) => (
                      <div key={i} className="flex items-center">
                        <div className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: task.color }}></div>
                        <span className="text-sm text-[#ebdbb2]">{task.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-[#a89984]">
                  <p>
                    Your challenge will begin today. Complete tasks daily to build your streak and grow spiritually.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )

      case 5: // Custom challenge - basic info
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">Create Your Challenge</h2>
              <p className="text-[#a89984]">Design a custom challenge tailored to your needs</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-[#a89984]">Challenge Name</label>
                <Input
                  value={customChallenge.title}
                  onChange={(e) => setCustomChallenge({ ...customChallenge, title: e.target.value })}
                  placeholder="Enter challenge name"
                  className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-[#fe8019]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#a89984]">Description</label>
                <Textarea
                  value={customChallenge.description}
                  onChange={(e) => setCustomChallenge({ ...customChallenge, description: e.target.value })}
                  placeholder="What is this challenge about?"
                  className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-[#fe8019]"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#a89984]">Duration (days)</label>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  {[7, 14, 21, 30].map((days) => (
                    <Badge
                      key={days}
                      className={cn(
                        "cursor-pointer transition-all",
                        customChallenge.duration === days
                          ? "bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
                          : "bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945]",
                      )}
                      onClick={() => setCustomChallenge({ ...customChallenge, duration: days })}
                    >
                      {days} days
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 6: // Custom challenge - add tasks
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#ebdbb2]">Add Challenge Tasks</h2>
              <p className="text-[#a89984]">Create tasks to complete daily during your challenge</p>
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
                          <span className="text-[#ebdbb2] text-sm sm:text-base">{task.name}</span>
                          <div className="text-xs text-[#a89984] mt-1">{task.dimension}</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-[#a89984] hover:text-[#fb4934] hover:bg-transparent flex-shrink-0"
                        onClick={() => {
                          setCustomChallenge({
                            ...customChallenge,
                            tasks: customChallenge.tasks.filter((_, index) => index !== i),
                          })
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
                  <p className="text-xs text-[#a89984] mt-1">Add tasks to complete during your challenge</p>
                </div>
              )}

              <AnimatePresence>
                {showTaskForm ? (
                  <CustomTaskForm onAdd={handleAddTask} onCancel={() => setShowTaskForm(false)} />
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
              <p>Add at least 3 tasks to create a balanced challenge. Tasks should be achievable daily.</p>
            </div>
          </motion.div>
        )

      case 7: // Custom challenge summary
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
              <h2 className="text-xl font-bold text-[#ebdbb2]">Challenge Created</h2>
              <p className="text-[#a89984]">You're ready to begin your custom challenge</p>
            </div>

            <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
              <h3 className="text-[#ebdbb2] font-medium mb-2">{customChallenge.title || "Untitled Challenge"}</h3>
              <div className="text-sm text-[#a89984] mb-3">
                {customChallenge.description || "No description provided"}
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge className="bg-[#3c3836] text-[#ebdbb2]">{customChallenge.duration} days</Badge>
                <Badge className="bg-[#3c3836] text-[#ebdbb2]">{customChallenge.tasks.length} tasks</Badge>
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
              <p>Your challenge will begin today. Complete tasks daily to build your streak and grow spiritually.</p>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  // Determine if next button should be disabled
  const isNextDisabled = () => {
    switch (step) {
      case 2: // Choose challenge
        return !selectedChallenge && step !== 5
      case 5: // Custom challenge - basic info
        return !customChallenge.title.trim()
      case 6: // Custom challenge - add tasks
        return customChallenge.tasks.length === 0
      default:
        return false
    }
  }

  // Determine if finish button should be shown
  const showFinishButton = () => {
    return (step === 4 && selectedChallenge) || step === 7
  }

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
            <span className="text-[#ebdbb2] font-medium">Challenge Journey</span>
          </div>
          <div className="text-[#a89984] text-sm">
            Step {step + 1} of {step <= 1 ? 3 : selectedChallenge || step > 4 ? 8 : 5}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
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
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2 h-4 w-4"
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
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </motion.div>
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
  )
}
