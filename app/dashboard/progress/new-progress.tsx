"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function NewProgressPage() {
  const dimensions = [
    {
      name: "Salah (Prayer)",
      value: 80,
      description: "Consistency and quality of your five daily prayers",
      history: [75, 76, 78, 80, 80, 80, 80],
      activities: [
        { date: "Today", name: "Fajr Prayer", impact: "+1%" },
        { date: "Today", name: "Dhuhr Prayer", impact: "+1%" },
        { date: "Today", name: "Asr Prayer", impact: "+1%" },
        { date: "Yesterday", name: "All 5 prayers", impact: "+3%" },
      ],
    },
    {
      name: "Quran",
      value: 60,
      description: "Regular recitation, understanding and memorization",
      history: [50, 52, 55, 58, 60, 60, 60],
      activities: [
        { date: "Today", name: "Read 5 pages", impact: "+1%" },
        { date: "Yesterday", name: "Memorized 3 verses", impact: "+2%" },
        { date: "3 days ago", name: "Studied tafsir", impact: "+3%" },
      ],
    },
    {
      name: "Charity",
      value: 70,
      description: "Giving zakat, sadaqah and helping others",
      history: [65, 65, 67, 68, 70, 70, 70],
      activities: [
        { date: "2 days ago", name: "Donated to masjid", impact: "+3%" },
        { date: "5 days ago", name: "Helped neighbor", impact: "+2%" },
      ],
    },
    {
      name: "Community",
      value: 50,
      description: "Involvement with the Muslim ummah",
      history: [45, 46, 48, 50, 50, 50, 50],
      activities: [
        { date: "3 days ago", name: "Attended halaqa", impact: "+3%" },
        { date: "1 week ago", name: "Community event", impact: "+2%" },
      ],
    },
    {
      name: "Dhikr",
      value: 90,
      description: "Remembrance of Allah throughout your day",
      history: [85, 86, 87, 88, 89, 90, 90],
      activities: [
        { date: "Today", name: "Morning adhkar", impact: "+1%" },
        { date: "Yesterday", name: "Evening adhkar", impact: "+1%" },
        { date: "2 days ago", name: "100 Istighfar", impact: "+2%" },
      ],
    },
    {
      name: "Knowledge",
      value: 70,
      description: "Learning Islamic teachings and wisdom",
      history: [65, 66, 67, 68, 69, 70, 70],
      activities: [
        { date: "Yesterday", name: "Hadith study", impact: "+1%" },
        { date: "3 days ago", name: "Islamic lecture", impact: "+2%" },
      ],
    },
    {
      name: "Character",
      value: 80,
      description: "Developing akhlaq (good character) in daily life",
      history: [75, 76, 77, 78, 79, 80, 80],
      activities: [
        { date: "Today", name: "Patience practice", impact: "+1%" },
        { date: "2 days ago", name: "Helped someone", impact: "+2%" },
      ],
    },
    {
      name: "Physical",
      value: 65,
      description: "Taking care of your physical health",
      history: [60, 61, 62, 63, 64, 65, 65],
      activities: [
        { date: "Today", name: "Gym workout", impact: "+1%" },
        { date: "Yesterday", name: "30 min walk", impact: "+1%" },
        { date: "3 days ago", name: "Sports activity", impact: "+2%" },
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
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#fbf1c7]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="salah">Salah</TabsTrigger>
              <TabsTrigger value="quran">Quran</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="flex h-[350px] w-full items-center justify-center">
                <SpiderChart large />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {dimensions.map((dimension, i) => (
                  <div key={i} className="rounded-lg bg-[#fbf1c7] p-3 text-center">
                    <div className="text-lg font-bold text-[#d65d0e]">{dimension.value}%</div>
                    <div className="text-xs text-[#665c54]">{dimension.name.split(" ")[0]}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {["salah", "quran", "physical"].map((tab, index) => {
              const dimension = dimensions.find((d) => d.name.toLowerCase().includes(tab))
              if (!dimension) return null

              return (
                <TabsContent key={tab} value={tab} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#3c3836]">{dimension.name}</span>
                      <span className="text-sm font-medium text-[#d65d0e]">{dimension.value}%</span>
                    </div>
                    <Progress value={dimension.value} className="h-2 bg-[#d5c4a1]" indicatorClassName="bg-[#d65d0e]" />
                    <p className="text-sm text-[#665c54]">{dimension.description}</p>
                  </div>

                  <div className="rounded-lg bg-[#fbf1c7] p-4">
                    <h4 className="mb-2 text-sm font-medium text-[#3c3836]">Weekly Progress</h4>
                    <div className="flex h-20 items-end gap-1">
                      {dimension.history.map((value, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-[#d65d0e]" style={{ height: `${value}%` }}></div>
                          <div className="mt-1 text-[10px] text-[#665c54]">
                            {i === 0 ? "7d" : i === 6 ? "Today" : `${6 - i}d`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#fbf1c7] p-4">
                    <h4 className="mb-2 text-sm font-medium text-[#3c3836]">Recent Activities</h4>
                    <ul className="space-y-2">
                      {dimension.activities.map((activity, i) => (
                        <li key={i} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-[#3c3836]">{activity.name}</span>
                            <span className="ml-2 text-xs text-[#665c54]">{activity.date}</span>
                          </div>
                          <span className="text-[#d65d0e]">{activity.impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-[#fbf1c7] p-3">
                      <div className="text-xs text-[#665c54]">Next Goal</div>
                      <div className="text-sm font-medium text-[#3c3836]">
                        {tab === "salah"
                          ? "Add regular Tahajjud prayer"
                          : tab === "quran"
                            ? "Complete Juz Amma memorization"
                            : "Exercise 4 times per week"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-[#fbf1c7] p-3">
                      <div className="text-xs text-[#665c54]">Streak</div>
                      <div className="text-sm font-medium text-[#3c3836]">
                        {tab === "salah"
                          ? "7 days of 5 prayers"
                          : tab === "quran"
                            ? "5 days of reading"
                            : "3 days of exercise"}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function SpiderChart({ large = true }) {
  const size = large ? 350 : 250
  const center = size / 2
  const radius = size * 0.4

  // 8 dimensions with different values (0-1)
  const dimensions = [
    { name: "Salah", value: 0.8 },
    { name: "Quran", value: 0.6 },
    { name: "Charity", value: 0.7 },
    { name: "Community", value: 0.5 },
    { name: "Dhikr", value: 0.9 },
    { name: "Knowledge", value: 0.7 },
    { name: "Character", value: 0.8 },
    { name: "Physical", value: 0.65 },
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
            fontSize={large ? "12" : "10"}
            fill="#3c3836"
            fontWeight="500"
          >
            {point.name}
          </text>
        )
      })}
    </svg>
  )
}
