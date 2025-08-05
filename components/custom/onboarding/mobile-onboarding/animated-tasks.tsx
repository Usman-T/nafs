"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, Book, Check } from "lucide-react"
import { motion } from "framer-motion"

const tasks = [
  {
    id: 1,
    title: "Wake up before Fajr",
    category: "Discipline",
    icon: Clock,
    bgColor: "bg-red-500",
    categoryColor: "text-red-400",
    borderColor: "border-red-400",
  },
  {
    id: 2,
    title: "Read a book",
    category: "Knowledge",
    icon: Book,
    bgColor: "bg-yellow-500",
    categoryColor: "text-yellow-400",
    borderColor: "border-yellow-400",
  },
]

interface AnimatedTasksProps {
  isActive: boolean
}

export function AnimatedTasks({ isActive }: AnimatedTasksProps) {
  const [taskStates, setTaskStates] = useState([false, false])
  const [animatingTask, setAnimatingTask] = useState(-1)
  const [isRestarting, setIsRestarting] = useState(false)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
  }

  useEffect(() => {
    clearAllTimeouts()

    if (!isActive) {
      setTaskStates([false, false])
      setAnimatingTask(-1)
      setIsRestarting(false)
      return
    }

    const runAnimation = () => {
      clearAllTimeouts()

      // Restart animation cue
      setIsRestarting(true)
      const restartTimeout = setTimeout(() => {
        setIsRestarting(false)
        setTaskStates([false, false])
        setAnimatingTask(-1)
      }, 600)
      timeoutRefs.current.push(restartTimeout)

      // First task animation
      const timeout1 = setTimeout(() => {
        setAnimatingTask(0)
        const timeout2 = setTimeout(() => {
          setTaskStates([true, false])
          setAnimatingTask(-1)
        }, 1000)
        timeoutRefs.current.push(timeout2)
      }, 1200)
      timeoutRefs.current.push(timeout1)

      // Second task animation
      const timeout3 = setTimeout(() => {
        setAnimatingTask(1)
        const timeout4 = setTimeout(() => {
          setTaskStates([true, true])
          setAnimatingTask(-1)
        }, 1000)
        timeoutRefs.current.push(timeout4)
      }, 3200)
      timeoutRefs.current.push(timeout3)

      // Reset and restart
      const timeout5 = setTimeout(() => {
        if (isActive) {
          runAnimation()
        }
      }, 6000)
      timeoutRefs.current.push(timeout5)
    }

    runAnimation()

    return () => {
      clearAllTimeouts()
    }
  }, [isActive])

  return (
    <motion.div
      className="w-full max-w-xs sm:max-w-sm space-y-3 px-2 sm:px-0"
      animate={isRestarting ? { scale: [1, 0.98, 1] } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {tasks.map((task, index) => {
        const IconComponent = task.icon
        const isCompleted = taskStates[index]
        const isAnimating = animatingTask === index

        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: isRestarting ? 0.98 : 1,
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.5,
              scale: { duration: 0.6, ease: "easeInOut" },
            }}
            className={`relative bg-[#3c3836] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#504945] transition-all duration-700 ${
              isAnimating ? "scale-[1.01]" : ""
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Icon */}
              <div
                className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-700 overflow-hidden flex-shrink-0 ${
                  isCompleted ? "bg-green-500" : task.bgColor
                }`}
              >
                {/* Original icon */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    isCompleted ? "scale-0 opacity-0 rotate-180" : "scale-100 opacity-100 rotate-0"
                  }`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>

                {/* Checkmark */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    isCompleted ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-180"
                  }`}
                >
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
              </div>

              {/* Content - Left aligned */}
              <div className="flex-1 min-w-0 text-left">
                <h3
                  className={`font-medium text-[#ebdbb2] mb-1 sm:mb-2 transition-all duration-500 text-sm sm:text-base truncate ${
                    isCompleted ? "line-through opacity-60" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full border ${task.borderColor} ${task.categoryColor} bg-transparent inline-block transition-all duration-300 ${
                    isCompleted ? "opacity-60" : ""
                  }`}
                >
                  {task.category}
                </span>
              </div>

              {/* Arrow */}
              <div
                className={`transition-all duration-300 flex-shrink-0 ${isCompleted ? "opacity-40" : "opacity-100"}`}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-2 border-r-2 border-[#ebdbb2]/60 transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Bottom border animation */}
            {isAnimating && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fe8019] rounded-b-xl sm:rounded-b-2xl"></div>
            )}

            {/* Subtle restart indicator */}
            {isRestarting && <div className="absolute inset-0 bg-[#fe8019]/5 rounded-xl sm:rounded-2xl"></div>}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
