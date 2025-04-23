import Link from "next/link"
import {
  Award,
  Calendar,
  BarChart3,
  ChevronRight,
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  Plus,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Active Challenge Card */}
      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl text-dark-fg0">Active Challenge: Beginner's Path</CardTitle>
            <CardDescription className="text-dark-fg2">Day 1 of 3</CardDescription>
          </div>
          <Award className="h-6 w-6 text-dark-orange-light" />
        </CardHeader>
        <CardContent className="pb-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium text-dark-fg0">Challenge Progress</div>
            <div className="text-sm font-medium text-dark-fg0">1/3 days</div>
          </div>
          <Progress
            value={33.33}
            className="h-2 bg-dark-bg2"
            indicatorClassName="bg-gradient-to-r from-dark-orange to-dark-orange-light"
          />
        </CardContent>
        <CardContent>
          <h3 className="mb-3 text-sm font-medium text-dark-fg0">Today's Tasks</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-dark-orange-light" />
              <div>
                <span className="text-sm font-medium text-dark-fg0">Morning Prayer</span>
                <div className="text-xs text-dark-fg2">Category: Salah • +10 points</div>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-dark-orange-light" />
              <div>
                <span className="text-sm font-medium text-dark-fg0">Read 5 pages of Quran</span>
                <div className="text-xs text-dark-fg2">Category: Quran • +8 points</div>
              </div>
            </li>
            <li className="flex items-start">
              <Circle className="mr-2 mt-0.5 h-4 w-4 text-dark-fg2" />
              <div>
                <span className="text-sm font-medium text-dark-fg0">Donate to charity</span>
                <div className="text-xs text-dark-fg2">Category: Charity • +12 points</div>
              </div>
            </li>
            <li className="flex items-start">
              <Circle className="mr-2 mt-0.5 h-4 w-4 text-dark-fg2" />
              <div>
                <span className="text-sm font-medium text-dark-fg0">30 minutes of exercise</span>
                <div className="text-xs text-dark-fg2">Category: Physical • +5 points</div>
              </div>
            </li>
            <li className="flex items-start">
              <Circle className="mr-2 mt-0.5 h-4 w-4 text-dark-fg2" />
              <div>
                <span className="text-sm font-medium text-dark-fg0">Evening dhikr</span>
                <div className="text-xs text-dark-fg2">Category: Dhikr • +7 points</div>
              </div>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
            Mark Next Task Complete
          </Button>
        </CardFooter>
      </Card>

      {/* Dimension Tracker */}
      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light opacity-50"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-dark-fg0">Spiritual Dimensions</CardTitle>
            <CardDescription className="text-dark-fg2">Scroll to view all dimensions</CardDescription>
          </div>
          <BarChart3 className="h-6 w-6 text-dark-orange-light" />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4 grid w-full grid-cols-2 bg-dark-bg0 rounded-md">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-dark-orange data-[state=active]:to-dark-orange-light data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-dark-orange data-[state=active]:to-dark-orange-light data-[state=active]:text-white"
              >
                Dimension Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="flex h-[220px] w-full items-center justify-center">
                <SpiderChart />
              </div>
            </TabsContent>
            <TabsContent value="details">
              <ScrollArea className="h-[220px] pr-4">
                <div className="space-y-4">
                  {[
                    { name: "Salah (Prayer)", value: 80, description: "Daily prayers and devotion" },
                    { name: "Quran", value: 60, description: "Reading and understanding" },
                    { name: "Charity", value: 70, description: "Giving and helping others" },
                    { name: "Community", value: 50, description: "Involvement with ummah" },
                    { name: "Dhikr", value: 90, description: "Remembrance of Allah" },
                    { name: "Knowledge", value: 70, description: "Islamic learning" },
                    { name: "Character", value: 80, description: "Good behavior (Akhlaq)" },
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
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Link
            href="/dashboard/progress"
            className="flex w-full items-center justify-center text-sm font-medium text-dark-orange-light hover:text-dark-fg0 transition-colors"
          >
            View Detailed Progress
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>

      {/* Simplified Calendar */}
      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light opacity-30"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-dark-fg0">Activity Calendar</CardTitle>
            <CardDescription className="text-dark-fg2">April 2025</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-dark-fg2 hover:text-dark-fg0 hover:bg-dark-bg2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Calendar className="h-6 w-6 text-dark-orange-light" />
            <Button variant="ghost" size="icon" className="h-8 w-8 text-dark-fg2 hover:text-dark-fg0 hover:bg-dark-bg2">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-xs font-medium text-dark-fg2">
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
                      ? "bg-gradient-to-r from-dark-orange to-dark-orange-light text-white"
                      : isPartial
                        ? "bg-dark-bg2 text-dark-orange-light"
                        : "bg-dark-bg0 text-dark-fg2"
                  }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-dark-orange" />
              <span className="text-xs text-dark-fg2">All tasks</span>
              <div className="ml-2 h-3 w-3 rounded-full bg-dark-bg2" />
              <span className="text-xs text-dark-fg2">Some tasks</span>
            </div>
            <Link
              href="/dashboard/calendar"
              className="flex items-center text-sm font-medium text-dark-orange-light hover:text-dark-fg0 transition-colors"
            >
              View Details
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Add Task Button */}
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" /> Add Custom Task
        </Button>
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
