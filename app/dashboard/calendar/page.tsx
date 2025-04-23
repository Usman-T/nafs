"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonth = "April"

  // Sample data for the selected day
  const dayData = {
    date: "April 21, 2025",
    tasks: [
      { name: "Morning Prayer", category: "Salah", completed: true, points: 10 },
      { name: "Afternoon Prayer", category: "Salah", completed: true, points: 10 },
      { name: "Evening Prayer", category: "Salah", completed: true, points: 10 },
      { name: "Read Quran (10 pages)", category: "Quran", completed: true, points: 15 },
      { name: "Dhikr Session", category: "Dhikr", completed: true, points: 8 },
      { name: "Charity Donation", category: "Charity", completed: false, points: 12 },
      { name: "Islamic Lecture", category: "Knowledge", completed: false, points: 10 },
    ],
    stats: {
      tasksCompleted: 5,
      totalTasks: 7,
      pointsEarned: 53,
      totalPoints: 75,
      dimensionsImproved: ["Salah", "Quran", "Dhikr"],
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3c3836]">Activity Calendar</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={currentMonth.toLowerCase()}>
            <SelectTrigger className="w-[140px] border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month.toLowerCase()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex">
            <Button
              variant="outline"
              size="icon"
              className="rounded-r-none border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836]"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836]"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#3c3836]">{currentMonth} 2025</CardTitle>
              <CardDescription className="text-[#665c54]">Click on a day to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-end gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#d65d0e]" />
                    <span className="text-xs text-[#665c54]">All tasks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#fe8019]" />
                    <span className="text-xs text-[#665c54]">Some tasks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#d5c4a1]" />
                    <span className="text-xs text-[#665c54]">Few tasks</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="text-xs font-medium text-[#665c54]">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="h-12 w-full" />
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const dayNumber = i + 1
                    const isComplete = [1, 2, 3, 6, 7, 8, 11, 12, 15, 16, 19, 20, 21].includes(dayNumber)
                    const isMostComplete = [4, 5, 9, 10, 13, 14, 17, 18].includes(dayNumber)
                    const isPartial = [22, 23].includes(dayNumber)
                    const isSelected = selectedDay === dayNumber

                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedDay(dayNumber)}
                        className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors ${
                          isSelected ? "ring-2 ring-[#d65d0e] ring-offset-2 ring-offset-[#ebdbb2]" : ""
                        } ${
                          isComplete
                            ? "bg-[#d65d0e] text-white hover:bg-[#af3a03]"
                            : isMostComplete
                              ? "bg-[#fe8019] text-white hover:bg-[#d65d0e]"
                              : isPartial
                                ? "bg-[#d5c4a1] text-[#3c3836] hover:bg-[#fe8019] hover:text-white"
                                : "bg-[#fbf1c7] text-[#3c3836] hover:bg-[#d5c4a1]"
                        }`}
                      >
                        {dayNumber}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedDay ? (
            <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#3c3836]">April {selectedDay}, 2025</CardTitle>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="rounded-full p-1 text-[#665c54] hover:bg-[#d5c4a1] hover:text-[#3c3836]"
                  >
                    ✕
                  </button>
                </div>
                <CardDescription className="text-[#665c54]">Daily activity summary</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tasks">
                  <TabsList className="mb-4 grid w-full grid-cols-2 bg-[#fbf1c7]">
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tasks">
                    <div className="space-y-3">
                      {dayData.tasks.map((task, i) => (
                        <div key={i} className="flex items-center justify-between rounded-md bg-[#fbf1c7] p-2">
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-4 w-4 rounded-full ${task.completed ? "bg-[#d65d0e]" : "bg-[#d5c4a1]"}`}
                            />
                            <div>
                              <div className="text-sm text-[#3c3836]">{task.name}</div>
                              <div className="text-xs text-[#665c54]">{task.category}</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-[#d65d0e]">+{task.points}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="stats">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-md bg-[#fbf1c7] p-3 text-center">
                          <div className="text-2xl font-bold text-[#d65d0e]">
                            {dayData.stats.tasksCompleted}/{dayData.stats.totalTasks}
                          </div>
                          <div className="text-xs text-[#665c54]">Tasks Completed</div>
                        </div>
                        <div className="rounded-md bg-[#fbf1c7] p-3 text-center">
                          <div className="text-2xl font-bold text-[#d65d0e]">{dayData.stats.pointsEarned}</div>
                          <div className="text-xs text-[#665c54]">Points Earned</div>
                        </div>
                      </div>

                      <div className="rounded-md bg-[#fbf1c7] p-3">
                        <div className="mb-2 text-sm font-medium text-[#3c3836]">Dimensions Improved</div>
                        <div className="flex flex-wrap gap-2">
                          {dayData.stats.dimensionsImproved.map((dim, i) => (
                            <div key={i} className="rounded-full bg-[#d65d0e] px-2 py-1 text-xs text-white">
                              {dim}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3c3836]">Monthly Summary</CardTitle>
                <CardDescription className="text-[#665c54]">April 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-[#fbf1c7] p-3 text-center">
                      <div className="text-2xl font-bold text-[#d65d0e]">23</div>
                      <div className="text-xs text-[#665c54]">Active Days</div>
                    </div>
                    <div className="rounded-md bg-[#fbf1c7] p-3 text-center">
                      <div className="text-2xl font-bold text-[#d65d0e]">76%</div>
                      <div className="text-xs text-[#665c54]">Completion Rate</div>
                    </div>
                  </div>

                  <div className="rounded-md bg-[#fbf1c7] p-3">
                    <div className="mb-2 text-sm font-medium text-[#3c3836]">Top Categories</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#665c54]">Salah</span>
                        <span className="text-xs font-medium text-[#d65d0e]">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#665c54]">Dhikr</span>
                        <span className="text-xs font-medium text-[#d65d0e]">85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#665c54]">Quran</span>
                        <span className="text-xs font-medium text-[#d65d0e]">78%</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-[#fbf1c7] p-3">
                    <div className="mb-2 text-sm font-medium text-[#3c3836]">Longest Streak</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#665c54]">April 6-21</span>
                      <span className="text-xs font-medium text-[#d65d0e]">16 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
