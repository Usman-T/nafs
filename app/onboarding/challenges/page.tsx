import Link from "next/link"
import { ChevronRight, ChevronLeft, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ChallengesPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/onboarding/dimensions">
          <Button variant="ghost" className="text-dark-fg1 hover:text-dark-fg0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-8 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-bg2"></div>
          <div className="h-2 w-2 rounded-full bg-dark-bg2"></div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-dark-fg0">Spiritual Challenges</h1>
        <p className="text-lg text-dark-fg1 max-w-2xl mx-auto">
          Complete challenges to grow in specific dimensions of your spiritual journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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
          <Card
            key={i}
            className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden animate-slide-up"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light"></div>
            <CardHeader>
              <div className="inline-flex items-center rounded-full border border-dark-bg2 bg-dark-bg0 px-3 py-1 text-sm mb-2">
                <span className="text-dark-orange-light">{challenge.dimension}</span>
              </div>
              <CardTitle className="text-dark-fg0">{challenge.title}</CardTitle>
              <CardDescription className="text-dark-fg2">Complete all 5 tasks to master this challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {challenge.tasks.map((task, j) => (
                  <li key={j} className="flex items-start">
                    <div
                      className={`mr-2 mt-1 h-4 w-4 rounded-full ${j < 2 ? "bg-dark-orange-light" : "bg-dark-bg2"}`}
                    />
                    <span className="text-sm text-dark-fg0">{task}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
                Start Challenge
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light opacity-70"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl text-dark-fg0">How Challenges Work</CardTitle>
            <CardDescription className="text-dark-fg2">Complete tasks to improve specific dimensions</CardDescription>
          </div>
          <Award className="h-6 w-6 text-dark-orange-light" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-dark-fg1">
              Each challenge focuses on specific spiritual dimensions. As you complete tasks, you'll earn points that
              contribute to your growth in those dimensions.
            </p>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-dark-fg0">Challenge Progress</span>
                  <span className="text-sm font-medium text-dark-fg0">2/5 tasks</span>
                </div>
                <Progress
                  value={40}
                  className="h-2 bg-dark-bg2"
                  indicatorClassName="bg-gradient-to-r from-dark-orange to-dark-orange-light"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-dark-fg2">Dimension Impact</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-3 w-3 rounded-full bg-dark-orange-light"></div>
                    <span className="text-sm text-dark-fg0">Salah +15 points</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-dark-fg2">Streak Bonus</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-3 w-3 rounded-full bg-dark-orange"></div>
                    <span className="text-sm text-dark-fg0">+5 points per day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/onboarding/progress">
          <Button className="bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
            Next: Progress Tracking
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
