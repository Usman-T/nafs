import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OnboardingPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-dark-fg0">Welcome to Nafs</h1>
        <p className="text-xl text-dark-fg1 max-w-2xl mx-auto">Your journey to spiritual enlightenment begins here</p>
      </div>

      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light"></div>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 animate-slide-up">
              <h2 className="text-2xl font-bold text-dark-fg0">Track Your Spiritual Journey</h2>
              <p className="text-dark-fg1">
                Nafs helps you monitor your progress across seven key dimensions of Islamic spirituality,
                complete challenges, and grow closer to Allah.
              </p>
              <ul className="space-y-2">
                {[
                  "Track daily prayers and spiritual practices",
                  "Complete challenges to strengthen your faith",
                  "Visualize your growth across spiritual dimensions",
                  "Build consistent habits for spiritual growth",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-dark-fg1">
                    <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/onboarding/dimensions">
                  <Button className="bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
                    Start Onboarding
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[300px] w-[300px] rounded-full bg-dark-bg0/50 flex items-center justify-center shadow-dark-glow">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-dark-orange/10 to-dark-orange-light/5"></div>
                <div className="h-[220px] w-[220px]">
                  <SpiderChart />
                </div>
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-r from-dark-orange to-dark-orange-light flex items-center justify-center text-white font-bold text-xl shadow-orange-glow animate-pulse-slow">
                  7
                </div>
                <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-r from-dark-orange to-dark-orange-light flex items-center justify-center text-white font-bold shadow-orange-glow animate-pulse-slow">
                  5
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Track Daily Progress",
            description: "Monitor your daily spiritual activities and see your growth over time.",
            delay: "delay-100",
          },
          {
            title: "Complete Challenges",
            description: "Take on spiritual challenges to strengthen specific dimensions of your faith.",
            delay: "delay-200",
          },
          {
            title: "Visualize Growth",
            description: "See your spiritual journey visualized across all dimensions of Islamic practice.",
            delay: "delay-300",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className={`border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden animate-slide-up ${item.delay}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light opacity-50"></div>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-dark-fg0">{item.title}</h3>
              <p className="text-dark-fg1 text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
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
