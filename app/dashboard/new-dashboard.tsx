"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, Calendar, BarChart3, ChevronRight, CheckCircle, Circle, Plus, Dumbbell } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function NewDashboard() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null)

  const dimensions = [
    { name: "Salah", value: 80, icon: "🕌", color: "#d65d0e" },
    { name: "Quran", value: 60, icon: "📖", color: "#d65d0e" },
    { name: "Charity", value: 70, icon: "🤲", color: "#d65d0e" },
    { name: "Community", value: 50, icon: "👥", color: "#d65d0e" },
    { name: "Dhikr", value: 90, icon: "📿", color: "#d65d0e" },
    { name: "Knowledge", value: 70, icon: "🧠", color: "#d65d0e" },
    { name: "Character", value: 80, icon: "❤️", color: "#d65d0e" },
    { name: "Physical", value: 65, icon: "💪", color: "#d65d0e" },
  ]

  const dailyTasks = [
    { name: "Fajr Prayer", category: "Salah", completed: true },
    { name: "Dhuhr Prayer", category: "Salah", completed: true },
    { name: "Asr Prayer", category: "Salah", completed: true },
    { name: "Maghrib Prayer", category: "Salah", completed: false },
    { name: "Isha Prayer", category: "Salah", completed: false },
    { name: "Read 5 pages of Quran", category: "Quran", completed: true },
    { name: "Morning Adhkar", category: "Dhikr", completed: true },
    { name: "Evening Adhkar", category: "Dhikr", completed: false },
    { name: "Gym workout", category: "Physical", completed: true },
    { name: "Help someone in need", category: "Charity", completed: false },
  ]

  return (
    <div className="space-y-8">
      {/* Current Challenge */}
      <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-[#3c3836]">Current Challenge</CardTitle>
            <CardDescription className="text-[#665c54]">3-Day Consistency Challenge</CardDescription>
          </div>
          <Award className="h-6 w-6 text-[#d65d0e]" />
        </CardHeader>
        <CardContent className="pb-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium text-[#3c3836]">Progress</div>
            <div className="text-sm font-medium text-[#3c3836]">Day 1/3</div>
          </div>
          <Progress value={33.33} className="h-2 bg-[#d5c4a1]" indicatorClassName="bg-[#d65d0e]" />
        </CardContent>
        <CardContent>
          <p className="text-sm text-[#3c3836] mb-4">
            Complete 5 tasks each day to build consistency in your spiritual practice. After completing this challenge,
            you'll unlock the 5-day challenge.
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-md border border-[#d5c4a1] bg-[#d65d0e] p-2 text-center text-white">
              <div className="text-xs font-medium">Day 1</div>
              <div className="text-lg font-bold">✓</div>
            </div>
            <div className="rounded-md border border-[#d5c4a1] bg-[#fbf1c7] p-2 text-center">
              <div className="text-xs font-medium text-[#665c54]">Day 2</div>
              <div className="text-lg font-bold text-[#665c54]">-</div>
            </div>
            <div className="rounded-md border border-[#d5c4a1] bg-[#fbf1c7] p-2 text-center">
              <div className="text-xs font-medium text-[#665c54]">Day 3</div>
              <div className="text-lg font-bold text-[#665c54]">-</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#d65d0e] hover:bg-[#af3a03] text-white">View Challenge Details</Button>
        </CardFooter>
      </Card>

      {/* Today's Tasks */}
      <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#3c3836]">Today's Tasks</CardTitle>
          <CardDescription className="text-[#665c54]">
            {dailyTasks.filter((task) => task.completed).length}/{dailyTasks.length} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#fbf1c7]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="salah">Salah</TabsTrigger>
              <TabsTrigger value="quran">Quran</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <ul className="space-y-2">
                {dailyTasks.map((task, i) => (
                  <li key={i} className="flex items-start">
                    {task.completed ? (
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-[#d65d0e]" />
                    ) : (
                      <Circle className="mr-2 mt-0.5 h-4 w-4 text-[#665c54]" />
                    )}
                    <div className="flex-1">
                      <span className="text-sm text-[#3c3836]">{task.name}</span>
                      <div className="inline-flex items-center rounded-full border border-[#d5c4a1] bg-[#fbf1c7] px-2 py-0.5 text-xs ml-2">
                        <span className="text-[#d65d0e]">{task.category}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="salah" className="mt-4">
              <ul className="space-y-2">
                {dailyTasks
                  .filter((task) => task.category === "Salah")
                  .map((task, i) => (
                    <li key={i} className="flex items-start">
                      {task.completed ? (
                        <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-[#d65d0e]" />
                      ) : (
                        <Circle className="mr-2 mt-0.5 h-4 w-4 text-[#665c54]" />
                      )}
                      <span className="text-sm text-[#3c3836]">{task.name}</span>
                    </li>
                  ))}
              </ul>
            </TabsContent>
            <TabsContent value="quran" className="mt-4">
              <ul className="space-y-2">
                {dailyTasks
                  .filter((task) => task.category === "Quran")
                  .map((task, i) => (
                    <li key={i} className="flex items-start">
                      {task.completed ? (
                        <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-[#d65d0e]" />
                      ) : (
                        <Circle className="mr-2 mt-0.5 h-4 w-4 text-[#665c54]" />
                      )}
                      <span className="text-sm text-[#3c3836]">{task.name}</span>
                    </li>
                  ))}
              </ul>
            </TabsContent>
            <TabsContent value="physical" className="mt-4">
              <ul className="space-y-2">
                {dailyTasks
                  .filter((task) => task.category === "Physical")
                  .map((task, i) => (
                    <li key={i} className="flex items-start">
                      {task.completed ? (
                        <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-[#d65d0e]" />
                      ) : (
                        <Circle className="mr-2 mt-0.5 h-4 w-4 text-[#665c54]" />
                      )}
                      <span className="text-sm text-[#3c3836]">{task.name}</span>
                    </li>
                  ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836] hover:bg-[#ebdbb2]">
            <Plus className="mr-1 h-4 w-4" /> Add Task
          </Button>
          <Button className="bg-[#d65d0e] hover:bg-[#af3a03] text-white">Update Progress</Button>
        </CardFooter>
      </Card>

      {/* Dimensions Progress */}
      <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-[#3c3836]">Spiritual Dimensions</CardTitle>
            <CardDescription className="text-[#665c54]">Scroll to view all dimensions</CardDescription>
          </div>
          <BarChart3 className="h-6 w-6 text-[#d65d0e]" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[120px] w-full pr-4">
            <div className="space-y-4">
              {dimensions.map((dimension, i) => (
                <div
                  key={i}
                  className={`space-y-2 p-2 rounded-md cursor-pointer transition-colors ${
                    selectedDimension === dimension.name ? "bg-[#fbf1c7]" : "hover:bg-[#fbf1c7]/50"
                  }`}
                  onClick={() => setSelectedDimension(dimension.name === selectedDimension ? null : dimension.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{dimension.icon}</span>
                      <h4 className="text-sm font-medium text-[#3c3836]">{dimension.name}</h4>
                    </div>
                    <span className="text-sm font-medium text-[#d65d0e]">{dimension.value}%</span>
                  </div>
                  <Progress value={dimension.value} className="h-2 bg-[#d5c4a1]" indicatorClassName="bg-[#d65d0e]" />

                  {selectedDimension === dimension.name && (
                    <div className="mt-2 text-sm text-[#665c54] animate-fadeIn">
                      <div className="flex justify-between mb-1">
                        <span>Recent Activity:</span>
                        <span className="text-[#d65d0e]">+5% this week</span>
                      </div>
                      {dimension.name === "Physical" ? (
                        <div className="flex items-center gap-1 text-[#3c3836]">
                          <Dumbbell className="h-3 w-3" /> Gym workout completed today
                        </div>
                      ) : dimension.name === "Salah" ? (
                        <div className="text-[#3c3836]">3/5 prayers completed today</div>
                      ) : dimension.name === "Quran" ? (
                        <div className="text-[#3c3836]">5 pages read today</div>
                      ) : (
                        <div className="text-[#3c3836]">Last activity: Yesterday</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Link
            href="/dashboard/progress"
            className="flex w-full items-center justify-center text-sm font-medium text-[#d65d0e] hover:text-[#af3a03]"
          >
            View Detailed Progress
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>

      {/* Simplified Calendar */}
      <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-[#3c3836]">Monthly Overview</CardTitle>
            <CardDescription className="text-[#665c54]">April 2025</CardDescription>
          </div>
          <Calendar className="h-6 w-6 text-[#d65d0e]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-xs font-medium text-[#665c54]">
                {day}
              </div>
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-8 w-full" />
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const isComplete = [1, 2, 3, 6, 7, 8, 11, 12, 15, 16, 19, 20, 21].includes(i + 1)
              const isPartial = [4, 5, 9, 10, 13, 14, 17, 18].includes(i + 1)

              return (
                <div
                  key={i}
                  className={`flex h-8 w-full items-center justify-center rounded-md text-xs font-medium ${
                    isComplete
                      ? "bg-[#d65d0e] text-white"
                      : isPartial
                        ? "bg-[#d5c4a1] text-[#3c3836]"
                        : "bg-[#fbf1c7] text-[#3c3836]"
                  }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/dashboard/calendar"
            className="flex w-full items-center justify-center text-sm font-medium text-[#d65d0e] hover:text-[#af3a03]"
          >
            View Full Calendar
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
