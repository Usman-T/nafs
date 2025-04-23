import Link from "next/link"
import { ChevronRight, ChevronLeft, BookOpen, Heart, Users, Moon, Compass, Sunrise } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HandIcon as PrayingHands } from "lucide-react"

export default function DimensionsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/onboarding">
          <Button variant="ghost" className="text-dark-fg1 hover:text-dark-fg0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-8 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-bg2"></div>
          <div className="h-2 w-2 rounded-full bg-dark-bg2"></div>
          <div className="h-2 w-2 rounded-full bg-dark-bg2"></div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-dark-fg0">The 7 Dimensions of Spiritual Growth</h1>
        <p className="text-lg text-dark-fg1 max-w-2xl mx-auto">
          Our tracker helps you visualize and improve in these key areas of Islamic spirituality
        </p>
      </div>

      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light"></div>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="h-[350px] w-[350px]">
                <SpiderChart large />
              </div>
            </div>
            <div className="space-y-6 animate-slide-up">
              {[
                {
                  icon: <PrayingHands className="h-6 w-6 text-dark-orange-light" />,
                  title: "Salah (Prayer)",
                  description: "Consistency and quality of your five daily prayers",
                },
                {
                  icon: <BookOpen className="h-6 w-6 text-dark-orange-light" />,
                  title: "Quran",
                  description: "Regular recitation, understanding and memorization",
                },
                {
                  icon: <Heart className="h-6 w-6 text-dark-orange-light" />,
                  title: "Charity",
                  description: "Giving zakat, sadaqah and helping others",
                },
                {
                  icon: <Users className="h-6 w-6 text-dark-orange-light" />,
                  title: "Community",
                  description: "Involvement with the Muslim ummah",
                },
                {
                  icon: <Moon className="h-6 w-6 text-dark-orange-light" />,
                  title: "Dhikr",
                  description: "Remembrance of Allah throughout your day",
                },
                {
                  icon: <Compass className="h-6 w-6 text-dark-orange-light" />,
                  title: "Knowledge",
                  description: "Learning Islamic teachings and wisdom",
                },
                {
                  icon: <Sunrise className="h-6 w-6 text-dark-orange-light" />,
                  title: "Character",
                  description: "Developing akhlaq (good character) in daily life",
                },
              ].map((dimension, i) => (
                <div key={i} className="flex items-start">
                  <div className="mr-4 mt-1 bg-dark-bg2 p-2 rounded-md">{dimension.icon}</div>
                  <div>
                    <h3 className="font-medium text-dark-fg0">{dimension.title}</h3>
                    <p className="text-sm text-dark-fg1">{dimension.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/onboarding/challenges">
          <Button className="bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
            Next: Challenges
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function SpiderChart({ large }: { large?: boolean }) {
  const size = large ? 350 : 250
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
            fontSize="12"
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
