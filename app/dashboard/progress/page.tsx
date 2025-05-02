"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Heart, Users, Moon, Compass, Sunrise, ArrowLeft } from "lucide-react"

// Custom PrayingHands icon
function PrayingHands({ className }: { className?: string }) {
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

export default function ProgressPage() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  const dimensions = [
    { name: "Salah", value: 0.7, color: "#83a598", icon: PrayingHands, description: "Prayer consistency and quality" },
    {
      name: "Quran",
      value: 0.5,
      color: "#8ec07c",
      icon: BookOpen,
      description: "Recitation, understanding, and memorization",
    },
    {
      name: "Charity",
      value: 0.6,
      color: "#fe8019",
      icon: Heart,
      description: "Giving zakat, sadaqah, and helping others",
    },
    { name: "Community", value: 0.4, color: "#fabd2f", icon: Users, description: "Involvement with the Muslim ummah" },
    { name: "Dhikr", value: 0.8, color: "#d3869b", icon: Moon, description: "Remembrance of Allah throughout the day" },
    {
      name: "Knowledge",
      value: 0.6,
      color: "#b8bb26",
      icon: Compass,
      description: "Learning Islamic teachings and wisdom",
    },
    {
      name: "Character",
      value: 0.7,
      color: "#fb4934",
      icon: Sunrise,
      description: "Developing good character in daily interactions",
    },
  ]

  useEffect(() => {
    setAnimationComplete(false)
    setAnimationPhase(0)

    const phaseTimer = setTimeout(() => {
      setAnimationPhase(1)

      const completeTimer = setTimeout(() => {
        setAnimationComplete(true)
      }, 600)

      return () => clearTimeout(completeTimer)
    }, 300)

    return () => clearTimeout(phaseTimer)
  }, [selectedDimension])

  // Responsive sizing
  const getSize = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640 ? 300 : 400
    }
    return 400
  }

  const [size, setSize] = useState(getSize())

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const center = size / 2
  const radius = size * 0.4
  const hexRadius = radius * 0.8

  // Calculate points on the chart
  const getPoints = () => {
    return dimensions.map((dim, i) => {
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
  }

  const points = getPoints()

  // Create the path for the filled area
  const getPath = (pts: typeof points) => {
    return pts.map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y).join(" ") + "Z"
  }

  // Calculate overall rating (average of all dimension values)
  const overallRating = Math.round((dimensions.reduce((sum, dim) => sum + dim.value, 0) / dimensions.length) * 100)

  const handleDimensionSelect = (name: string | null) => {
    setSelectedDimension(name)
  }

  const selectedDimensionData = dimensions.find((d) => d.name === selectedDimension)
  const selectedIndex = selectedDimension ? dimensions.findIndex((d) => d.name === selectedDimension) : -1

  // Get the target point for animation
  const getTargetPoint = () => {
    if (!selectedDimension || selectedIndex === -1) return null

    const angle = (Math.PI * 2 * selectedIndex) / dimensions.length - Math.PI / 2
    const value = dimensions[selectedIndex].value

    return {
      x: center + radius * Math.cos(angle) * value,
      y: center + radius * Math.sin(angle) * value,
      angle,
      value,
    }
  }

  const targetPoint = getTargetPoint()

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[#ebdbb2]">
                {selectedDimension ? `${selectedDimension} Progress` : "Spiritual Dimensions"}
              </span>
              {selectedDimension && (
                <Button
                  variant=""
                  size="sm"
                  className="text-[#a89984] hover:text-[#ebdbb2]"
                  onClick={() => handleDimensionSelect(null)}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back to all dimensions
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative mb-8 w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDimension || "all"}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex justify-center"
                  >
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

                      {/* Axis lines - always show all axes */}
                      {points.map((point, i) => (
                        <line
                          key={i}
                          x1={center}
                          y1={center}
                          x2={point.fullX}
                          y2={point.fullY}
                          stroke="#3c3836"
                          strokeWidth="1"
                          opacity={selectedDimension ? (i === selectedIndex ? 0.8 : 0.3) : 0.5}
                        />
                      ))}

                      {/* Filled area - only show if all dimensions */}
                      {!selectedDimension && (
                        <motion.path
                          d={getPath(points)}
                          fill="rgba(254, 128, 25, 0.2)"
                          stroke="#fe8019"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                      )}

                      {/* Single line for selected dimension */}
                      {selectedDimension && targetPoint && (
                        <motion.line
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          x1={center}
                          y1={center}
                          x2={targetPoint.x}
                          y2={targetPoint.y}
                          stroke="#fe8019"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      )}

                      {/* Data points - show all when not in single dimension view */}
                      {!selectedDimension &&
                        points.map((point, i) => (
                          <motion.g
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                          >
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="8"
                              fill={point.color}
                              stroke="none"
                              strokeWidth="2"
                              onClick={() => handleDimensionSelect(point.name)}
                              style={{ cursor: "pointer" }}
                            />
                          </motion.g>
                        ))}

                      {/* Animated point for single dimension view */}
                      {selectedDimension && targetPoint && (
                        <motion.circle
                          initial={{ cx: center, cy: center, r: 8 }}
                          animate={{
                            cx: animationPhase === 0 ? center : targetPoint.x,
                            cy: animationPhase === 0 ? center : targetPoint.y,
                            r: 8,
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          fill="#fe8019"
                          stroke="#ebdbb2"
                          strokeWidth="2"
                        />
                      )}

                      {/* Labels - always show all labels */}
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
                            fontSize="14"
                            fill={selectedDimension === point.name ? "#fe8019" : point.color}
                            fontWeight={selectedDimension === point.name ? "bold" : "500"}
                            opacity={selectedDimension ? (point.name === selectedDimension ? 1 : 0.5) : 1}
                            className="cursor-pointer"
                            onClick={() => handleDimensionSelect(point.name)}
                          >
                            {point.name}
                          </text>
                        )
                      })}
                    </svg>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDimension || "all"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                  >
                    {selectedDimension ? (
                      <>
                        <div className="text-lg text-[#ebdbb2]">{selectedDimensionData?.name}</div>
                        <div className="text-5xl font-bold text-[#fe8019]">
                          {Math.round(selectedDimensionData?.value! * 100)}%
                        </div>
                        <div className="text-sm text-[#a89984] max-w-[300px] mx-auto mt-2">
                          {selectedDimensionData?.description}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-lg text-[#ebdbb2]">Overall Spiritual Rating</div>
                        <div className="text-5xl font-bold text-[#fe8019]">{overallRating}%</div>
                        <div className="text-sm text-[#a89984] max-w-[300px] mx-auto mt-2">
                          Click on any dimension to see detailed progress
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4 mt-12">
              {dimensions.map((dim, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center cursor-pointer ${
                    selectedDimension === dim.name ? "scale-110" : ""
                  }`}
                  onClick={() => handleDimensionSelect(dim.name)}
                >
                  <div
                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center ${
                      selectedDimension === dim.name
                        ? "bg-[#fe8019] text-[#1d2021]"
                        : "bg-[#3c3836] text-[" + dim.color + "]"
                    }`}
                  >
                    <dim.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div
                    className={`text-xs mt-2 font-medium ${
                      selectedDimension === dim.name ? "text-[#fe8019]" : "text-[#a89984]"
                    }`}
                  >
                    {dim.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {selectedDimension && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#ebdbb2]">{selectedDimension} History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-[#a89984] mb-2">Monthly Progress</div>
                  <div className="space-y-4">
                    {["May", "April", "March", "February", "January"].map((month, i) => {
                      const value = Math.round(
                        (selectedDimensionData?.value || 0.5) * 100 - i * (Math.random() * 10 - 5),
                      )
                      const prevValue = Math.round(
                        (selectedDimensionData?.value || 0.5) * 100 - (i + 1) * (Math.random() * 10 - 5),
                      )
                      const change = value - prevValue

                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#ebdbb2]">{month}</span>
                            <span className="text-[#a89984]">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2 bg-[#1d2021]" />
                          <div className="text-xs text-[#a89984] flex justify-end">
                            {change > 0 ? (
                              <span className="text-[#8ec07c]">+{change}% from previous month</span>
                            ) : change < 0 ? (
                              <span className="text-[#fb4934]">{change}% from previous month</span>
                            ) : (
                              <span>No change from previous month</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-[#3c3836] pt-4">
                  <div className="text-sm text-[#a89984] mb-2">Improvement Tips</div>
                  <div className="space-y-2 mt-4">
                    {[
                      "Set specific goals for daily improvement",
                      "Track your progress consistently",
                      "Join a community for accountability",
                      "Learn from experienced mentors",
                      "Reflect on your journey regularly",
                    ].map((tip, i) => (
                      <div key={i} className="flex items-start">
                        <div className="h-4 w-4 rounded-full bg-[#fe8019] mt-0.5 mr-2 flex-shrink-0"></div>
                        <div className="text-sm text-[#ebdbb2]">{tip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
