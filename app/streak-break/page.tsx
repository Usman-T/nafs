"use client"

import type React from "react"

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
  Clock,
  Target,
  Shield,
  Star,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  XCircle,
  Minus,
  Edit3,
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

// Animated background particles
const BackgroundParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#fe8019] rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Dramatic broken flame component
const BrokenFlame = ({ animate = false }: { animate?: boolean }) => {
  const [showCracks, setShowCracks] = useState(false)
  const [showEmbers, setShowEmbers] = useState(false)

  useEffect(() => {
    if (animate) {
      setTimeout(() => setShowCracks(true), 1000)
      setTimeout(() => setShowEmbers(true), 2000)
    } else {
      setShowCracks(true)
    }
  }, [animate])

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px rgba(254, 128, 25, 0.3)",
            "0 0 40px rgba(254, 128, 25, 0.5)",
            "0 0 20px rgba(254, 128, 25, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Main flame container */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Main flame */}
        <motion.div
          initial={{ scale: 1, opacity: 1, rotate: 0 }}
          animate={
            animate
              ? {
                  scale: [1, 1.1, 0.9, 1.05, 0.8, 0.9, 0.6, 0.4, 0.2, 0],
                  opacity: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.1, 0],
                  rotate: [0, -3, 3, -2, 2, -4, 3, -2, 0, 0],
                }
              : { scale: 0.3, opacity: 0.2, rotate: -5 }
          }
          transition={{ duration: animate ? 4 : 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <Flame className="h-32 w-32 text-[#fe8019] drop-shadow-lg" />
        </motion.div>

        {/* Crack overlay */}
        <AnimatePresence>
          {showCracks && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                className="absolute inset-0"
                style={{ filter: "drop-shadow(0 0 8px rgba(251, 73, 52, 0.8))" }}
              >
                {/* Main crack */}
                <motion.path
                  d="M64 15 L68 35 L62 55 L66 75 L60 95 L64 115"
                  stroke="#fb4934"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
                />
                {/* Side cracks */}
                <motion.path
                  d="M45 30 L55 45 L50 60 L58 75"
                  stroke="#fb4934"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                />
                <motion.path
                  d="M80 35 L75 50 L78 65 L70 80"
                  stroke="#fb4934"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                />
                {/* Small cracks */}
                <motion.path
                  d="M40 50 L48 58"
                  stroke="#fb4934"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                />
                <motion.path
                  d="M85 60 L78 68"
                  stroke="#fb4934"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ember particles */}
        <AnimatePresence>
          {showEmbers &&
            Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-[#fe8019] to-[#fb4934] rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0.6, 0.4, 0.2, 0],
                  scale: [0, 1, 0.8, 0.6, 0.4, 0.2, 0],
                  x: (Math.random() - 0.5) * 150,
                  y: Math.random() * 100 + 30,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  delay: i * 0.1,
                  duration: 3,
                  ease: "easeOut",
                }}
                style={{
                  left: `${45 + Math.random() * 20}%`,
                  top: `${40 + Math.random() * 30}%`,
                }}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Rolling counter with dramatic effect
const RollingCounter = ({ value, duration = 3000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(12)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const startTime = Date.now()
    const startValue = 12
    const endValue = value

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Dramatic easing with pause at certain numbers
      const easeOut = 1 - Math.pow(1 - progress, 4)
      let currentValue = Math.round(startValue - (startValue - endValue) * easeOut)

      // Add dramatic pauses
      if (progress > 0.3 && progress < 0.4 && currentValue > 5) {
        currentValue = 8
      } else if (progress > 0.6 && progress < 0.7 && currentValue > 2) {
        currentValue = 3
      }

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <div className="relative">
      <motion.div
        key={displayValue}
        initial={{ scale: 1.2, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-8xl font-black text-[#ebdbb2] tabular-nums relative z-10"
        style={{
          textShadow: "0 0 20px rgba(254, 128, 25, 0.5), 0 0 40px rgba(254, 128, 25, 0.3)",
        }}
      >
        {displayValue}
      </motion.div>
      {isAnimating && (
        <motion.div
          className="absolute inset-0 text-8xl font-black text-[#fb4934] tabular-nums opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {displayValue}
        </motion.div>
      )}
    </div>
  )
}

// Enhanced radar chart
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

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const size = Math.min(rect.width, rect.height)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = size * 0.35

    ctx.clearRect(0, 0, rect.width, rect.height)

    const sides = dimensions.length
    const angleStep = (Math.PI * 2) / sides

    // Draw background grid with glow
    ctx.strokeStyle = "#3c3836"
    ctx.lineWidth = 1
    ctx.shadowColor = "#fe8019"
    ctx.shadowBlur = 2

    for (let i = 1; i <= 5; i++) {
      const circleRadius = (radius * i) / 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.shadowBlur = 0

    // Draw axis lines
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()

      // Draw labels with better positioning
      const labelRadius = radius * 1.2
      const labelX = centerX + Math.cos(angle) * labelRadius
      const labelY = centerY + Math.sin(angle) * labelRadius

      ctx.fillStyle = dimensions[i].color
      ctx.font = "bold 12px system-ui"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.shadowColor = dimensions[i].color
      ctx.shadowBlur = 4
      ctx.fillText(dimensions[i].name, labelX, labelY)
      ctx.shadowBlur = 0
    }

    // Draw previous values (ghosted)
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
      ctx.fillStyle = "rgba(235, 219, 178, 0.15)"
      ctx.fill()
      ctx.strokeStyle = "rgba(235, 219, 178, 0.4)"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw current values with dramatic animation
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

      // Gradient fill
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, "rgba(254, 128, 25, 0.3)")
      gradient.addColorStop(1, "rgba(251, 73, 52, 0.1)")
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.strokeStyle = "#fe8019"
      ctx.lineWidth = 3
      ctx.shadowColor = "#fe8019"
      ctx.shadowBlur = 8
      ctx.stroke()
      ctx.shadowBlur = 0

      // Draw enhanced points
      for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2
        const prevValue = previousValues[dimensions[i].name.toLowerCase()] || 0
        const currentValue = currentValues[dimensions[i].name.toLowerCase()] || 0
        const animatedValue = prevValue + (currentValue - prevValue) * animationProgress
        const pointRadius = (radius * animatedValue) / 100
        const x = centerX + Math.cos(angle) * pointRadius
        const y = centerY + Math.sin(angle) * pointRadius

        // Outer glow
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = `${dimensions[i].color}20`
        ctx.fill()

        // Main point
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = dimensions[i].color
        ctx.fill()
        ctx.strokeStyle = "#1d2021"
        ctx.lineWidth = 2
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
      const duration = 2500
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

  return <canvas ref={canvasRef} className="w-full h-80 rounded-lg" style={{ width: "100%", height: "320px" }} />
}

// Enhanced challenge card
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
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-500 cursor-pointer group",
          "bg-gradient-to-br from-[#282828] to-[#1d2021] border-2",
          isSelected
            ? "border-[#fe8019] shadow-lg shadow-[#fe8019]/20 bg-gradient-to-br from-[#fe8019]/10 to-[#d65d0e]/5"
            : "border-[#3c3836] hover:border-[#fe8019]/50 hover:shadow-md hover:shadow-[#fe8019]/10",
        )}
        onClick={onSelect}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(45deg, rgba(254, 128, 25, 0.05), rgba(213, 93, 14, 0.05))",
          }}
        />

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 w-6 h-6 bg-[#fe8019] rounded-full flex items-center justify-center"
          >
            <CheckCircle className="h-4 w-4 text-[#1d2021]" />
          </motion.div>
        )}

        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="flex items-center text-[#ebdbb2] text-xl font-bold">
            <div className="p-2 bg-[#fe8019]/20 rounded-lg mr-3">
              <Award className="h-6 w-6 text-[#fe8019]" />
            </div>
            {challenge.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <p className="text-[#a89984] leading-relaxed text-base">{challenge.description}</p>

          <div className="flex items-center gap-3">
            <Badge className="bg-[#3c3836] text-[#ebdbb2] px-3 py-1 font-medium">
              <Clock className="h-3 w-3 mr-1" />
              {challenge.duration} days
            </Badge>
            <Badge
              className={cn(
                "px-3 py-1 font-medium",
                challenge.difficulty === "Easy"
                  ? "bg-[#8ec07c]/20 text-[#8ec07c] border border-[#8ec07c]/30"
                  : challenge.difficulty === "Medium"
                    ? "bg-[#fabd2f]/20 text-[#fabd2f] border border-[#fabd2f]/30"
                    : "bg-[#fb4934]/20 text-[#fb4934] border border-[#fb4934]/30",
              )}
            >
              <Target className="h-3 w-3 mr-1" />
              {challenge.difficulty}
            </Badge>
          </div>

          {/* Task preview */}
          {challenge.tasks && (
            <div className="space-y-2">
              <p className="text-[#a89984] text-sm font-medium">Includes:</p>
              <div className="flex flex-wrap gap-2">
                {challenge.tasks.slice(0, 3).map((task: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-[#3c3836]/50 px-2 py-1 rounded-md text-xs text-[#a89984]"
                  >
                    <task.icon className="h-3 w-3" style={{ color: task.color }} />
                    <span>{task.name}</span>
                  </div>
                ))}
                {challenge.tasks.length > 3 && (
                  <div className="flex items-center gap-1 bg-[#3c3836]/50 px-2 py-1 rounded-md text-xs text-[#a89984]">
                    <Plus className="h-3 w-3" />
                    <span>+{challenge.tasks.length - 3} more</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Enhanced consequence item
const ConsequenceItem = ({
  icon,
  text,
  delay,
  severity = "medium",
}: {
  icon: React.ReactNode
  text: string
  delay: number
  severity?: "low" | "medium" | "high"
}) => {
  const severityColors = {
    low: "text-[#fabd2f]",
    medium: "text-[#fe8019]",
    high: "text-[#fb4934]",
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      }}
      className="group"
    >
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#1d2021] to-[#282828] rounded-xl border border-[#3c3836] hover:border-[#fe8019]/30 transition-all duration-300">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: delay + 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          className={cn(
            "flex-shrink-0 p-3 rounded-full",
            severity === "high" ? "bg-[#fb4934]/20" : severity === "medium" ? "bg-[#fe8019]/20" : "bg-[#fabd2f]/20",
          )}
        >
          {icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.6 }}
          className="flex-1"
        >
          <span className={cn("text-lg font-medium", severityColors[severity])}>{text}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.7, duration: 0.4 }}
          className="text-[#a89984] text-sm opacity-60 group-hover:opacity-100 transition-opacity"
        >
          Impact
        </motion.div>
      </div>
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

  // Enhanced mock data
  const missedDay = 4
  const challengeName = "Ramadan Preparation Challenge"
  const previousStreak = 12
  const streakStartDate = "March 15, 2024"
  const totalDaysLost = 12

  const mockMissedTasks = [
    {
      id: 1,
      name: "Morning Fajr Prayer",
      dimension: "Salah",
      icon: PrayingHandsIcon,
      color: "#fb4934",
      timesMissed: 1,
    },
    {
      id: 2,
      name: "Read 2 pages of Quran",
      dimension: "Quran",
      icon: BookOpen,
      color: "#8ec07c",
      timesMissed: 1,
    },
    {
      id: 3,
      name: "Give charity to someone",
      dimension: "Charity",
      icon: Heart,
      color: "#fe8019",
      timesMissed: 1,
    },
    {
      id: 4,
      name: "Evening dhikr session",
      dimension: "Dhikr",
      icon: Moon,
      color: "#d3869b",
      timesMissed: 1,
    },
  ]

  const mockCurrentChallenge = {
    id: "ramadan-prep",
    title: "Ramadan Preparation",
    description: "Continue your spiritual preparation for the blessed month",
    duration: 30,
    difficulty: "Medium",
    currentDay: 4,
    tasksCompleted: 45,
    totalTasks: 120,
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

  // Enhanced predefined challenges
  const predefinedChallenges = [
    {
      id: "fresh-start",
      title: "Fresh Start",
      description: "A gentle 7-day challenge to rebuild your spiritual momentum with foundational practices",
      duration: 7,
      difficulty: "Easy",
      tasks: [
        { name: "Pray Fajr on time", dimension: "Salah", icon: PrayingHandsIcon, color: "#fb4934" },
        { name: "Read 1 page of Quran", dimension: "Quran", icon: BookOpen, color: "#8ec07c" },
        { name: "Make dua for 5 minutes", dimension: "Dhikr", icon: Moon, color: "#d3869b" },
      ],
      benefits: ["Rebuild consistency", "Gentle reentry", "Focus on basics"],
    },
    {
      id: "spiritual-reset",
      title: "Spiritual Reset",
      description: "14 days to reconnect with your spiritual core through comprehensive daily practices",
      duration: 14,
      difficulty: "Medium",
      tasks: [
        { name: "Complete all 5 daily prayers", dimension: "Salah", icon: PrayingHandsIcon, color: "#fb4934" },
        { name: "Read 3 pages of Quran", dimension: "Quran", icon: BookOpen, color: "#8ec07c" },
        { name: "Give charity or help someone", dimension: "Charity", icon: Heart, color: "#fe8019" },
        { name: "Attend community prayer", dimension: "Community", icon: Users, color: "#fabd2f" },
      ],
      benefits: ["Comprehensive growth", "Community connection", "Balanced approach"],
    },
    {
      id: "comeback-strong",
      title: "Comeback Strong",
      description: "21 days of intensive spiritual rebuilding for those ready to commit fully",
      duration: 21,
      difficulty: "Hard",
      tasks: [
        { name: "Pray all Sunnah prayers", dimension: "Salah", icon: PrayingHandsIcon, color: "#fb4934" },
        { name: "Read 5 pages with reflection", dimension: "Quran", icon: BookOpen, color: "#8ec07c" },
        { name: "Daily charity or good deed", dimension: "Charity", icon: Heart, color: "#fe8019" },
        { name: "Learn something new about Islam", dimension: "Knowledge", icon: Compass, color: "#83a598" },
        { name: "Practice patience & kindness", dimension: "Character", icon: Sunrise, color: "#b8bb26" },
      ],
      benefits: ["Maximum growth", "Complete transformation", "Elite commitment"],
    },
  ]

  // Calculate dimension impacts with more detail
  const calculateDimensionImpacts = () => {
    const previousValues: Record<string, number> = {
      salah: 85,
      quran: 78,
      charity: 72,
      community: 65,
      dhikr: 80,
      knowledge: 68,
      character: 88,
    }

    const currentValues = { ...previousValues }
    mockMissedTasks.forEach((task) => {
      const dimensionKey = task.dimension.toLowerCase()
      if (currentValues[dimensionKey]) {
        currentValues[dimensionKey] = Math.max(0, currentValues[dimensionKey] - 15)
      }
    })

    return { previousValues, currentValues }
  }

  const { previousValues, currentValues } = calculateDimensionImpacts()

  const consequences = [
    {
      icon: <XCircle className="h-7 w-7 text-[#fb4934]" />,
      text: `${totalDaysLost} days of progress lost`,
      delay: 0.5,
      severity: "high" as const,
    },
    {
      icon: <AlertTriangle className="h-7 w-7 text-[#fe8019]" />,
      text: "Spiritual momentum broken",
      delay: 1.0,
      severity: "high" as const,
    },
    {
      icon: <TrendingDown className="h-7 w-7 text-[#fe8019]" />,
      text: "4 spiritual dimensions affected",
      delay: 1.5,
      severity: "medium" as const,
    },
    {
      icon: <Calendar className="h-7 w-7 text-[#fabd2f]" />,
      text: "Challenge timeline extended",
      delay: 2.0,
      severity: "medium" as const,
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
      localStorage.setItem("selectedRecoveryChallenge", JSON.stringify(selectedChallenge || customChallenge))
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
    const dimensions = [
      { name: "Salah", icon: PrayingHandsIcon, color: "#fb4934" },
      { name: "Quran", icon: BookOpen, color: "#8ec07c" },
      { name: "Charity", icon: Heart, color: "#fe8019" },
      { name: "Community", icon: Users, color: "#fabd2f" },
      { name: "Dhikr", icon: Moon, color: "#d3869b" },
      { name: "Knowledge", icon: Compass, color: "#83a598" },
      { name: "Character", icon: Sunrise, color: "#b8bb26" },
    ]

    const randomDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
    const newTask = {
      name: "",
      dimension: randomDimension.name,
      icon: randomDimension.icon,
      color: randomDimension.color,
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
      case 0: // Dramatic streak broken notification
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-10 px-8 py-12"
          >
            {/* Broken icon with dramatic effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150, damping: 10 }}
              className="mx-auto relative"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(251, 73, 52, 0.4)",
                      "0 0 0 20px rgba(251, 73, 52, 0)",
                      "0 0 0 0 rgba(251, 73, 52, 0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#fb4934] to-[#cc241d] flex items-center justify-center shadow-2xl">
                  <X className="h-12 w-12 text-[#1d2021]" />
                </div>
              </div>
            </motion.div>

            {/* Dramatic headlines */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-5xl md:text-6xl font-black text-[#ebdbb2] tracking-tight"
                style={{
                  textShadow: "0 0 30px rgba(254, 128, 25, 0.3)",
                }}
              >
                Streak Broken
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="space-y-3"
              >
                <p className="text-2xl text-[#fe8019] font-bold">
                  Day {missedDay} of {challengeName}
                </p>
                <p className="text-lg text-[#a89984] max-w-md mx-auto leading-relaxed">
                  Your {previousStreak}-day journey that started on {streakStartDate} has come to an end.
                </p>
              </motion.div>
            </div>

            {/* Missed tasks summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="bg-gradient-to-br from-[#1d2021] to-[#282828] rounded-2xl p-6 border border-[#3c3836] max-w-md mx-auto"
            >
              <h3 className="text-[#ebdbb2] font-bold text-lg mb-4">Tasks Missed Yesterday</h3>
              <div className="space-y-3">
                {mockMissedTasks.map((task, i) => {
                  const IconComponent = task.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3 text-[#a89984]"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${task.color}20` }}
                      >
                        <IconComponent className="h-4 w-4" style={{ color: task.color }} />
                      </div>
                      <span className="text-sm">{task.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )

      case 1: // Dramatic streak countdown
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12 px-8 py-12"
          >
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl font-black text-[#ebdbb2]"
              >
                Your Streak
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-[#fe8019] font-medium"
              >
                Counting down to zero...
              </motion.p>
            </div>

            <div className="relative">
              {/* Background glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    "0 0 50px rgba(254, 128, 25, 0.2)",
                    "0 0 100px rgba(254, 128, 25, 0.4)",
                    "0 0 50px rgba(254, 128, 25, 0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="bg-gradient-to-br from-[#0d1117] via-[#1d2021] to-[#282828] rounded-3xl p-12 border-2 border-[#3c3836] relative z-10">
                <div className="flex items-center justify-center gap-12">
                  <BrokenFlame animate={true} />
                  <div className="text-center space-y-4">
                    <RollingCounter value={0} duration={4000} />
                    <div className="text-2xl text-[#a89984] font-medium">days</div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 4, duration: 0.8 }}
                      className="text-[#fb4934] text-lg font-bold"
                    >
                      RESET
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 0.8 }}
              className="text-[#a89984] text-lg max-w-lg mx-auto"
            >
              <p>
                {totalDaysLost} days of spiritual growth and {mockMissedTasks.length} daily practices have been
                interrupted.
              </p>
            </motion.div>
          </motion.div>
        )

      case 2: // Enhanced impact assessment
        return (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 px-8 py-12">
            <div className="text-center space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-[#ebdbb2]"
              >
                Impact Assessment
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[#a89984] max-w-2xl mx-auto"
              >
                Here's the full scope of how your missed day affected your spiritual journey
              </motion.p>
            </div>

            {/* Consequences list */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {consequences.map((consequence, i) => (
                <ConsequenceItem
                  key={i}
                  icon={consequence.icon}
                  text={consequence.text}
                  delay={consequence.delay}
                  severity={consequence.severity}
                />
              ))}
            </div>

            {/* Detailed missed tasks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="bg-gradient-to-br from-[#1d2021] to-[#282828] rounded-2xl p-8 border border-[#3c3836] max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-[#ebdbb2] mb-6 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-[#fe8019]" />
                Missed Tasks Breakdown
              </h3>
              <div className="grid gap-4">
                {mockMissedTasks.map((task, i) => {
                  const IconComponent = task.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.5 + i * 0.2, duration: 0.6 }}
                      className="flex items-center justify-between p-4 bg-[#0d1117] rounded-xl border border-[#3c3836]"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${task.color}20` }}
                        >
                          <IconComponent className="h-6 w-6" style={{ color: task.color }} />
                        </div>
                        <div>
                          <div className="text-[#ebdbb2] font-medium text-lg">{task.name}</div>
                          <div className="text-[#a89984] text-sm">{task.dimension} Practice</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#fb4934] font-bold text-lg">-15 pts</div>
                        <div className="text-[#a89984] text-xs">Dimension Impact</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Enhanced radar chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.5, duration: 0.8 }}
              className="bg-gradient-to-br from-[#1d2021] to-[#282828] rounded-2xl p-8 border border-[#3c3836] max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-[#ebdbb2] mb-6 text-center">Spiritual Dimensions Impact</h3>
              <RadarChart
                dimensions={spiritualDimensions}
                previousValues={previousValues}
                currentValues={currentValues}
                animate={true}
              />
              <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ebdbb2] opacity-40"></div>
                  <span className="text-[#a89984]">Before</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#fe8019]"></div>
                  <span className="text-[#a89984]">After</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )

      case 3: // Enhanced challenge selection
        return (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 px-8 py-12">
            <div className="text-center space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-[#ebdbb2]"
              >
                Choose Your Recovery Path
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[#a89984] max-w-2xl mx-auto"
              >
                Every setback is a setup for a comeback. How will you rebuild your spiritual momentum?
              </motion.p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Continue current challenge option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <Card
                  className={cn(
                    "relative overflow-hidden transition-all duration-500 cursor-pointer group",
                    "bg-gradient-to-br from-[#fe8019]/10 to-[#d65d0e]/5 border-2 border-[#fe8019]/30",
                    "hover:border-[#fe8019] hover:shadow-lg hover:shadow-[#fe8019]/20",
                  )}
                  onClick={() => {
                    setSelectedChallenge(mockCurrentChallenge)
                    setShowCustomForm(false)
                  }}
                >
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#fe8019] text-[#1d2021] font-bold">RECOMMENDED</Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-[#ebdbb2] text-2xl font-bold">
                      <div className="p-3 bg-[#fe8019]/20 rounded-xl mr-4">
                        <RotateCcw className="h-8 w-8 text-[#fe8019]" />
                      </div>
                      Continue Current Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[#a89984] text-lg leading-relaxed">
                      Resume "{mockCurrentChallenge.title}" from where you left off. Your progress will be preserved.
                    </p>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-[#3c3836] text-[#ebdbb2] px-3 py-1">
                        Day {mockCurrentChallenge.currentDay} of {mockCurrentChallenge.duration}
                      </Badge>
                      <Badge className="bg-[#8ec07c]/20 text-[#8ec07c] px-3 py-1">
                        {mockCurrentChallenge.tasksCompleted}/{mockCurrentChallenge.totalTasks} tasks completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="text-center">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#3c3836]"></div>
                  <span className="text-[#a89984] text-sm font-medium px-4">OR START A NEW CHALLENGE</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#3c3836]"></div>
                </div>
              </div>

              {/* Predefined challenges */}
              <div className="grid gap-6">
                {predefinedChallenges.map((challenge, i) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.2 }}
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

              {/* Custom challenge option */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-20 text-lg font-medium transition-all duration-500 bg-transparent",
                    "border-2 border-dashed",
                    showCustomForm
                      ? "border-[#fe8019] text-[#fe8019] bg-[#fe8019]/5 shadow-lg shadow-[#fe8019]/10"
                      : "border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019] hover:bg-[#fe8019]/5",
                  )}
                  onClick={() => {
                    setShowCustomForm(true)
                    setSelectedChallenge(null)
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#fe8019]/20 rounded-lg">
                      <Plus className="h-6 w-6 text-[#fe8019]" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Create Custom Challenge</div>
                      <div className="text-sm opacity-70">Design your own recovery path</div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )

      case 4: // Enhanced custom challenge creation
        return (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 px-8 py-12">
            <div className="text-center space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-[#ebdbb2]"
              >
                Create Your Challenge
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[#a89984] max-w-2xl mx-auto"
              >
                Design a personalized recovery challenge that fits your spiritual goals
              </motion.p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              {/* Basic info */}
              <div className="bg-gradient-to-br from-[#1d2021] to-[#282828] rounded-2xl p-8 border border-[#3c3836] space-y-6">
                <h3 className="text-2xl font-bold text-[#ebdbb2] flex items-center gap-3">
                  <Edit3 className="h-6 w-6 text-[#fe8019]" />
                  Challenge Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[#a89984] text-sm font-medium flex items-center gap-2">
                      <Star className="h-4 w-4 text-[#fe8019]" />
                      Challenge Name
                    </label>
                    <Input
                      value={customChallenge.title}
                      onChange={(e) => setCustomChallenge({ ...customChallenge, title: e.target.value })}
                      placeholder="e.g., My Spiritual Comeback"
                      className="bg-[#0d1117] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#a89984] text-sm font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#fe8019]" />
                      Description
                    </label>
                    <Textarea
                      value={customChallenge.description}
                      onChange={(e) => setCustomChallenge({ ...customChallenge, description: e.target.value })}
                      placeholder="What is this challenge about? What are your goals?"
                      className="bg-[#0d1117] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] min-h-[100px]"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[#a89984] text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#fe8019]" />
                      Duration
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[7, 14, 21, 30].map((duration) => (
                        <Button
                          key={duration}
                          variant="outline"
                          className={cn(
                            "h-16 flex flex-col gap-1 bg-transparent transition-all duration-300",
                            customChallenge.duration === duration
                              ? "border-[#fe8019] text-[#fe8019] bg-[#fe8019]/10 shadow-lg shadow-[#fe8019]/20"
                              : "border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019]",
                          )}
                          onClick={() => setCustomChallenge({ ...customChallenge, duration: duration })}
                        >
                          <span className="text-2xl font-bold">{duration}</span>
                          <span className="text-xs">days</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks section */}
              <div className="bg-gradient-to-br from-[#1d2021] to-[#282828] rounded-2xl p-8 border border-[#3c3836] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#ebdbb2] flex items-center gap-3">
                    <Target className="h-6 w-6 text-[#fe8019]" />
                    Daily Tasks
                  </h3>
                  <Badge className="bg-[#3c3836] text-[#ebdbb2]">{customChallenge.tasks.length} tasks</Badge>
                </div>

                {customChallenge.tasks.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-[#3c3836] rounded-full flex items-center justify-center">
                      <Plus className="h-8 w-8 text-[#a89984]" />
                    </div>
                    <p className="text-[#a89984] text-lg">No tasks added yet</p>
                    <p className="text-[#a89984] text-sm">Add at least 3 tasks to create your challenge</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customChallenge.tasks.map((task, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-[#0d1117] rounded-xl border border-[#3c3836]"
                      >
                        <div className="flex-1">
                          <Input
                            value={task.name}
                            onChange={(e) => updateCustomTask(i, "name", e.target.value)}
                            placeholder="Enter task name (e.g., Read 2 pages of Quran)"
                            className="bg-transparent border-none text-[#ebdbb2] placeholder:text-[#a89984] p-0 h-auto text-lg font-medium focus-visible:ring-0"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${task.color}20` }}
                          >
                            <task.icon className="h-4 w-4" style={{ color: task.color }} />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#fb4934] text-[#fb4934] hover:bg-[#fb4934] hover:text-[#1d2021] bg-transparent"
                            onClick={() => removeCustomTask(i)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full h-16 border-2 border-dashed border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019] bg-transparent transition-all duration-300"
                  onClick={addCustomTask}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Task
                </Button>

                {customChallenge.tasks.length > 0 && customChallenge.tasks.length < 3 && (
                  <div className="text-center text-[#fabd2f] text-sm font-medium">
                    Add {3 - customChallenge.tasks.length} more task{3 - customChallenge.tasks.length !== 1 ? "s" : ""}{" "}
                    to create your challenge
                  </div>
                )}
              </div>

              {/* Challenge preview */}
              {customChallenge.title && customChallenge.tasks.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-[#fe8019]/10 to-[#d65d0e]/5 rounded-2xl p-8 border-2 border-[#fe8019]/30"
                >
                  <h3 className="text-2xl font-bold text-[#ebdbb2] mb-4 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-[#fe8019]" />
                    Challenge Preview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-[#ebdbb2]">{customChallenge.title}</h4>
                      <p className="text-[#a89984] mt-2">{customChallenge.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Badge className="bg-[#3c3836] text-[#ebdbb2]">{customChallenge.duration} days</Badge>
                      <Badge className="bg-[#fe8019]/20 text-[#fe8019]">
                        {customChallenge.tasks.length} daily tasks
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d2021] via-[#282828] to-[#1d2021] text-[#ebdbb2] relative overflow-hidden">
      {/* Background effects */}
      <BackgroundParticles />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1d2021]/50 to-[#1d2021] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress indicator */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fe8019] rounded-full flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-[#1d2021]" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#ebdbb2]">Recovery Mode</h1>
                  <p className="text-sm text-[#a89984]">
                    Step {step + 1} of {showCustomForm ? 5 : 4}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#a89984]">Progress</div>
                <div className="text-lg font-bold text-[#fe8019]">
                  {Math.round(((step + 1) / (showCustomForm ? 5 : 4)) * 100)}%
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#3c3836] rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-[#fe8019] to-[#d65d0e] h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / (showCustomForm ? 5 : 4)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            <AnimatePresence mode="wait">
              {!isExiting && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderStepContent()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Button
              variant="outline"
              className={cn(
                "bg-transparent border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:border-[#504945]",
                step === 0 && "invisible",
              )}
              onClick={handleBack}
              disabled={step === 0 || isExiting}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: showCustomForm ? 5 : 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i <= step ? "bg-[#fe8019]" : "bg-[#3c3836]",
                  )}
                />
              ))}
            </div>

            <Button
              className={cn(
                "bg-gradient-to-r from-[#fe8019] to-[#d65d0e] text-[#1d2021] hover:from-[#d65d0e] hover:to-[#b85c00] font-bold",
                "shadow-lg shadow-[#fe8019]/20 hover:shadow-[#fe8019]/30 transition-all duration-300",
              )}
              onClick={handleNext}
              disabled={!canGoNext() || isExiting}
            >
              {isExiting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2 h-4 w-4"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </motion.div>
                  Starting Recovery...
                </>
              ) : step === 3 || step === 4 ? (
                <>
                  Begin Recovery
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Exit fade overlay */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="text-center space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-16 h-16 mx-auto"
              >
                <RotateCcw className="h-16 w-16 text-[#fe8019]" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#ebdbb2]">Preparing Your Recovery</h2>
                <p className="text-[#a89984]">Every ending is a new beginning...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
