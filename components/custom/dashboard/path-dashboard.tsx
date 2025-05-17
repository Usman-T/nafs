"use client";

const SpiritualPath = ({
  currentLevel,
  currentStreak,
}: {
  currentLevel: number;
  currentStreak: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SpiritualPathComponent
        currentLevel={currentLevel}
        currentStreak={currentStreak}
        simplified={true}
      />
    </motion.div>
  );
};

export default SpiritualPath;

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  SproutIcon as Seedling,
  Sprout,
  TreesIcon as Plant,
  TreePine,
  Mountain,
  MountainSnow,
  Sunrise,
} from "lucide-react";
import Link from "next/link";

// Define the progression levels
const progressionLevels = [
  {
    level: 1,
    name: "Seedling",
    days: 3,
    icon: Seedling,
    description: "The beginning of your spiritual journey",
    color: "#8ec07c",
  },
  {
    level: 2,
    name: "Sprout",
    days: 5,
    icon: Sprout,
    description: "Growing stronger in your practice",
    color: "#b8bb26",
  },
  {
    level: 3,
    name: "Sapling",
    days: 7,
    icon: Plant,
    description: "Establishing deeper roots",
    color: "#83a598",
  },
  {
    level: 4,
    name: "Tree",
    days: 10,
    icon: TreePine,
    description: "Standing firm in your faith",
    color: "#fabd2f",
  },
  {
    level: 5,
    name: "Mountain",
    days: 14,
    icon: Mountain,
    description: "Reaching new spiritual heights",
    color: "#d3869b",
  },
  {
    level: 6,
    name: "Summit",
    days: 21,
    icon: MountainSnow,
    description: "Mastering spiritual discipline",
    color: "#fb4934",
  },
  {
    level: 7,
    name: "Enlightenment",
    days: 30,
    icon: Sunrise,
    description: "Achieving spiritual excellence",
    color: "#fe8019",
  },
];

interface SpiritualPathProps {
  currentLevel: number;
  currentStreak: number;
  simplified?: boolean; // New prop to control display mode
}

function SpiritualPathComponent({
  currentLevel = 1,
  currentStreak = 0,
  simplified = false,
}: SpiritualPathProps) {
  // Calculate progress to next level
  const currentLevelData =
    progressionLevels.find((level) => level.level === currentLevel) ||
    progressionLevels[0];
  const nextLevelData = progressionLevels.find(
    (level) => level.level === currentLevel + 1
  );

  const daysToNextLevel = nextLevelData
    ? nextLevelData.days - currentStreak
    : 0;
  const progressPercentage = nextLevelData
    ? Math.min(100, (currentStreak / nextLevelData.days) * 100)
    : 100;

  // If simplified mode is enabled, only show the current level info
  if (simplified) {
    const IconComponent = currentLevelData.icon;

    return (
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-[#ebdbb2] flex items-center justify-between">
            <span>Spiritual Level</span>
            <Link
              href="/dashboard/spiritual-path"
              className="text-[#fe8019] text-sm hover:underline"
            >
              View Full Path
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentLevelData.color }}
            >
              <IconComponent className="h-8 w-8 text-[#1d2021]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-[#ebdbb2]">
                {currentLevelData.name}
              </h3>
              <p className="text-sm text-[#a89984]">
                {currentLevelData.description}
              </p>
              <div className="text-sm text-[#fe8019]">Level {currentLevel}</div>
            </div>
          </div>

          {nextLevelData && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#a89984]">
                  Progress to {nextLevelData.name}
                </span>
                <span className="text-[#ebdbb2]">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="relative h-2 w-full bg-[#1d2021] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#fe8019] rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#a89984]">
                {daysToNextLevel > 0
                  ? `${daysToNextLevel} more days to reach ${nextLevelData.name}`
                  : `Ready to advance to ${nextLevelData.name}!`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Original full path display for the dedicated page
  return (
    <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-[#ebdbb2] text-center">
          The Path to Enlightenment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-[#a89984]">
            Can you progress through the spiritual ranks & achieve
            enlightenment?
          </p>
          {nextLevelData ? (
            <p className="text-sm text-[#fe8019]">
              {daysToNextLevel > 0
                ? `${daysToNextLevel} more days to reach ${nextLevelData.name}`
                : `Ready to advance to ${nextLevelData.name}!`}
            </p>
          ) : (
            <p className="text-sm text-[#fe8019]">
              You&apos;ve reached the highest level!
            </p>
          )}
        </div>

        <div className="relative">
          {/* Path line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#3c3836] -translate-y-1/2 z-0"></div>

          {/* Progress line */}
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#fe8019] -translate-y-1/2 z-0 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          {/* Level markers */}
          <div className="relative z-10 grid grid-cols-7 gap-1">
            {progressionLevels.map((level, index) => {
              const isPast = level.level < currentLevel;
              const isCurrent = level.level === currentLevel;

              const IconComponent = level.icon;

              return (
                <div key={level.level} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={cn(
                      "relative flex flex-col items-center mb-2",
                      isCurrent && "scale-110"
                    )}
                  >
                    <div
                      className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center mb-1",
                        isPast
                          ? "bg-[#3c3836] text-[#a89984]"
                          : isCurrent
                          ? `bg-[${level.color}] text-[#1d2021]`
                          : "bg-[#1d2021] text-[#504945]"
                      )}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium text-center",
                        isPast
                          ? "text-[#a89984]"
                          : isCurrent
                          ? "text-[#ebdbb2]"
                          : "text-[#504945]"
                      )}
                    >
                      {level.name}
                    </span>
                    <span
                      className={cn(
                        "text-xs",
                        isPast
                          ? "text-[#a89984]"
                          : isCurrent
                          ? "text-[#fe8019]"
                          : "text-[#504945]"
                      )}
                    >
                      {level.days} days
                    </span>

                    {isCurrent && (
                      <Badge className="absolute -top-6 bg-[#fe8019] text-[#1d2021]">
                        YOU ARE HERE
                      </Badge>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#1d2021] rounded-md p-4 border border-[#3c3836]">
          <h3 className="text-[#ebdbb2] font-medium mb-2">
            {currentLevelData.name} - Level {currentLevelData.level}
          </h3>
          <p className="text-sm text-[#a89984]">
            {currentLevelData.description}
          </p>
          <div className="mt-2 text-sm text-[#fe8019]">
            Current streak: {currentStreak} days
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
