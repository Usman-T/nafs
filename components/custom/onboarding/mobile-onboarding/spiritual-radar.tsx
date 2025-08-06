"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { iconMap } from "@/lib/iconMap"
import { X } from "lucide-react"

const dimensions = [
  {
    name: "Knowledge",
    description: "Learning for the soul through Quran and Sunnah",
    color: "#FFD300",
    icon: "BookOpen",
    value: 0.85,
  },
  {
    name: "Body",
    description: "The amana of your health and physical well-being",
    color: "#00BFFF",
    icon: "Dumbbell",
    value: 0.72,
  },
  {
    name: "Purpose",
    description: "Ambition for the akhira and worldly success",
    color: "#B026FF",
    icon: "Target",
    value: 0.68,
  },
  {
    name: "Faith",
    description: "Iman in practice and spiritual connection",
    color: "#00FFFF",
    icon: "Sparkles",
    value: 0.91,
  },
  {
    name: "Character",
    description: "The Sunnah in action and noble conduct",
    color: "#39FF14",
    icon: "HeartHandshake",
    value: 0.79,
  },
  {
    name: "Discipline",
    description: "Mastering the self and building consistency",
    color: "#FF073A",
    icon: "AlarmClock",
    value: 0.64,
  },
  {
    name: "Remembrance",
    description: "Inner connection to Allah through dhikr",
    color: "#FF6EC7",
    icon: "Brain",
    value: 0.88,
  },
]

interface CustomRadarChartProps {
  isActive?: boolean
}

export function SpiritualRadar({ isActive = false }: CustomRadarChartProps) {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const hasBeenActiveRef = useRef(false)
  const size = 280
  const center = size / 2
  const radius = size * 0.35

  useEffect(() => {
    if (isActive) {
      setAnimationComplete(false)
      const isFirstTime = !hasBeenActiveRef.current
      hasBeenActiveRef.current = true
      
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, isFirstTime ? 2500 : 1200) 
      
      return () => clearTimeout(timer)
    } else {
      setAnimationComplete(false)
      setSelectedDimension(null)
    }
  }, [isActive])

  // Calculate points on the chart
  const points = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
    return {
      x: center + radius * Math.cos(angle) * dim.value,
      y: center + radius * Math.sin(angle) * dim.value,
      fullX: center + radius * Math.cos(angle),
      fullY: center + radius * Math.sin(angle),
      labelX: center + radius * 1.15 * Math.cos(angle),
      labelY: center + radius * 1.15 * Math.sin(angle),
      name: dim.name,
      color: dim.color,
      value: dim.value,
      description: dim.description,
      icon: dim.icon,
      angle,
    }
  })

  const path =
    points.map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y).join(" ") + "Z"

  const handleDimensionClick = (dimensionName: string) => {
    setSelectedDimension(selectedDimension === dimensionName ? null : dimensionName)
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }

  const selectedDimensionData = selectedDimension
    ? dimensions.find((d) => d.name === selectedDimension)
    : null

  const selectedPoint = selectedDimension
    ? points.find((p) => p.name === selectedDimension)
    : null

  // Calculate popover position based on selected dimension
  const getPopoverPosition = () => {
    if (!selectedPoint) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    
    const xPercent = (selectedPoint.labelX / size) * 100
    const yPercent = (selectedPoint.labelY / size) * 100
    
    let left = `${xPercent}%`
    let top = `${yPercent}%`
    let transform = 'translate(-50%, -50%)'
    
    if (xPercent < 30) {
      left = `${xPercent + 15}%`
      transform = 'translate(0, -50%)'
    } else if (xPercent > 70) {
      left = `${xPercent - 15}%`
      transform = 'translate(-100%, -50%)'
    }
    
    if (yPercent < 25) {
      // Top - position below
      top = `${yPercent + 12}%`
      transform = transform.replace('-50%)', '0)')
    } else if (yPercent > 75) {
      // Bottom - position above
      top = `${yPercent - 12}%`
      transform = transform.replace('-50%)', '-100%)')
    }
    
    return { left, top, transform }
  }

  const isFirstTime = !hasBeenActiveRef.current || (isActive && !hasBeenActiveRef.current)

  return (
    <div className="relative w-full max-w-[280px] mx-auto" style={{ height: '280px' }}>
      {/* Popover */}
      {selectedDimensionData && selectedPoint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="absolute z-20 pointer-events-none"
          style={getPopoverPosition()}
        >
          <div className="bg-[#3c3836] border border-[#504945] rounded-lg p-4 shadow-lg min-w-[200px] pointer-events-auto">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 mb-2">
                {(() => {
                  const IconComponent = iconMap[selectedDimensionData.icon as keyof typeof iconMap]
                  return <IconComponent className="w-4 h-4" style={{ color: selectedDimensionData.color }} />
                })()}
                <h3 className="text-[#ebdbb2] font-semibold text-sm">{selectedDimensionData.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDimension(null)}
                className="text-[#ebdbb2]/60 hover:text-[#ebdbb2] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[#ebdbb2]/80 text-xs leading-relaxed">{selectedDimensionData.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#504945] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${selectedDimensionData.value * 100}%`,
                    backgroundColor: selectedDimensionData.color,
                  }}
                />
              </div>
              <span className="text-[#ebdbb2]/60 text-xs font-mono">
                {Math.round(selectedDimensionData.value * 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Concentric circles - only animate on first time */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
          <motion.circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="#3c3836"
            strokeWidth="1"
            opacity={0.3}
            initial={{ scale: 0, opacity: 0 }}
            animate={isActive ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: isFirstTime ? i * 0.1 : 0 
            }}
          />
        ))}

        {/* Radial lines - only animate on first time */}
        {points.map((point, i) => (
          <motion.line
            key={i}
            x1={center}
            y1={center}
            x2={point.fullX}
            y2={point.fullY}
            stroke="#3c3836"
            strokeWidth="1"
            opacity={0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            transition={{ 
              duration: isFirstTime ? 0.6 : 0.3, 
              delay: isFirstTime ? 0.5 + i * 0.08 : 0 
            }}
          />
        ))}

        {/* Filled area - animate from bottom to top on return visits */}
        <motion.path
          d={path}
          fill="rgba(254, 128, 25, 0.2)"
          stroke="#fe8019"
          strokeWidth="2"
          initial={isFirstTime ? { pathLength: 0, opacity: 0 } : { scaleY: 0, opacity: 0 }}
          animate={isActive ? 
            (isFirstTime ? { pathLength: 1, opacity: 1 } : { scaleY: 1, opacity: 1 }) : 
            (isFirstTime ? { pathLength: 0, opacity: 0 } : { scaleY: 0, opacity: 0 })
          }
          style={!isFirstTime ? { transformOrigin: `${center}px ${center + radius}px` } : {}}
          transition={{ 
            duration: isFirstTime ? 1.2 : 0.6, 
            delay: isFirstTime ? 1.1 : 0.2, 
            ease: "easeOut" 
          }}
        />

        {/* Data points - only show orange dot on selected */}
        {points.map((point, i) => {
          const isSelected = selectedDimension === point.name
          return (
            <g key={i}>
              {/* Only show dot if selected */}
              {isSelected && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#fe8019"
                  stroke="#ebdbb2"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                />
              )}

              {/* Invisible clickable area */}
              <circle
                cx={point.x}
                cy={point.y}
                r="15"
                fill="transparent"
                style={{ cursor: "pointer" }}
                onClick={() => handleDimensionClick(point.name)}
              />

              {/* Ripple effect for selected point */}
              {isSelected && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill="transparent"
                  stroke="#fe8019"
                  strokeWidth="1"
                  initial={{ r: 5, opacity: 0.8 }}
                  animate={{ r: 12, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                  }}
                />
              )}
            </g>
          )
        })}

        {/* Labels */}
        {points.map((point, i) => {
          const isSelected = selectedDimension === point.name

          return (
            <motion.text
              key={i}
              x={point.labelX}
              y={point.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill={isSelected ? "#ebdbb2" : point.color}
              fontWeight={isSelected ? "bold" : "500"}
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.4,
                delay: isActive ? (isFirstTime ? 1.8 + i * 0.05 : 0.8) : 0,
              }}
              style={{ cursor: "pointer" }}
              onClick={() => handleDimensionClick(point.name)}
            >
              {point.name}
            </motion.text>
          )
        })}
      </svg>

      {/* Pulsing ring only on Faith dimension - subtle interaction cue */}
      {animationComplete && !hasInteracted && (
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 overflow-visible pointer-events-none">
          {points.map((point, i) => {
            if (point.name !== "Faith") return null
            return (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                stroke="#00FFFF"
                strokeWidth="1"
                opacity={0.4}
                initial={{ r: 8, opacity: 0.4 }}
                animate={{ r: 18, opacity: 0 }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut"
                }}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}
