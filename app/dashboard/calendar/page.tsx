"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Generate calendar days
  const calendarDays = []
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(year, month, i))
  }

  // Sample task data
  const getDailyTasks = (date: Date) => {
    // Generate some sample tasks based on the date
    const day = date.getDate()
    const tasks = [
      { id: 1, name: "Fajr and Asr in congregation", completed: day % 3 === 0, color: "#fb4934" },
      { id: 2, name: "Work on self-improvement", completed: day % 5 !== 0, color: "#83a598" },
      { id: 3, name: "Exercise for 1+ hour", completed: day % 2 === 0, color: "#8ec07c" },
      { id: 4, name: "Quran memorization (15+ min)", completed: day % 4 !== 0, color: "#fabd2f" },
      { id: 5, name: "Read, speak, record", completed: day % 7 === 0, color: "#fe8019" },
    ]
    return tasks
  }

  // Get tasks for selected date
  const selectedDateTasks = getDailyTasks(selectedDate)

  // Calculate completion status for a date
  const getCompletionStatus = (date: Date | null) => {
    if (!date) return "empty"

    const day = date.getDate()
    const tasks = getDailyTasks(date)
    const completedCount = tasks.filter((t) => t.completed).length

    if (completedCount === tasks.length) return "complete"
    if (completedCount > 0) return "partial"
    return "none"
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Check if a date is today
  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Check if a date is selected
  const isSelected = (date: Date | null) => {
    if (!date) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-[#ebdbb2]">Calendar</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#3c3836] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                  onClick={goToPreviousMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#3c3836] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                  onClick={goToToday}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#3c3836] bg-[#1d2021] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                  onClick={goToNextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#ebdbb2]">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-[#a89984] text-sm text-center py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              <AnimatePresence mode="wait">
                {calendarDays.map((date, index) => {
                  const status = getCompletionStatus(date)

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.01 }}
                      whileHover={date ? { scale: 1.05 } : {}}
                      whileTap={date ? { scale: 0.95 } : {}}
                      className={`aspect-square p-1 ${date ? "cursor-pointer" : ""}`}
                      onClick={() => date && setSelectedDate(date)}
                    >
                      {date ? (
                        <div
                          className={`h-full w-full rounded-md flex flex-col items-center justify-center relative ${
                            isSelected(date)
                              ? "bg-[#fe8019] text-[#1d2021]"
                              : isToday(date)
                                ? "border-2 border-[#fe8019] text-[#ebdbb2]"
                                : status === "complete"
                                  ? "bg-[#3c3836] text-[#ebdbb2]"
                                  : status === "partial"
                                    ? "bg-[#3c3836]/50 text-[#ebdbb2]"
                                    : "border border-[#3c3836] text-[#a89984]"
                          }`}
                        >
                          <span className="text-sm font-medium">{date.getDate()}</span>
                          {status === "complete" && !isSelected(date) && (
                            <div className="absolute bottom-1 right-1">
                              <Check className="h-3 w-3 text-[#fe8019]" />
                            </div>
                          )}
                          {status === "partial" && !isSelected(date) && (
                            <div className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#fe8019]"></div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full w-full"></div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-[#fe8019] mr-2" />
                <span className="text-[#ebdbb2]">{formatDate(selectedDate)}</span>
              </div>
              <div className="text-sm text-[#a89984]">
                {selectedDateTasks.filter((t) => t.completed).length}/{selectedDateTasks.length} completed
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDate.toISOString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedDateTasks.map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]"
                    >
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full mr-3" style={{ backgroundColor: task.color }}></div>
                        <span className={`text-[#ebdbb2] ${task.completed ? "line-through opacity-70" : ""}`}>
                          {task.name}
                        </span>
                      </div>
                      <div
                        className={`h-6 w-6 rounded-full border flex items-center justify-center ${
                          task.completed ? "bg-[#fe8019] border-[#fe8019]" : "bg-transparent border-[#3c3836]"
                        }`}
                      >
                        {task.completed && <Check className="h-4 w-4 text-[#1d2021]" />}
                      </div>
                    </motion.div>
                  ))}

                  <div className="mt-6 p-4 rounded-md bg-[#1d2021] border border-[#3c3836]">
                    <h3 className="text-[#ebdbb2] font-medium mb-2">Daily Reflection</h3>
                    <p className="text-sm text-[#a89984]">
                      {selectedDateTasks.filter((t) => t.completed).length === selectedDateTasks.length
                        ? "Excellent work today! You've completed all your tasks. Keep up the momentum for your spiritual growth."
                        : selectedDateTasks.filter((t) => t.completed).length > 0
                          ? "Good progress today. Reflect on what helped you complete some tasks and how you can improve tomorrow."
                          : "Today was challenging. Remember that every day is a new opportunity to grow spiritually."}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
