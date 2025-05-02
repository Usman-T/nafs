"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Calendar, Award, BarChart3, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

function InteractiveRadarChart() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null)

  const dimensions = [
    { name: "Salah", value: 0.7, color: "#83a598", description: "Prayer consistency and quality" },
    { name: "Quran", value: 0.5, color: "#8ec07c", description: "Recitation, understanding, and memorization" },
    { name: "Charity", value: 0.6, color: "#fe8019", description: "Giving zakat, sadaqah, and helping others" },
    { name: "Community", value: 0.4, color: "#fabd2f", description: "Involvement with the Muslim ummah" },
    { name: "Dhikr", value: 0.8, color: "#d3869b", description: "Remembrance of Allah throughout the day" },
    { name: "Knowledge", value: 0.6, color: "#b8bb26", description: "Learning Islamic teachings and wisdom" },
    { name: "Character", value: 0.7, color: "#fb4934", description: "Developing good character in daily interactions" },
  ]

  const size = 280
  const center = size / 2
  const radius = size * 0.4
  const hexRadius = radius * 0.8

  // Calculate points on the chart
  const points = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
    return {
      x: center + radius * Math.cos(angle) * dim.value,
      y: center + radius * Math.sin(angle) * dim.value,
      fullX: center + radius * Math.cos(angle),
      fullY: center + radius * Math.sin(angle),
      name: dim.name,
      color: dim.color,
      value: dim.value,
      description: dim.description,
      angle,
    }
  })

  // Create the path for the filled area
  const path = points.map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y).join(" ") + "Z"

  // Calculate overall rating (average of all dimension values)
  const overallRating = Math.round((dimensions.reduce((sum, dim) => sum + dim.value, 0) / dimensions.length) * 100)

  const handleDimensionClick = (name: string) => {
    setSelectedDimension(selectedDimension === name ? null : name)
  }

  const selectedDimensionData = dimensions.find((d) => d.name === selectedDimension)

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Background hexagons */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => {
            const hexPoints = Array.from({ length: 7 }).map((_, j) => {
              const angle = (Math.PI * 2 * j) / 7 - Math.PI / 2
              const x = center + hexRadius * level * Math.cos(angle)
              const y = center + hexRadius * level * Math.sin(angle)
              return `${x},${y}`
            })
            return (
              <polygon
                key={i}
                points={hexPoints.join(" ")}
                fill="none"
                stroke="#3c3836"
                strokeWidth="1"
                opacity={0.5}
              />
            )
          })}

          {/* Axis lines */}
          {points.map((point, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.fullX}
              y2={point.fullY}
              stroke="#3c3836"
              strokeWidth="1"
              opacity={0.5}
            />
          ))}

          {/* Filled area */}
          <path d={path} fill="rgba(254, 128, 25, 0.2)" stroke="#fe8019" strokeWidth="2" />

          {/* Data points with click interaction */}
          {points.map((point, i) => (
            <g key={i} onClick={() => handleDimensionClick(point.name)} style={{ cursor: "pointer" }}>
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill={selectedDimension === point.name ? "#fe8019" : point.color}
                stroke={selectedDimension === point.name ? "#ebdbb2" : "none"}
                strokeWidth="2"
              />
              <circle cx={point.x} cy={point.y} r="15" fill="transparent" className="cursor-pointer" />
            </g>
          ))}

          {/* Labels */}
          {points.map((point, i) => {
            const labelRadius = radius * 1.15
            const labelX = center + labelRadius * Math.cos(point.angle)
            const labelY = center + labelRadius * Math.sin(point.angle)

            return (
              <text
                key={i}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill={selectedDimension === point.name ? "#ebdbb2" : point.color}
                fontWeight={selectedDimension === point.name ? "bold" : "500"}
                onClick={() => handleDimensionClick(point.name)}
                className="cursor-pointer"
              >
                {point.name}
              </text>
            )
          })}
        </svg>
      </div>

      <div className="mt-4 text-center">
        {selectedDimension ? (
          <div className="space-y-2">
            <div className="text-sm text-[#a89984]">{selectedDimensionData?.name}</div>
            <div className="text-3xl font-bold text-[#ebdbb2]">{Math.round(selectedDimensionData?.value! * 100)}%</div>
            <div className="text-xs text-[#a89984] max-w-[220px]">{selectedDimensionData?.description}</div>
            <Button variant="link" size="sm" className="text-[#fe8019]" asChild>
              <Link href="/dashboard/progress">
                View detailed progress <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm text-[#a89984]">Overall Rating</div>
            <div className="text-3xl font-bold text-[#ebdbb2]">{overallRating}%</div>
            <div className="text-xs text-[#a89984]">Click on any dimension to see details</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [currentDay, setCurrentDay] = useState(new Date())
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const toggleTask = (index: number) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index))
    } else {
      setCompletedTasks([...completedTasks, index])
    }
  }

  const dailyTasks = [
    { id: 1, name: "Fajr and Asr in congregation", color: "#fb4934" },
    { id: 2, name: "Work on self-improvement", color: "#83a598" },
    { id: 3, name: "Exercise for 1+ hour", color: "#8ec07c" },
    { id: 4, name: "Quran memorization (15+ min)", color: "#fabd2f" },
    { id: 5, name: "Read, speak, record", color: "#fe8019" },
  ]

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = new Date()
  const currentWeekDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - today.getDay() + i)
    return date
  })

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Tasks Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1"
        >
          <Card className="bg-[#282828] border-[#3c3836] overflow-hidden h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="text-[#ebdbb2]">Daily Tasks</div>
                <div className="text-sm text-[#a89984]">
                  {completedTasks.length}/{dailyTasks.length}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={(completedTasks.length / dailyTasks.length) * 100} className="h-2 bg-[#1d2021]" />

              <div className="text-[#a89984] text-sm">
                Complete all daily tasks for <span className="text-[#fe8019]">5 consecutive days</span> to advance to
                the next level
              </div>

              <div className="border-t border-[#3c3836] pt-4 mt-4">
                <div className="text-[#a89984] text-sm mb-4">
                  Today, {today.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                </div>

                <div className="flex justify-between mb-6">
                  {weekdays.map((day, i) => (
                    <div
                      key={i}
                      className={`flex flex-col items-center ${
                        i === today.getDay() ? "text-[#fe8019]" : "text-[#a89984]"
                      }`}
                    >
                      <div className="text-xs">{day.substring(0, 1)}</div>
                      <div className="text-sm mt-1">{currentWeekDates[i].getDate()}</div>
                      <div
                        className={`h-1 w-1 rounded-full mt-1 ${i === today.getDay() ? "bg-[#fe8019]" : "bg-[#3c3836]"}`}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {dailyTasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-[#a89984] mr-2">{String(i + 1).padStart(2, "0")}.</span>
                        <span className="text-[#ebdbb2]">{task.name}</span>
                      </div>
                      <button
                        onClick={() => toggleTask(i)}
                        className={`h-6 w-6 rounded-full border ${
                          completedTasks.includes(i)
                            ? "bg-[#fe8019] border-[#fe8019]"
                            : "bg-transparent border-[#3c3836]"
                        } flex items-center justify-center transition-all duration-200`}
                      >
                        {completedTasks.includes(i) && <Check className="h-4 w-4 text-[#1d2021]" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dimensions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1"
        >
          <Card className="bg-[#282828] border-[#3c3836] overflow-hidden h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-[#ebdbb2]">Spiritual Dimensions</span>
                <Link href="/dashboard/progress" className="text-[#fe8019] text-sm hover:underline">
                  View all
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveRadarChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Progress Calendar Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-[#ebdbb2]">Monthly Progress</span>
              <Link href="/dashboard/calendar" className="text-[#fe8019] text-sm hover:underline">
                View full calendar
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-6 mb-4">
                <span className="text-[#ebdbb2] border-b-2 border-[#ebdbb2] pb-1">May</span>
                <span className="text-[#a89984]">Jun</span>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-6">
                {weekdays.map((day, i) => (
                  <div key={i} className="text-[#a89984] text-xs text-center">
                    {day.charAt(0)}
                  </div>
                ))}

                {Array.from({ length: 31 }).map((_, i) => {
                  const isCompleted = [1, 2, 3, 7, 8, 9, 15, 16, 22, 23].includes(i + 1)
                  const isPartial = [4, 10, 11, 17, 24].includes(i + 1)
                  const isToday = i + 1 === today.getDate() && today.getMonth() === 4 // May is month 4 (0-indexed)

                  return (
                    <div key={i} className="flex justify-center">
                      <div
                        className={`h-8 w-8 rounded-md flex items-center justify-center ${
                          isCompleted
                            ? "bg-[#fe8019] text-[#1d2021]"
                            : isPartial
                              ? "bg-[#3c3836] text-[#ebdbb2]"
                              : isToday
                                ? "border-2 border-[#fe8019] text-[#ebdbb2]"
                                : "border border-[#3c3836] text-[#a89984]"
                        }`}
                      >
                        {i + 1}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between text-sm text-[#a89984] mt-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-[#fe8019] rounded-sm mr-2"></div>
                  <span>All tasks completed</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-[#3c3836] rounded-sm mr-2"></div>
                  <span>Partial completion</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 border border-[#3c3836] rounded-sm mr-2"></div>
                  <span>No tasks completed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Current Streak",
              value: "12 days",
              icon: <Calendar className="h-5 w-5 text-[#fe8019]" />,
              description: "Keep going! Your best streak is 21 days.",
              link: "/dashboard/calendar",
            },
            {
              title: "Active Challenge",
              value: "Ramadan Readiness",
              icon: <Award className="h-5 w-5 text-[#fe8019]" />,
              description: "Day 3 of 30 - 65% complete",
              link: "/dashboard/challenges",
            },
            {
              title: "Overall Growth",
              value: "72%",
              icon: <BarChart3 className="h-5 w-5 text-[#fe8019]" />,
              description: "Up 8% from last month",
              link: "/dashboard/progress",
            },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href={stat.link} className="block h-full">
                <Card className="bg-[#282828] border-[#3c3836] h-full hover:border-[#fe8019] transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#a89984]">{stat.title}</div>
                      <div className="h-8 w-8 rounded-full bg-[#3c3836] flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#ebdbb2] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#a89984]">{stat.description}</div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
