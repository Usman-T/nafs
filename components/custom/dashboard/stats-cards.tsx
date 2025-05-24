import { Calendar, Award, BarChart3 } from "lucide-react";
import StatsCard from "./stats-card";
import { fetchStatsData } from "@/lib/data";

const StatsCards = async () => {
  const statsData = await fetchStatsData();
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Current Streak",
            value: statsData.user.currentStreak,
            icon: <Calendar className="h-5 w-5 text-[#fe8019]" />,
            description: "Keep going! You're on a roll!",
            link: "/dashboard/calendar",
          },
          {
            title: "Active Challenge",
            value: statsData.activeChallenge,
            icon: <Award className="h-5 w-5 text-[#fe8019]" />,
            description: "Day 3 of 30 - 65% complete",
            link: "/dashboard/challenges",
          },
          {
            title: "Overall Growth",
            value: statsData.overallGrowth,
            icon: <BarChart3 className="h-5 w-5 text-[#fe8019]" />,
            description: "Your progress over time",
            link: "/dashboard/progress",
          },
        ].map((stat, i) => (
          <StatsCard stat={stat} key={i} />
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
