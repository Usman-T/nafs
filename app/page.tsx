import Link from "next/link"
import {
  Calendar,
  Star,
  Award,
  ChevronRight,
  Users,
  BookOpen,
  Heart,
  Moon,
  Compass,
  HandIcon as PrayingHands,
  Sunrise,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Update the SpiderChart function to use dark mode colors
function SpiderChart({ small, large }: { small?: boolean; large?: boolean }) {
  const size = small ? 120 : large ? 350 : 250
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

      {/* Filled area */}
      <path d={path} fill="#b35309" fillOpacity="0.3" stroke="#d65d0e" strokeWidth="2" />

      {/* Data points */}
      {points.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="4" fill="#d65d0e" />
      ))}

      {/* Labels (only for large version) */}
      {large &&
        points.map((point, i) => {
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

// Replace the entire return statement with this dark mode version
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#121212]">
      <header className="sticky top-0 z-40 border-b border-[#2e2e2e] bg-[#121212]/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-[#d65d0e]" />
            <span className="text-xl font-bold text-[#e0e0e0]">Spiritual Path</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-[#909090] hover:text-[#d65d0e]">
              Features
            </Link>
            <Link href="#dimensions" className="text-sm font-medium text-[#909090] hover:text-[#d65d0e]">
              Dimensions
            </Link>
            <Link href="#challenges" className="text-sm font-medium text-[#909090] hover:text-[#d65d0e]">
              Challenges
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-md border border-[#2e2e2e] bg-transparent px-4 py-2 text-sm font-medium text-[#e0e0e0] shadow-sm transition-colors hover:bg-[#1e1e1e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d65d0e]"
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-[#d65d0e] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b35309] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d65d0e]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-5 bg-repeat"></div>
          <div className="container relative">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border border-[#2e2e2e] bg-[#1e1e1e] px-3 py-1 text-sm">
                  <Star className="mr-1 h-3.5 w-3.5 text-[#d65d0e]" />
                  <span className="text-[#e0e0e0]">Islamic Spiritual Growth</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-[#e0e0e0] sm:text-5xl md:text-6xl">
                  Track Your Journey to Spiritual Enlightenment
                </h1>
                <p className="max-w-[600px] text-lg text-[#909090]">
                  Monitor your spiritual progress, strengthen your faith, and grow closer to Allah with our
                  comprehensive Islamic enlightenment tracker.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#d65d0e] px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b35309] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d65d0e]"
                  >
                    Begin Your Journey
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#2e2e2e] bg-transparent px-8 text-sm font-medium text-[#e0e0e0] shadow-sm transition-colors hover:bg-[#1e1e1e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d65d0e]"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] overflow-hidden rounded-lg border-4 border-[#2e2e2e] bg-[#1e1e1e] shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-[250px] w-[250px]">
                      <SpiderChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 bg-[#1a1a1a]">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#e0e0e0] mb-4">Main Features</h2>
              <p className="text-[#909090] max-w-2xl mx-auto">
                Track your spiritual journey with our comprehensive set of tools designed to help you grow in your
                Islamic faith.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-[#1e1e1e] border-[#2e2e2e]">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-[#d65d0e] mb-2" />
                  <CardTitle className="text-[#e0e0e0]">Progress Calendars</CardTitle>
                  <CardDescription className="text-[#909090]">
                    Track your daily prayers, Quran readings, and other spiritual practices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 w-8 rounded-md flex items-center justify-center text-xs font-medium ${
                          i % 3 === 0
                            ? "bg-[#d65d0e] text-white"
                            : i % 4 === 0
                              ? "bg-[#b35309] text-white"
                              : "bg-[#2e2e2e] text-[#e0e0e0]"
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-[#d65d0e] hover:text-[#fe8019]"
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-[#1e1e1e] border-[#2e2e2e]">
                <CardHeader>
                  <Compass className="h-10 w-10 text-[#d65d0e] mb-2" />
                  <CardTitle className="text-[#e0e0e0]">Spiritual Dimensions</CardTitle>
                  <CardDescription className="text-[#909090]">
                    Visualize your growth across 7 key dimensions of Islamic spirituality.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[150px] flex items-center justify-center">
                    <div className="h-[120px] w-[120px]">
                      <SpiderChart small />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#dimensions"
                    className="inline-flex items-center text-sm font-medium text-[#d65d0e] hover:text-[#fe8019]"
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-[#1e1e1e] border-[#2e2e2e]">
                <CardHeader>
                  <Award className="h-10 w-10 text-[#d65d0e] mb-2" />
                  <CardTitle className="text-[#e0e0e0]">Spiritual Challenges</CardTitle>
                  <CardDescription className="text-[#909090]">
                    Complete challenges with 5 tasks each to grow in specific dimensions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["Prayer Focus", "Quran Memorization", "Charity"].map((challenge, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-[#e0e0e0]">{challenge}</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <div
                              key={j}
                              className={`h-4 w-4 rounded-full mx-0.5 ${j < i + 2 ? "bg-[#d65d0e]" : "bg-[#2e2e2e]"}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#challenges"
                    className="inline-flex items-center text-sm font-medium text-[#d65d0e] hover:text-[#fe8019]"
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="dimensions" className="py-12 md:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#e0e0e0] mb-4">7 Dimensions of Spiritual Growth</h2>
              <p className="text-[#909090] max-w-2xl mx-auto">
                Our tracker helps you visualize and improve in these key areas of Islamic spirituality.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <div className="h-[350px] w-[350px]">
                  <SpiderChart large />
                </div>
              </div>
              <div className="space-y-6">
                {[
                  {
                    icon: <PrayingHands className="h-6 w-6 text-[#d65d0e]" />,
                    title: "Salah (Prayer)",
                    description: "Consistency and quality of your five daily prayers",
                  },
                  {
                    icon: <BookOpen className="h-6 w-6 text-[#d65d0e]" />,
                    title: "Quran",
                    description: "Regular recitation, understanding and memorization",
                  },
                  {
                    icon: <Heart className="h-6 w-6 text-[#d65d0e]" />,
                    title: "Charity",
                    description: "Giving zakat, sadaqah and helping others",
                  },
                  {
                    icon: <Users className="h-6 w-6 text-[#d65d0e]" />,
                    title: "Community",
                    description: "Involvement with the Muslim ummah",
                  },
                  {
                    icon: <Moon className="h-6 w-6 text-[#d65d0e]" />,
                    title: "Dhikr",
                    description: "Remembrance of Allah throughout your day",
                  },
                  {
                    icon: <Compass className="h-6 w-6 text-[#d65d0e]" />,
                    title: "Knowledge",
                    description: "Learning Islamic teachings and wisdom",
                  },
                  {
                    icon: <Sunrise className="h-6 w-6 text-[#d65d0e]" />,
                    title: "Character",
                    description: "Developing akhlaq (good character) in daily life",
                  },
                ].map((dimension, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mr-4 mt-1">{dimension.icon}</div>
                    <div>
                      <h3 className="font-medium text-[#e0e0e0]">{dimension.title}</h3>
                      <p className="text-sm text-[#909090]">{dimension.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="challenges" className="py-12 md:py-20 bg-[#1a1a1a]">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#e0e0e0] mb-4">Spiritual Challenges</h2>
              <p className="text-[#909090] max-w-2xl mx-auto">
                Complete challenges to grow in specific dimensions of your spiritual journey.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Prayer Excellence",
                  dimension: "Salah",
                  tasks: [
                    "Pray all five daily prayers on time for 7 days",
                    "Add two sunnah prayers daily for 5 days",
                    "Learn the meaning of what you recite in prayer",
                    "Pray with full concentration for all prayers",
                    "Pray tahajjud (night prayer) for 3 nights",
                  ],
                },
                {
                  title: "Quran Connection",
                  dimension: "Quran",
                  tasks: [
                    "Read Quran daily for at least 15 minutes",
                    "Memorize a new surah",
                    "Study tafsir (explanation) of 5 verses",
                    "Implement one Quranic teaching in your life",
                    "Teach someone else what you've learned",
                  ],
                },
                {
                  title: "Community Service",
                  dimension: "Community",
                  tasks: [
                    "Attend congregational prayer at the masjid",
                    "Volunteer for a community service project",
                    "Check on a sick or elderly community member",
                    "Attend an Islamic lecture or class",
                    "Invite someone for a meal",
                  ],
                },
              ].map((challenge, i) => (
                <Card key={i} className="bg-[#1e1e1e] border-[#2e2e2e]">
                  <CardHeader>
                    <div className="inline-flex items-center rounded-full border border-[#2e2e2e] bg-[#252525] px-3 py-1 text-sm mb-2">
                      <span className="text-[#d65d0e]">{challenge.dimension}</span>
                    </div>
                    <CardTitle className="text-[#e0e0e0]">{challenge.title}</CardTitle>
                    <CardDescription className="text-[#909090]">
                      Complete all 5 tasks to master this challenge
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {challenge.tasks.map((task, j) => (
                        <li key={j} className="flex items-start">
                          <div
                            className={`mr-2 mt-1 h-4 w-4 rounded-full ${j < 2 ? "bg-[#d65d0e]" : "bg-[#2e2e2e]"}`}
                          />
                          <span className="text-sm text-[#e0e0e0]">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#d65d0e] hover:bg-[#b35309] text-white">Start Challenge</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container">
            <div className="rounded-lg bg-[#1e1e1e] p-8 md:p-12 border border-[#2e2e2e]">
              <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-[#e0e0e0] mb-4">Begin Your Spiritual Journey Today</h2>
                  <p className="text-[#909090] mb-6">
                    Join thousands of Muslims who are using our platform to track their spiritual growth, complete
                    challenges, and strengthen their connection with Allah.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#d65d0e] px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b35309] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d65d0e]"
                  >
                    Create Free Account
                  </Link>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#d65d0e] mb-2">7,500+</div>
                    <p className="text-[#909090]">Muslims tracking their spiritual journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#2e2e2e] bg-[#121212] py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Moon className="h-5 w-5 text-[#d65d0e]" />
              <span className="text-lg font-bold text-[#e0e0e0]">Spiritual Path</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
              <Link href="#" className="text-sm text-[#909090] hover:text-[#d65d0e]">
                About
              </Link>
              <Link href="#" className="text-sm text-[#909090] hover:text-[#d65d0e]">
                Features
              </Link>
              <Link href="#" className="text-sm text-[#909090] hover:text-[#d65d0e]">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-[#909090] hover:text-[#d65d0e]">
                Terms
              </Link>
              <Link href="#" className="text-sm text-[#909090] hover:text-[#d65d0e]">
                Contact
              </Link>
            </nav>
            <div className="text-sm text-[#909090]">
              &copy; {new Date().getFullYear()} Spiritual Path. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
