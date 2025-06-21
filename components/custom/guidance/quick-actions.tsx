"use client"

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import {
  Bookmark,
  MessageSquare,
  Headphones,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const userStats = {
  totalReflections: 24,
  savedVerses: 18,
  completedSurahs: 3,
  listeningHours: 12.5,
  currentStreak: 7,
  totalReadingDays: 45,
};

const features = [
  {
    id: "audio",
    title: "Audio Player",
    description: "Listen to beautiful Quran recitations",
    icon: Headphones,
    color: "#8ec07c",
    route: "/dashboard/guidance/audio/1",
    stats: "12.5 hours listened",
    badge: "New",
  },
  {
    id: "saved",
    title: "Saved Verses",
    description: "Your bookmarked ayahs and favorites",
    icon: Bookmark,
    color: "#fabd2f",
    route: "/dashboard/guidance/saved",
    stats: `${userStats.savedVerses} verses saved`,
    badge: null,
  },
  {
    id: "reflections",
    title: "My Reflections",
    description: "Personal thoughts and insights",
    icon: MessageSquare,
    color: "#83a598",
    route: "/dashboard/guidance/reflections",
    stats: `${userStats.totalReflections} reflections`,
    badge: null,
  },
  {
    id: "progress",
    title: "Reading Progress",
    description: "Track your Quran journey",
    icon: BookOpen,
    color: "#d3869b",
    route: "/dashboard/guidance/surah",
    stats: `${userStats.completedSurahs} surahs completed`,
    badge: null,
  },
];
const QuickActions = () => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className="cursor-pointer"
          onClick={() => router.push(feature.route)}
        >
          <Card className="bg-[#282828] border-[#3c3836] overflow-hidden relative group h-full">
            <CardContent className="">
              <div className="flex items-center justify-center mb-3">
                <div
                  className="h-16 w-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon
                    className="h-8 w-8"
                    style={{ color: feature.color }}
                  />
                </div>
              </div>

              <h3 className="text-base font-semibold text-[#ebdbb2]  text-center group-hover:text-[#fe8019] transition-colors">
                {feature.title}
              </h3>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
