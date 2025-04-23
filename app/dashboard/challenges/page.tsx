import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChallengesPage() {
  const activeChallenge = {
    title: "Beginner's Path",
    description: "Start your spiritual journey with this 3-day challenge",
    progress: 33.33,
    currentDay: 1,
    totalDays: 3,
    tasks: [
      { text: "Complete all five daily prayers", completed: true, category: "Salah", points: 10 },
      { text: "Read 5 pages of Quran", completed: true, category: "Quran", points: 8 },
      { text: "Donate to charity", completed: false, category: "Charity", points: 12 },
      { text: "30 minutes of exercise", completed: false, category: "Physical", points: 5 },
      { text: "Evening dhikr", completed: false, category: "Dhikr", points: 7 },
    ],
  }

  const upcomingChallenges = [
    {
      title: "Intermediate Path",
      description: "Continue your journey with this 5-day challenge",
      days: 5,
      focusAreas: ["Prayer", "Quran", "Character"],
    },
    {
      title: "Advanced Path",
      description: "Deepen your practice with this 7-day challenge",
      days: 7,
      focusAreas: ["Knowledge", "Community", "Charity"],
    },
    {
      title: "Master Path",
      description: "Master your spiritual practice with this 10-day challenge",
      days: 10,
      focusAreas: ["All Dimensions"],
    },
  ]

  const completedChallenges = [
    {
      title: "Ramadan Special",
      description: "Special challenge for the holy month",
      completedOn: "March 15, 2025",
      earnedPoints: 250,
    },
    {
      title: "Dhikr Focus",
      description: "Focused on remembrance of Allah",
      completedOn: "February 28, 2025",
      earnedPoints: 180,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3c3836]">Challenges</h2>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4 bg-[#fbf1c7]">
          <TabsTrigger value="active">Active Challenge</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl text-


Now I'll create the new redesigned files based on your requirements:

\
\
