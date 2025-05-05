"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, Award, ArrowRight, BookOpen, Heart, Users } from "lucide-react"

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

export default function ChallengesPage() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const toggleTask = (index: number) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index))
    } else {
      setCompletedTasks([...completedTasks, index])
    }
  }

  const challenge = {
    id: "ramadan-readiness",
    title: "Ramadan Readiness",
    description: "Prepare spiritually and physically for the blessed month",
    progress: (completedTasks.length / 5) * 100,
    day: 3,
    totalDays: 30,
    tasks: [
      { id: 1, name: "Fasting Monday & Thursday", icon: PrayingHandsIcon, color: "#fb4934" },
      { id: 2, name: "Read 5 pages of Quran", icon: BookOpen, color: "#8ec07c" },
      { id: 3, name: "Give charity today", icon: Heart, color: "#fe8019" },
      { id: 4, name: "Attend Islamic lecture", icon: Users, color: "#fabd2f" },
      { id: 5, name: "Extra night prayers", icon: PrayingHandsIcon, color: "#d3869b" },
    ],
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Award className="h-6 w-6 text-[#fe8019] mr-2" />
              <span className="text-[#ebdbb2]">{challenge.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#a89984]">
                  Day {challenge.day} of {challenge.totalDays}
                </span>
                <span className="text-[#ebdbb2]">{Math.round(challenge.progress)}% complete</span>
              </div>
              <Progress value={challenge.progress} className="h-2 bg-[#1d2021]" />
              <p className="text-sm text-[#a89984] mt-2">{challenge.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#ebdbb2] font-medium">Today's Tasks</h3>

              <AnimatePresence>
                {challenge.tasks.map((task, i) => (
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
                      <span className={`text-[#ebdbb2] ${completedTasks.includes(i) ? "line-through opacity-70" : ""}`}>
                        {task.name}
                      </span>
                    </div>
                    <Link href={`/dashboard/challenges/complete/${i + 1}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`h-8 w-8 rounded-full p-0 ${
                          completedTasks.includes(i)
                            ? "bg-[#fe8019] border-[#fe8019] text-[#1d2021]"
                            : "border-[#3c3836] hover:border-[#fe8019] hover:text-[#fe8019]"
                        }`}
                      >
                        {completedTasks.includes(i) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#3c3836] pt-4">
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-[#a89984]">Challenge Streak</div>
                <div className="text-sm font-medium text-[#fe8019]">7 days</div>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full ${i < 5 ? "bg-[#fe8019]" : "bg-[#3c3836]"}`}></div>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ebdbb2]">Challenge Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Builds consistency in worship",
                "Strengthens spiritual discipline",
                "Prepares you for Ramadan's blessings",
                "Increases mindfulness throughout the day",
                "Connects you with the community",
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start"
                >
                  <div className="h-5 w-5 rounded-full bg-[#fe8019] flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-[#1d2021]" />
                  </div>
                  <span className="text-[#ebdbb2]">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
