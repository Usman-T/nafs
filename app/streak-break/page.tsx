"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Flame,
  X,
  Calendar,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  TrendingDown,
  Award,
  BookOpen,
  Users,
  Moon,
  Sunrise,
  Compass,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

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
  )
}

// Broken flame component
const BrokenFlame = ({ animate = false }: { animate?: boolean }) => {
  return (
    <div className="relative">
      {/* Main flame */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={
          animate
            ? {
                scale: [1, 1.1, 0.8, 0.9, 0.7, 0.8, 0.6, 0.4, 0.2, 0],
                opacity: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.1, 0],
                rotate: [0, -2, 2, -1, 1, -3, 2, -1, 0, 0],
              }
            : { scale: 0.6, opacity: 0.3 }
        }
        transition={{ duration: animate ? 3 : 0.5, ease: "easeOut" }}
        className="relative"
      >
        <Flame className="h-32 w-32 text-[#fe8019]" />
      </motion.div>

      {/* Crack overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: animate ? 2 : 0, duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          className="absolute inset-0"
          style={{ filter: "drop-shadow(0 0 8px rgba(251, 73, 52, 0.5))" }}
        >
          <motion.path
            d="M64 20 L68 45 L60 70 L65 95 L64 108"
            stroke="#fb4934"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: animate ? 2.2 : 0.2, duration: animate ? 1.2 : 0.5, ease: "easeOut" }}
          />
          <motion.path
            d="M45 35 L55 50 L50 65"
            stroke="#fb4934"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: animate ? 2.8 : 0.4, duration: animate ? 0.8 : 0.3, ease: "easeOut" }}
          />
          <motion.path
            d="M80 40 L75 55 L78 70"
            stroke="#fb4934"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: animate ? 3.2 : 0.6, duration: animate ? 0.8 : 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      {/* Ember particles */}
      {animate &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#fe8019] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 0.6, 0.4, 0],
              scale: [0, 1, 0.8, 0.6, 0.4, 0],
              x: (Math.random() - 0.5) * 100,
              y: Math.random() * 80 + 20,
            }}
            transition={{
              delay: 2.5 + i * 0.1,
              duration: 2,
              ease: "easeOut",
            }}
            style={{
              left: `${45 + Math.random() * 20}%`,
              top: `${40 + Math.random() * 30}%`,
            }}
          />
        ))}
    </div>
  )
}

// Rolling counter component
const RollingCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(12)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = 12
    const endValue = value

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(startValue - (startValue - endValue) * easeOut)

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <motion.div
      key={displayValue}
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      className="text-6xl font-bold text-[#ebdbb2] tabular-nums"
    >
      {displayValue}
    </motion.div>
  )
}

// Radar Chart Component
const RadarChart = ({
  dimensions,
  previousValues,
  currentValues,
  animate = true,
}: {
  dimensions: any[]
  previousValues: Record<string, number>
  currentValues: Record<string, number>
  animate?: boolean
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(animate ? 0 : 1)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = Math.min(canvas.width, 300)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = size * 0.35

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#0d1117"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const sides = dimensions.length
    const angleStep = (Math.PI * 2) / sides

    // Draw grid
    ctx.strokeStyle = "#3c3836"
    ctx.lineWidth = 1

    for (let i = 1; i <= 5; i++) {
      const circleRadius = (radius * i) / 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()

      const labelRadius = radius * 1.15
      const labelX = centerX + Math.cos(angle) * labelRadius
      const labelY = centerY + Math.sin(angle) * labelRadius

      ctx.fillStyle = dimensions[i].color
      ctx.font = "11px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(dimensions[i].name, labelX, labelY)
    }

    // Draw previous values (faded)
    if (Object.keys(previousValues).length > 0) {
      ctx.beginPath()
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = previousValues[dimensions[i].name.toLowerCase()] || 0
        const pointRadius = (radius * value) / 100
        const x = centerX + Math.cos(angle) * pointRadius
        const y = centerY + Math.sin(angle) * pointRadius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fillStyle = "rgba(235, 219, 178, 0.1)"
      ctx.fill()
      ctx.strokeStyle = "rgba(235, 219, 178, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw current values with animation
    if (Object.keys(currentValues).length > 0) {
      ctx.beginPath()
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2
        const prevValue = previousValues[dimensions[i].name.toLowerCase()] || 0
        const currentValue = currentValues[dimensions[i].name.toLowerCase()] || 0
        const animatedValue = prevValue + (currentValue - prevValue) * animationProgress
        const pointRadius = (radius * animatedValue) / 100
        const x = centerX + Math.cos(angle) * pointRadius
        const y = centerY + Math.sin(angle) * pointRadius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fillStyle = "rgba(254, 128, 25, 0.2)"
      ctx.fill()
      ctx.strokeStyle = "#fe8019"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw points
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2
        const prevValue = previousValues[dimensions[i].name.toLowerCase()] || 0
        const currentValue = currentValues[dimensions[i].name.toLowerCase()] || 0
        const animatedValue = prevValue + (currentValue - prevValue) * animationProgress
        const pointRadius = (radius * animatedValue) / 100
        const x = centerX + Math.cos(angle) * pointRadius
        const y = centerY + Math.sin(angle) * pointRadius

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = dimensions[i].color
        ctx.fill()
        ctx.strokeStyle = "#0d1117"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }, [dimensions, previousValues, currentValues, animationProgress])

  useEffect(() => {
    if (!animate) return

    let startTime: number | null = null
    let animationFrame: number

    const animateRadar = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const duration = 2000
      const progress = Math.min(elapsed / duration, 1)

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      setAnimationProgress(easeOutCubic(progress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateRadar)
      }
    }

    animationFrame = requestAnimationFrame(animateRadar)
    return () => cancelAnimationFrame(animationFrame)
  }, [animate])

  return <canvas ref={canvasRef} width={300} height={300} className="w-full max-w-[300px] h-auto mx-auto" />
}

// Challenge card component
const ChallengeCard = ({
  challenge,
  isSelected = false,
  onSelect,
}: {
  challenge: any
  isSelected?: boolean
  onSelect: () => void
}) => {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card
        className={cn(
          "bg-[#1d2021] border transition-all duration-300 cursor-pointer",
          isSelected ? "border-[#fe8019] ring-1 ring-[#fe8019]/20" : "border-[#3c3836] hover:border-[#504945]",
        )}
        onClick={onSelect}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-[#ebdbb2] text-lg">
            <Award className="h-5 w-5 text-[#fe8019] mr-2" />
            {challenge.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-[#a89984] leading-relaxed">{challenge.description}</p>
          <div className="flex gap-2">
            <Badge className="bg-[#3c3836] text-[#ebdbb2]">{challenge.duration} days</Badge>
            <Badge
              className={cn(
                challenge.difficulty === "Easy"
                  ? "bg-[#8ec07c]/20 text-[#8ec07c]"
                  : challenge.difficulty === "Medium"
                    ? "bg-[#fabd2f]/20 text-[#fabd2f]"
                    : "bg-[#fb4934]/20 text-[#fb4934]",
              )}
            >
              {challenge.difficulty}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function StreakBrokenPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customChallenge, setCustomChallenge] = useState({
    title: "",
    description: "",
    duration: 7,
    tasks: [] as any[],
  })
  const [isExiting, setIsExiting] = useState(false)

  // Mock data
  const missedDay = 4
  const challengeName = "Ramadan Preparation"
  const previousStreak = 12

  const mockMissedTasks = [
    {
      id: 1,
      name: "Morning Fajr Prayer",
      dimension: "Salah",
      icon: PrayingHandsIcon,
      color: "#fb4934",
    },
    {
      id: 2,
      name: "Read 2 pages of Quran",
      dimension: "Quran",
      icon: BookOpen,
      color: "#8ec07c",
    },
    {
      id: 3,
      name: "Give charity to someone",
      dimension: "Charity",
      icon: Heart,
      color: "#fe8019",
    },
  ]

  const mockCurrentChallenge = {
    id: "ramadan-prep",
    title: "Ramadan Preparation",
    description: "Get ready for the blessed month",
    duration: 30,
  }

  // Spiritual dimensions data
  const spiritualDimensions = [
    { id: "salah", name: "Salah", color: "#fb4934", icon: PrayingHandsIcon },
    { id: "quran", name: "Quran", color: "#8ec07c", icon: BookOpen },
    { id: "charity", name: "Charity", color: "#fe8019", icon: Heart },
    { id: "community", name: "Community", color: "#fabd2f", icon: Users },
    { id: "dhikr", name: "Dhikr", color: "#d3869b", icon: Moon },
    { id: "knowledge", name: "Knowledge", color: "#83a598", icon: Compass },
    { id: "character", name: "Character", color: "#b8bb26", icon: Sunrise },
  ]

  // Predefined challenges
  const predefinedChallenges = [
    {
      id: "fresh-start",
      title: "Fresh Start",
      description: "A gentle 7-day challenge to rebuild your momentum",
      duration: 7,
      difficulty: "Easy",
      tasks: [
        { name: "Pray Fajr on time", dimension: "Salah", icon: PrayingHandsIcon, color: "#fb4934" },
        { name: "Read 1 page of Quran", dimension: "Quran", icon: BookOpen, color: "#8ec07c" },
        { name: "Make dua for 5 minutes", dimension: "Dhikr", icon: Moon, color: "#d3869b" },
      ],
    },
    {
      id: "spiritual-reset",
      title: "Spiritual Reset",
      description: "14 days to reconnect with your spiritual core",
      duration: 14,
      difficulty: "Medium",
      tasks: [
        { name: "Complete all 5 daily prayers", dimension: "Salah", icon: PrayingHandsIcon, color: "#fb4934" },
        { name: "Read 3 pages of Quran", dimension: "Quran", icon: BookOpen, color: "#8ec07c" },
        { name: "Give charity or help someone", dimension: "Charity", icon: Heart, color: "#fe8019" },
        { name: "Attend community prayer", dimension: "Community", icon: Users, color: "#fabd2f" },
      ],
    },
    {
      id: "comeback-strong",
      title: "Comeback Strong",
      description: "21 days of intensive spiritual rebuilding",
      duration: 21,
      difficulty: "Hard",
      tasks: [
        { name: "Pray all Sunnah prayers", dimension: "Salah", icon: PrayingHandsIcon, color: "#fb4934" },
        { name: "Read 5 pages with reflection", dimension: "Quran", icon: BookOpen, color: "#8ec07c" },
        { name: "Daily charity or good deed", dimension: "Charity", icon: Heart, color: "#fe8019" },
        { name: "Learn something new about Islam", dimension: "Knowledge", icon: Compass, color: "#83a598" },
        { name: "Practice patience & kindness", dimension: "Character", icon: Sunrise, color: "#b8bb26" },
      ],
    },
  ]

  // Calculate dimension impacts
  const calculateDimensionImpacts = () => {
    const previousValues: Record<string, number> = {
      salah: 75,
      quran: 60,
      charity: 65,
      community: 45,
      dhikr: 70,
      knowledge: 55,
      character: 80,
    }

    const currentValues = { ...previousValues }
    mockMissedTasks.forEach((task) => {
      const dimensionKey = task.dimension.toLowerCase()
      if (currentValues[dimensionKey]) {
        currentValues[dimensionKey] = Math.max(0, currentValues[dimensionKey] - 10)
      }
    })

    return { previousValues, currentValues }
  }

  const { previousValues, currentValues } = calculateDimensionImpacts()

  const consequences = [
    {
      icon: <X className="h-6 w-6 text-[#fb4934]" />,
      text: "Streak reset to 0 days",
      delay: 0.5,
    },
    {
      icon: <Heart className="h-6 w-6 text-[#fb4934]" />,
      text: "Missed spiritual reflection",
      delay: 1.0,
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#fb4934]" />,
      text: "Challenge progress paused",
      delay: 1.5,
    },
  ]

  const handleNext = () => {
    if (step === 3 && selectedChallenge) {
      handleComplete()
    } else if (step === 4 && customChallenge.title && customChallenge.tasks.length > 0) {
      handleComplete()
    } else if (step === 3 && showCustomForm) {
      setStep(4)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step === 4) {
      setShowCustomForm(false)
      setStep(3)
    } else {
      setStep(Math.max(0, step - 1))
    }
  }

  const handleComplete = () => {
    setIsExiting(true)
    setTimeout(() => {
      localStorage.setItem("currentStreak", "0")
      localStorage.setItem("streakBroken", "true")
      router.push("/dashboard/challenges")
    }, 2000)
  }

  const canGoNext = () => {
    if (step === 0 || step === 1 || step === 2) return true
    if (step === 3) return selectedChallenge !== null || showCustomForm
    if (step === 4) return customChallenge.title.trim() && customChallenge.tasks.length > 0
    return true
  }

  const addCustomTask = () => {
    const newTask = {
      name: "",
      dimension: "Salah",
      icon: PrayingHandsIcon,
      color: "#fb4934",
    }
    setCustomChallenge({
      ...customChallenge,
      tasks: [...customChallenge.tasks, newTask],
    })
  }

  const updateCustomTask = (index: number, field: string, value: string) => {
    const updatedTasks = [...customChallenge.tasks]
    updatedTasks[index] = { ...updatedTasks[index], [field]: value }
    setCustomChallenge({ ...customChallenge, tasks: updatedTasks })
  }

  const removeCustomTask = (index: number) => {
    const updatedTasks = customChallenge.tasks.filter((_, i) => i !== index)
    setCustomChallenge({ ...customChallenge, tasks: updatedTasks })
  }

  const renderStepContent = () => {
    switch (step) {
      case 0: // Streak broken notification
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 px-6 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto h-20 w-20 rounded-full bg-[#fb4934] flex items-center justify-center"
            >
              <X className="h-10 w-10 text-[#1d2021]" />
            </motion.div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-[#ebdbb2]">Streak Broken</h1>
              <p className="text-[#a89984] text-lg">
                You missed Day {missedDay} of your {challengeName} challenge
              </p>
            </div>
          </motion.div>
        )

      case 1: // Streak countdown
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 px-6 py-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#ebdbb2]">Your Streak</h2>
              <p className="text-[#a89984] text-lg">Resetting to zero</p>
            </div>

            <div className="bg-[#0d1117] rounded-2xl p-8 border border-[#3c3836]">
              <div className="flex items-center justify-center gap-6">
                <BrokenFlame animate={true} />
                <div className="text-center">
                  <RollingCounter value={0} duration={3000} />
                  <div className="text-[#a89984] text-lg mt-2">days</div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 2: // Tasks and dimension impact
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 px-6 py-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-[#ebdbb2]">Impact Assessment</h2>
              <p className="text-[#a89984] text-lg">Here's how your missed tasks affected your spiritual dimensions</p>
            </div>

            <div className="space-y-4">
              {mockMissedTasks.map((task, i) => {
                const IconComponent = task.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#3c3836]"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-12 w-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: task.color }}
                      >
                        <IconComponent className="h-6 w-6 text-[#1d2021]" />
                      </div>
                      <div>
                        <div className="text-[#ebdbb2] font-medium">{task.name}</div>
                        <div className="text-[#a89984] text-sm">{task.dimension}</div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 400 }}
                      className="flex items-center gap-1 text-[#fb4934] bg-[#fb4934]/10 px-3 py-1 rounded-full"
                    >
                      <TrendingDown className="h-4 w-4" />
                      <span className="font-medium">-10</span>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            <div className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
              <RadarChart
                dimensions={spiritualDimensions}
                previousValues={previousValues}
                currentValues={currentValues}
                animate={true}
              />
            </div>
          </motion.div>
        )

      case 3: // Challenge selection
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 px-6 py-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-[#ebdbb2]">Choose Your Path</h2>
              <p className="text-[#a89984] text-lg">How would you like to rebuild your momentum?</p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-[#0d1117] rounded-lg border border-[#3c3836]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#ebdbb2] font-medium">Continue Current Challenge</div>
                    <div className="text-[#a89984] text-sm">{mockCurrentChallenge.title}</div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#fe8019] text-[#fe8019] hover:bg-[#fe8019] hover:text-[#1d2021] bg-transparent"
                    onClick={() => {
                      setSelectedChallenge(mockCurrentChallenge)
                      setShowCustomForm(false)
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>

              <div className="text-center text-[#a89984] text-sm">or choose a new challenge</div>

              <div className="space-y-3">
                {predefinedChallenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <ChallengeCard
                      challenge={challenge}
                      isSelected={selectedChallenge?.id === challenge.id}
                      onSelect={() => {
                        setSelectedChallenge(challenge)
                        setShowCustomForm(false)
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full border-dashed transition-all duration-300 bg-transparent",
                    showCustomForm
                      ? "border-[#fe8019] text-[#fe8019] bg-[#fe8019]/5"
                      : "border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019]",
                  )}
                  onClick={() => {
                    setShowCustomForm(true)
                    setSelectedChallenge(null)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Challenge
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )

      case 4: // Custom challenge creation
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 px-6 py-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-[#ebdbb2]">Create Your Challenge</h2>
              <p className="text-[#a89984] text-lg">Design a custom recovery challenge</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[#a89984] text-sm font-medium">Challenge Name</label>
                <Input
                  value={customChallenge.title}
                  onChange={(e) => setCustomChallenge({ ...customChallenge, title: e.target.value })}
                  placeholder="Enter challenge name"
                  className="bg-[#0d1117] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#a89984] text-sm font-medium">Description</label>
                <Textarea
                  value={customChallenge.description}
                  onChange={(e) => setCustomChallenge({ ...customChallenge, description: e.target.value })}
                  placeholder="What is this challenge about?"
                  className="bg-[#0d1117] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019]"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#a89984] text-sm font-medium">Duration</label>
                <div className="flex gap-2">
                  {[7, 14, 21, 30].map((duration) => (
                    <Button
                      key={duration}
                      variant="outline"
                      className={cn(
                        "bg-transparent",
                        customChallenge.duration === duration
                          ? "border-[#fe8019] text-[#fe8019]"
                          : "border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019]",
                      )}
                      onClick={() => setCustomChallenge({ ...customChallenge, duration })}
                    >
                      {duration} days
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#ebdbb2]">Tasks</h3>
                {customChallenge.tasks.map((task, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <Input
                      value={task.name}
                      onChange={(e) => updateCustomTask(i, "name", e.target.value)}
                      placeholder="Task name"
                      className="bg-[#0d1117] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019]"
                    />
                    <Button
                      variant="outline"
                      className="border-[#fe8019] text-[#fe8019] hover:bg-[#fe8019] hover:text-[#1d2021] bg-transparent"
                      onClick={() => removeCustomTask(i)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-dashed transition-all duration-300 bg-transparent border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019]"
                  onClick={addCustomTask}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl space-y-8"
          >
            {renderStepContent()}
            <div className="flex justify-between">
              {step > 0 && (
                <Button variant="outline" className="bg-transparent" onClick={handleBack}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              {step < 4 && (
                <Button variant="outline" className="bg-transparent" onClick={handleNext} disabled={!canGoNext()}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              {step === 4 && (
                <Button variant="outline" className="bg-transparent" onClick={handleNext}>
                  Complete
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
