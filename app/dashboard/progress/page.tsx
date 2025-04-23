"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProgressPage() {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null)

  const dimensions = [
    {
      name: "Salah (Prayer)",
      value: 80,
      description: "Consistency and quality of your five daily prayers",
      history: [
        { date: "Apr 20", value: 80 },
        { date: "Apr 19", value: 78 },
        { date: "Apr 18", value: 75 },
        { date: "Apr 17", value: 72 },
        { date: "Apr 16", value: 70 },
        { date: "Apr 15", value: 68 },
        { date: "Apr 14", value: 65 },
      ],
      tasks: [
        "Complete all five daily prayers",
        "Add sunnah prayers",
        "Pray with full concentration",
        "Learn meaning of recitations",
        "Pray in congregation when possible",
      ],
    },
    {
      name: "Quran",
      value: 60,
      description: "Regular recitation, understanding and memorization",
      history: [
        { date: "Apr 20", value: 60 },
        { date: "Apr 19", value: 58 },
        { date: "Apr 18", value: 55 },
        { date: "Apr 17", value: 55 },
        { date: "Apr 16", value: 52 },
        { date: "Apr 15", value: 50 },
        { date: "Apr 14", value: 48 },
      ],
      tasks: [
        "Read Quran daily",
        "Memorize new verses",
        "Study tafsir (explanation)",
        "Reflect on meanings",
        "Practice tajweed rules",
      ],
    },
    {
      name: "Charity",
      value: 70,
      description: "Giving zakat, sadaqah and helping others",
      history: [
        { date: "Apr 20", value: 70 },
        { date: "Apr 19", value: 70 },
        { date: "Apr 18", value: 68 },
        { date: "Apr 17", value: 65 },
        { date: "Apr 16", value: 65 },
        { date: "Apr 15", value: 62 },
        { date: "Apr 14", value: 60 },
      ],
      tasks: [
        "Give regular sadaqah",
        "Help someone in need",
        "Volunteer time for good cause",
        "Share knowledge with others",
        "Support a charitable organization",
      ],
    },
    {
      name: "Community",
      value: 50,
      description: "Involvement with the Muslim ummah",
      history: [
        { date: "Apr 20", value: 50 },
        { date: "Apr 19", value: 48 },
        { date: "Apr 18", value: 48 },
        { date: "Apr 17", value: 45 },
        { date: "Apr 16", value: 45 },
        { date: "Apr 15", value: 42 },
        { date: "Apr 14", value: 40 },
      ],
      tasks: [
        "Attend congregational prayers",
        "Participate in community events",
        "Visit the sick or elderly",
        "Attend Islamic classes",
        "Build relationships with Muslims",
      ],
    },
    {
      name: "Dhikr",
      value: 90,
      description: "Remembrance of Allah throughout your day",
      history: [
        { date: "Apr 20", value: 90 },
        { date: "Apr 19", value: 88 },
        { date: "Apr 18", value: 85 },
        { date: "Apr 17", value: 82 },
        { date: "Apr 16", value: 80 },
        { date: "Apr 15", value: 78 },
        { date: "Apr 14", value: 75 },
      ],
      tasks: [
        "Morning and evening adhkar",
        "Say bismillah before actions",
        "Recite istighfar regularly",
        "Remember Allah during activities",
        "Express gratitude to Allah",
      ],
    },
    {
      name: "Knowledge",
      value: 70,
      description: "Learning Islamic teachings and wisdom",
      history: [
        { date: "Apr 20", value: 70 },
        { date: "Apr 19", value: 68 },
        { date: "Apr 18", value: 65 },
        { date: "Apr 17", value: 65 },
        { date: "Apr 16", value: 62 },
        { date: "Apr 15", value: 60 },
        { date: "Apr 14", value: 58 },
      ],
      tasks: [
        "Study Islamic texts",
        "Listen to Islamic lectures",
        "Read books on Islam",
        "Learn from knowledgeable people",
        "Apply knowledge in daily life",
      ],
    },
    {
      name: "Character",
      value: 80,
      description: "Developing akhlaq (good character) in daily life",
      history: [
        { date: "Apr 20", value: 80 },
        { date: "Apr 19", value: 78 },
        { date: "Apr 18", value: 75 },
        { date: "Apr 17", value: 75 },
        { date: "Apr 16", value: 72 },
        { date: "Apr 15", value: 70 },
        { date: "Apr 14", value: 68 },
      ],
      tasks: [
        "Practice patience in difficulties",
        "Speak truthfully",
        "Control anger",
        "Show kindness to others",
        "Forgive those who wrong you",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3c3836]">Spiritual Progress</h2>
      </div>

      <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#3c3836]">Spiritual Dimensions</CardTitle>
          <CardDescription className="text-[#665c54]">Select a dimension to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[350px] w-full items-center justify-center">
            <SpiderChart onSelectDimension={setSelectedDimension} />
          </div>
        </CardContent>
      </Card>

      {selectedDimension ? (
        <DimensionDetail
          dimension={dimensions.find((d) => d.name.startsWith(selectedDimension)) || dimensions[0]}
          onClose={() => setSelectedDimension(null)}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {dimensions.map((dimension, i) => (
            <Card
              key={i}
              className="border-[#d5c4a1] bg-[#ebdbb2]/50 cursor-pointer hover:border-[#d65d0e]"
              onClick={() => setSelectedDimension(dimension.name.split(" ")[0])}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3c3836]">{dimension.name}</CardTitle>
                <CardDescription className="text-[#665c54]">{dimension.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#3c3836]">Current Level</span>
                    <span className="text-sm font-medium text-[#d65d0e]">{dimension.value}/100</span>
                  </div>
                  <Progress value={dimension.value} className="h-2 bg-[#d5c4a1]" indicatorClassName="bg-[#d65d0e]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function DimensionDetail({ dimension, onClose }: { dimension: any; onClose: () => void }) {
  return (
    <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#3c3836]">{dimension.name}</CardTitle>
          <button onClick={onClose} className="rounded-full p-1 text-[#665c54] hover:bg-[#d5c4a1] hover:text-[#3c3836]">
            ✕
          </button>
        </div>
        <CardDescription className="text-[#665c54]">{dimension.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress">
          <TabsList className="mb-4 grid w-full grid-cols-3 bg-[#fbf1c7]">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#3c3836]">Current Level</span>
                  <span className="text-sm font-medium text-[#d65d0e]">{dimension.value}/100</span>
                </div>
                <Progress value={dimension.value} className="h-2 bg-[#d5c4a1]" indicatorClassName="bg-[#d65d0e]" />
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-medium text-[#3c3836]">Level Breakdown</h3>
                <div className="rounded-md bg-[#fbf1c7] p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-[#665c54]">Daily Practice</div>
                      <div className="text-sm font-medium text-[#3c3836]">{Math.round(dimension.value * 0.4)}/40</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#665c54]">Consistency</div>
                      <div className="text-sm font-medium text-[#3c3836]">{Math.round(dimension.value * 0.3)}/30</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#665c54]">Quality</div>
                      <div className="text-sm font-medium text-[#3c3836]">{Math.round(dimension.value * 0.2)}/20</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#665c54]">Knowledge</div>
                      <div className="text-sm font-medium text-[#3c3836]">{Math.round(dimension.value * 0.1)}/10</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium text-[#3c3836]">Next Milestone</h3>
                <div className="rounded-md bg-[#fbf1c7] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#3c3836]">
                      {dimension.value} → {Math.min(100, Math.ceil(dimension.value / 10) * 10)}
                    </span>
                    <span className="text-xs text-[#665c54]">
                      {Math.min(100, Math.ceil(dimension.value / 10) * 10) - dimension.value} points needed
                    </span>
                  </div>
                  <Progress
                    value={(dimension.value % 10) * 10}
                    className="mt-2 h-2 bg-[#d5c4a1]"
                    indicatorClassName="bg-[#d65d0e]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-[#3c3836]">
                <span>7-Day Progress</span>
                <span className="text-[#d65d0e]">
                  +{dimension.history[0].value - dimension.history[6].value} points
                </span>
              </div>

              <div className="h-[180px] w-full">
                <ProgressChart history={dimension.history} />
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium text-[#3c3836]">Recent Activities</h3>
                <div className="space-y-2">
                  {[
                    {
                      date: "Apr 20",
                      activity: `Completed ${dimension.name.split(" ")[0].toLowerCase()} task`,
                      points: "+2",
                    },
                    {
                      date: "Apr 19",
                      activity: `Added new ${dimension.name.split(" ")[0].toLowerCase()} habit`,
                      points: "+3",
                    },
                    {
                      date: "Apr 18",
                      activity: `Consistent ${dimension.name.split(" ")[0].toLowerCase()} practice`,
                      points: "+2",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md bg-[#fbf1c7] p-2">
                      <div>
                        <div className="text-xs text-[#665c54]">{item.date}</div>
                        <div className="text-sm text-[#3c3836]">{item.activity}</div>
                      </div>
                      <div className="text-sm font-medium text-[#d65d0e]">{item.points}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#3c3836]">Recommended Tasks</h3>
              <div className="space-y-2">
                {dimension.tasks.map((task: string, i: number) => (
                  <div key={i} className="flex items-center justify-between rounded-md bg-[#fbf1c7] p-3">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#d5c4a1]">
                        {i < 2 ? "✓" : i + 1}
                      </div>
                      <span className="text-sm text-[#3c3836]">{task}</span>
                    </div>
                    <div className="text-xs font-medium text-[#d65d0e]">+{10 - i} pts</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="w-full rounded-md bg-[#d65d0e] py-2 text-sm font-medium text-white hover:bg-[#af3a03]">
                  Add Custom Task
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ProgressChart({ history }: { history: { date: string; value: number }[] }) {
  const maxValue = Math.max(...history.map((h) => h.value))
  const minValue = Math.min(...history.map((h) => h.value))
  const range = maxValue - minValue
  const paddedMax = maxValue + Math.max(5, range * 0.1)
  const paddedMin = Math.max(0, minValue - Math.max(5, range * 0.1))
  const paddedRange = paddedMax - paddedMin

  return (
    <svg width="100%" height="100%" viewBox="0 0 400 180">
      {/* Y-axis labels */}
      <text x="10" y="15" fontSize="10" fill="#665c54">
        {Math.round(paddedMax)}
      </text>
      <text x="10" y="95" fontSize="10" fill="#665c54">
        {Math.round((paddedMax + paddedMin) / 2)}
      </text>
      <text x="10" y="175" fontSize="10" fill="#665c54">
        {Math.round(paddedMin)}
      </text>

      {/* X-axis labels */}
      {history.map((point, i) => (
        <text
          key={i}
          x={30 + i * (370 / (history.length - 1))}
          y="175"
          fontSize="10"
          fill="#665c54"
          textAnchor="middle"
        >
          {point.date.split(" ")[1]}
        </text>
      ))}

      {/* Grid lines */}
      <line x1="30" y1="15" x2="30" y2="160" stroke="#d5c4a1" strokeWidth="1" />
      <line x1="30" y1="160" x2="400" y2="160" stroke="#d5c4a1" strokeWidth="1" />

      {/* Data points and line */}
      <polyline
        points={history
          .map((point, i) => {
            const x = 30 + i * (370 / (history.length - 1))
            const y = 160 - ((point.value - paddedMin) / paddedRange) * 145
            return `${x},${y}`
          })
          .join(" ")}
        fill="none"
        stroke="#d65d0e"
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

function SpiderChart({ onSelectDimension }: { onSelectDimension: (name: string) => void }) {
  const size = 350
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
      angle,
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
          stroke="#d5c4a1"
          strokeWidth="1"
          strokeDasharray={i === 4 ? "none" : "2,2"}
        />
      ))}

      {/* Axis lines */}
      {points.map((point, i) => (
        <line key={i} x1={center} y1={center} x2={point.fullX} y2={point.fullY} stroke="#d5c4a1" strokeWidth="1" />
      ))}

      {/* Filled area */}
      <path d={path} fill="#fe8019" fillOpacity="0.3" stroke="#d65d0e" strokeWidth="2" />

      {/* Interactive areas */}
      {points.map((point, i) => {
        const interactiveRadius = radius * 0.3
        const ix = center + radius * 0.7 * Math.cos(point.angle)
        const iy = center + radius * 0.7 * Math.sin(point.angle)

        return (
          <g key={i} onClick={() => onSelectDimension(point.name)} style={{ cursor: "pointer" }}>
            {/* Invisible larger circle for better click target */}
            <circle cx={ix} cy={iy} r={interactiveRadius} fill="transparent" />

            {/* Visible data point */}
            <circle cx={point.x} cy={point.y} r="4" fill="#d65d0e" />

            {/* Label */}
            <text
              x={center + radius * 1.15 * Math.cos(point.angle)}
              y={center + radius * 1.15 * Math.sin(point.angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#3c3836"
              fontWeight="500"
            >
              {point.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
