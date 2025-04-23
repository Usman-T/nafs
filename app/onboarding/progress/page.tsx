import Link from "next/link"
import { ChevronRight, ChevronLeft, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProgressPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/onboarding/challenges">
          <Button variant="ghost" className="text-dark-fg1 hover:text-dark-fg0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-8 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-bg2"></div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-dark-fg0">Track Your Progress</h1>
        <p className="text-lg text-dark-fg1 max-w-2xl mx-auto">Visualize your spiritual growth across all dimensions</p>
      </div>

      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-dark-fg0">Spiritual Dimensions</CardTitle>
            <CardDescription className="text-dark-fg2">Your progress across all dimensions</CardDescription>
          </div>
          <BarChart3 className="h-6 w-6 text-dark-orange-light" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex h-[220px] w-full items-center justify-center">
            <SpiderChart />
          </div>

          <div className="space-y-4">
            {[
              { name: "Salah (Prayer)", value: 80, description: "Daily prayers and devotion" },
              { name: "Quran", value: 60, description: "Reading and understanding" },
              { name: "Charity", value: 70, description: "Giving and helping others" },
            ].map((dimension, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-dark-fg0">{dimension.name}</h4>
                    <p className="text-xs text-dark-fg2">{dimension.description}</p>
                  </div>
                  <span className="text-sm font-medium text-dark-orange-light">{dimension.value}/100</span>
                </div>
                <Progress
                  value={dimension.value}
                  className="h-2 bg-dark-bg2"
                  indicatorClassName="bg-gradient-to-r from-dark-orange to-dark-orange-light"
                />
              </div>
            ))}
            <div className="text-center text-dark-fg2 text-sm">
              <span>And 4 more dimensions...</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light opacity-50"></div>
          <CardHeader>
            <CardTitle className="text-dark-fg0">Weekly Progress</CardTitle>
            <CardDescription className="text-dark-fg2">Track your growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] w-full">
              <ProgressChart />
            </div>
          </CardContent>
        </Card>

        <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light opacity-50"></div>
          <CardHeader>
            <CardTitle className="text-dark-fg0">Achievements</CardTitle>
            <CardDescription className="text-dark-fg2">Milestones in your spiritual journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "First Challenge Completed",
                  description: "Completed your first spiritual challenge",
                  achieved: true,
                },
                {
                  name: "7-Day Streak",
                  description: "Maintained spiritual activities for 7 consecutive days",
                  achieved: true,
                },
                { name: "Dimension Master", description: "Reached 80+ in any spiritual dimension", achieved: false },
              ].map((achievement, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-md bg-dark-bg0">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${achievement.achieved ? "bg-gradient-to-r from-dark-orange to-dark-orange-light" : "bg-dark-bg2"}`}
                  >
                    {achievement.achieved ? "✓" : "?"}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-dark-fg0">{achievement.name}</div>
                    <div className="text-xs text-dark-fg2">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Link href="/onboarding/complete">
          <Button className="bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
            Next: Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function SpiderChart() {
  const size = 220
  const center = size / 2
  const radius = size * 0.4

  // 7 dimensions with different values (0-1)
  const dimensions = [
    { name: "Salah", value: 0.8 },
    { name: "Quran", value: 0.6 },
    { name: "Charity", value: 0.7 },
    { name: "Community", value: 0.5 },
    { name: "Dhikr", value: 0.9 },
    { name: "Knowledge", value: 0.7 },
    { name: "Character", value: 0.8 },
  ]

  // Calculate points on the chart
  const points = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
    return {
      x: center + radius * Math.cos(angle) * dim.value,
      y: center + radius * Math.sin(angle) * dim.value,
      fullX: center + radius * Math.cos(angle),
      fullY: center + radius * Math.sin(angle),
      name: dim.name,
    }
  })

  // Create the path for the filled area
  const path = points.map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y).join(" ") + "Z"

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Background circles */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius * level}
          fill="none"
          stroke="#2e2e2e"
          strokeWidth="1"
          strokeDasharray={i === 4 ? "none" : "2,2"}
        />
      ))}

      {/* Axis lines */}
      {points.map((point, i) => (
        <line key={i} x1={center} y1={center} x2={point.fullX} y2={point.fullY} stroke="#2e2e2e" strokeWidth="1" />
      ))}

      {/* Define gradient for filled area */}
      <defs>
        <linearGradient id="spiderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b35309" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d65d0e" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Filled area */}
      <path d={path} fill="url(#spiderGradient)" stroke="#b35309" strokeWidth="2" />

      {/* Data points */}
      {points.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="4" fill="#d65d0e" />
      ))}

      {/* Labels */}
      {points.map((point, i) => {
        const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
        const labelRadius = radius * 1.15
        const labelX = center + labelRadius * Math.cos(angle)
        const labelY = center + labelRadius * Math.sin(angle)

        return (
          <text
            key={i}
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#e0e0e0"
            fontWeight="500"
          >
            {point.name}
          </text>
        )
      })}
    </svg>
  )
}

function ProgressChart() {
  const history = [
    { date: "Apr 20", value: 80 },
    { date: "Apr 19", value: 78 },
    { date: "Apr 18", value: 75 },
    { date: "Apr 17", value: 72 },
    { date: "Apr 16", value: 70 },
    { date: "Apr 15", value: 68 },
    { date: "Apr 14", value: 65 },
  ]

  const maxValue = Math.max(...history.map((h) => h.value))
  const minValue = Math.min(...history.map((h) => h.value))
  const range = maxValue - minValue
  const paddedMax = maxValue + Math.max(5, range * 0.1)
  const paddedMin = Math.max(0, minValue - Math.max(5, range * 0.1))
  const paddedRange = paddedMax - paddedMin

  return (
    <svg width="100%" height="100%" viewBox="0 0 400 180">
      {/* Y-axis labels */}
      <text x="10" y="15" fontSize="10" fill="#909090">
        {Math.round(paddedMax)}
      </text>
      <text x="10" y="95" fontSize="10" fill="#909090">
        {Math.round((paddedMax + paddedMin) / 2)}
      </text>
      <text x="10" y="175" fontSize="10" fill="#909090">
        {Math.round(paddedMin)}
      </text>

      {/* X-axis labels */}
      {history.map((point, i) => (
        <text
          key={i}
          x={30 + i * (370 / (history.length - 1))}
          y="175"
          fontSize="10"
          fill="#909090"
          textAnchor="middle"
        >
          {point.date.split(" ")[1]}
        </text>
      ))}

      {/* Grid lines */}
      <line x1="30" y1="15" x2="30" y2="160" stroke="#2e2e2e" strokeWidth="1" />
      <line x1="30" y1="160" x2="400" y2="160" stroke="#2e2e2e" strokeWidth="1" />

      {/* Data points and line */}
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b35309" />
          <stop offset="100%" stopColor="#d65d0e" />
        </linearGradient>
      </defs>

      <polyline
        points={history
          .map((point, i) => {
            const x = 30 + i * (370 / (history.length - 1))
            const y = 160 - ((point.value - paddedMin) / paddedRange) * 145
            return `${x},${y}`
          })
          .join(" ")}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
      />

      {history.map((point, i) => {
        const x = 30 + i * (370 / (history.length - 1))
        const y = 160 - ((point.value - paddedMin) / paddedRange) * 145
        return <circle key={i} cx={x} cy={y} r="4" fill="#d65d0e" />
      })}
    </svg>
  )
}
