"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Flame,
  Target,
  Heart,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  Quote,
  Scroll,
  ArrowRight,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Logo from "../logo";
import { iconMap } from "@/lib/iconMap";
const Particle = ({
  color,
  size: baseSize = 6,
  speed = 1,
  top = "random",
  left = "random",
}: {
  color: string;
  size?: number;
  speed?: number;
  top?: string | number;
  left?: string | number;
}) => {
  const randomX = typeof left === "string" ? Math.random() * 100 : left;
  const randomY = typeof top === "string" ? Math.random() * 100 : top;
  const size = Math.random() * baseSize + 2;
  const duration = (Math.random() * 10 + 10) / speed;
  const delay = Math.random() * 2;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top: typeof randomY === "number" ? `${randomY}%` : randomY,
        left: typeof randomX === "number" ? `${randomX}%` : randomX,
      }}
      initial={{ opacity: 0 }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 0.4, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

const EnhancedFloatingParticles = ({ count = 25 }: { count?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="relative mb-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Particle key={i} color="#fe8019" speed={1.5} />
      ))}
    </motion.div>
  );
};

// Interactive Radar Chart with enhanced animations
const InteractiveRadarDemo = ({ isActive }: { isActive: boolean }) => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(
    null
  );
  const [userInteracted, setUserInteracted] = useState(false);

  const dimensions = [
    {
      name: "Knowledge",
      description: "Learning for the soul...",
      color: "#FFD300",
      icon: "BookOpen",
      value: 0.7,
    },
    {
      name: "Body",
      description: "The amana of your health",
      color: "#00BFFF",
      icon: "Dumbbell",
      value: 0.6,
    },
    {
      name: "Purpose",
      description: "Ambition for the akhira",
      color: "#B026FF",
      icon: "Target",
      value: 0.5,
    },
    {
      name: "Faith",
      description: "Iman in practice - Salah",
      color: "#00FFFF",
      icon: "Sparkles",
      value: 0.8,
    },
    {
      name: "Character",
      description: "The Sunnah in action",
      color: "#39FF14",
      icon: "HeartHandshake",
      value: 0.7,
    },
    {
      name: "Discipline",
      description: "Mastering the self",
      color: "#FF073A",
      icon: "AlarmClock",
      value: 0.6,
    },
    {
      name: "Remembrance",
      description: "Inner connection to Allah",
      color: "#FF6EC7",
      icon: "Brain",
      value: 0.9,
    },
  ];

  const size = 240;
  const center = size / 2;
  const radius = size * 0.35;

  const points = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
    const animatedValue = dim.value; // Removed the random animation

    return {
      x: center + radius * Math.cos(angle) * animatedValue,
      y: center + radius * Math.sin(angle) * animatedValue,
      fullX: center + radius * Math.cos(angle),
      fullY: center + radius * Math.sin(angle),
      ...dim,
      angle,
    };
  });

  const path =
    points
      .map((point, i) => (i === 0 ? "M" : "L") + point.x + "," + point.y)
      .join(" ") + "Z";

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg width={size} height={size} className="mx-auto">
          {/* Background rings */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
            <polygon
              key={i}
              points={Array.from({ length: dimensions.length })
                .map((_, j) => {
                  const angle =
                    (Math.PI * 2 * j) / dimensions.length - Math.PI / 2;
                  const x = center + radius * level * Math.cos(angle);
                  const y = center + radius * level * Math.sin(angle);
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#3c3836"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}

          {/* Axis lines */}
          {points.map((point, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.fullX}
              y2={point.fullY}
              stroke="#3c3836"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}

          {/* Filled area */}
          <path
            d={path}
            fill="rgba(254, 128, 25, 0.2)"
            stroke="#fe8019"
            strokeWidth="2"
          />

          {/* Interactive points with icons */}
          {points.map((point, i) => {
            return (
              <motion.g key={i}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedDimension(
                      selectedDimension === point.name ? null : point.name
                    );
                    setUserInteracted(true);
                  }}
                  style={{ cursor: "pointer" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: isActive ? 1 : 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                    type: "spring",
                  }}
                />
                <motion.text
                  x={point.fullX}
                  y={point.fullY + (point.fullY > center ? 20 : -15)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fill={point.color}
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedDimension(
                      selectedDimension === point.name ? null : point.name
                    );
                    setUserInteracted(true);
                  }}
                >
                  {point.name}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      <AnimatePresence>
        {selectedDimension && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mt-6 bg-[#1d2021] rounded-lg p-4 border border-[#3c3836] max-w-xs mx-auto"
          >
            <div className="flex justify-center mb-3">
              <div className="relative">
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200`}
                  style={{
                    backgroundColor: dimensions.find(
                      (d) => d.name === selectedDimension
                    )?.color,
                  }}
                >
                  {(() => {
                    const dim = dimensions.find(
                      (d) => d.name === selectedDimension
                    );
                    const IconComponent = iconMap[dim?.icon || ""] || Check;
                    return <IconComponent className="h-6 w-6 text-[#1d2021]" />;
                  })()}
                </motion.div>
              </div>
            </div>
            <div className="text-[#fe8019] font-bold text-lg mb-1">
              {selectedDimension}
            </div>
            <div className="text-sm text-[#a89984] mb-3">
              {
                dimensions.find((d) => d.name === selectedDimension)
                  ?.description
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedDimension && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          className="text-center mt-4"
        >
          <div className="text-[#fe8019] font-medium">
            Track Your Spiritual Growth
          </div>
          <div className="text-xs text-[#a89984] mt-1">
            Tap any dimension to explore
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced Calendar Demo with more interactions
const InteractiveCalendarDemo = ({ isActive }: { isActive: boolean }) => {
  const [completedDays, setCompletedDays] = useState<number[]>([
    5, 6, 7, 8, 12, 13,
  ]);
  const [streak, setStreak] = useState(4);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = 15;

  const handleDayTap = (day: number) => {
    if (day <= today) {
      setSelectedDay(day);

      if (completedDays.includes(day)) {
        setCompletedDays(completedDays.filter((d) => d !== day));
      } else {
        setCompletedDays([...completedDays, day]);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 1000);

        // Calculate new streak
        const newCompleted = [...completedDays, day].sort((a, b) => a - b);
        let currentStreak = 0;
        for (let i = today; i >= 1; i--) {
          if (newCompleted.includes(i)) {
            currentStreak++;
          } else {
            break;
          }
        }
        setStreak(currentStreak);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with animated streak */}
      <div className="flex justify-between items-center">
        <div className="text-[#ebdbb2] font-bold text-lg">November 2024</div>
        <motion.div
          className="flex items-center gap-2 bg-[#1d2021] rounded-full px-3 py-1 border border-[#3c3836]"
          whileHover={{ scale: 1.05 }}
        >
          <Flame className="h-4 w-4 text-[#fe8019]" />
          <motion.span
            key={streak}
            initial={{ scale: 1.5, color: "#fe8019" }}
            animate={{ scale: 1, color: "#ebdbb2" }}
            className="text-[#ebdbb2] font-bold"
          >
            {streak} day streak
          </motion.span>
        </motion.div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className="text-center text-xs text-[#a89984] p-2 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCompleted = completedDays.includes(day);
          const isToday = day === today;
          const isFuture = day > today;
          const isSelected = selectedDay === day;

          return (
            <motion.button
              key={day}
              className={cn(
                "aspect-square rounded-lg text-sm font-bold transition-all relative overflow-hidden",
                isCompleted
                  ? "bg-[#8ec07c] text-[#1d2021] shadow-lg"
                  : isToday
                  ? "bg-[#3c3836] text-[#ebdbb2] ring-2 ring-[#fe8019] shadow-lg"
                  : isFuture
                  ? "bg-[#1d2021] text-[#504945] cursor-not-allowed"
                  : "bg-[#282828] text-[#ebdbb2] hover:bg-[#3c3836] border border-[#3c3836]",
                isSelected && !isFuture && "ring-2 ring-[#fabd2f]"
              )}
              onClick={() => handleDayTap(day)}
              disabled={isFuture}
              whileHover={!isFuture ? { scale: 1.1, y: -2 } : {}}
              whileTap={!isFuture ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0,
                rotateY: isActive ? 0 : 180,
              }}
              transition={{ delay: day * 0.02, duration: 0.3, type: "spring" }}
            >
              {day}

              {/* Completion checkmark */}
              <AnimatePresence>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="absolute inset-0 flex items-center justify-center bg-[#8ec07c]"
                  >
                    <Check className="h-4 w-4 text-[#1d2021]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Today indicator */}
              {isToday && (
                <motion.div
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#fe8019] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Celebration animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-4xl">🎉</div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="text-center text-xs text-[#a89984] bg-[#1d2021] rounded-lg p-2 border border-[#3c3836]"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Target className="h-3 w-3 text-[#fe8019]" />
          <span className="font-medium">Build consistent habits</span>
        </div>
        Tap past days to mark them complete
      </motion.div>
    </div>
  );
};

// Enhanced Quran Search Demo
const InteractiveQuranSearchDemo = ({ isActive }: { isActive: boolean }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<number | null>(null);

  const quranSearchData = [
    {
      type: "Verse",
      title: "Ayat al-Kursi",
      subtitle: "Al-Baqarah 2:255",
      icon: Quote,
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
      translation:
        "Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining.",
    },
    {
      type: "Surah",
      title: "Al-Fatiha",
      subtitle: "The Opening • 7 verses",
      icon: BookOpen,
      arabic: "الفاتحة",
      translation: "The chapter that opens the Quran",
    },
    {
      type: "Topic",
      title: "Patience (Sabr)",
      subtitle: "23 verses found",
      icon: Heart,
      arabic: "صبر",
      translation: "Verses about patience and perseverance",
    },
    {
      type: "Tafsir",
      title: "Surah Al-Kahf Commentary",
      subtitle: "Ibn Kathir",
      icon: Scroll,
      arabic: "تفسير",
      translation: "Detailed explanation of the Cave chapter",
    },
  ];

  const searchQueries = ["patience", "prayer", "guidance", "mercy"];
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);

  useEffect(() => {
    if (isActive && query.length === 0) {
      // Auto-demo different searches
      const interval = setInterval(() => {
        const newQuery = searchQueries[currentQueryIndex];
        setQuery(newQuery);
        setCurrentQueryIndex((prev) => (prev + 1) % searchQueries.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isActive, currentQueryIndex, query.length]);

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = quranSearchData.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            item.translation.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="space-y-4">
      {/* Enhanced search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#a89984]" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Quran verses, surahs, topics..."
          className="pl-10 pr-4 py-3 bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-2 focus:ring-[#fe8019]/20 transition-all"
        />
        {isSearching && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <Sparkles className="h-4 w-4 text-[#fe8019]" />
          </motion.div>
        )}
      </div>

      {/* Search results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 max-h-64 overflow-y-auto"
          >
            {results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "flex items-start gap-3 p-3 bg-[#282828] rounded-lg border border-[#3c3836] hover:border-[#fe8019] cursor-pointer transition-all",
                  selectedResult === i && "border-[#fe8019] bg-[#1d2021]"
                )}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setSelectedResult(selectedResult === i ? null : i)
                }
              >
                <div className="w-10 h-10 rounded-full bg-[#fe8019]/20 flex items-center justify-center flex-shrink-0">
                  <result.icon className="h-5 w-5 text-[#fe8019]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[#ebdbb2] font-medium truncate">
                      {result.title}
                    </div>
                    <Badge className="bg-[#3c3836] text-[#a89984] text-xs ml-2">
                      {result.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-[#a89984] mb-2">
                    {result.subtitle}
                  </div>
                  {result.arabic && (
                    <div className="text-right text-[#fe8019] font-arabic text-lg mb-1">
                      {result.arabic}
                    </div>
                  )}
                  <div className="text-xs text-[#a89984] italic">
                    {result.translation}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#504945] flex-shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="text-center text-xs text-[#a89984] bg-[#1d2021] rounded-lg p-3 border border-[#3c3836]"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Search className="h-3 w-3 text-[#fe8019]" />
          <span className="font-medium">Search through the entire Quran</span>
        </div>
        <div className="text-[#504945]">
          Find verses, surahs, topics, and tafsir instantly
        </div>
      </motion.div>
    </div>
  );
};

// Enhanced Audio Recitation Demo
const InteractiveAudioDemo = ({ isActive }: { isActive: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const verses = [
    {
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation:
        "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      transliteration: "Bismillahi'r-rahmani'r-raheem",
    },
    {
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of the worlds.",
      transliteration: "Alhamdu lillahi rabbi'l-alameen",
    },
    {
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful,",
      transliteration: "Ar-rahmani'r-raheem",
    },
  ];

  useEffect(() => {
    if (isPlaying && isActive) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentVerse((prevVerse) => (prevVerse + 1) % verses.length);
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [isPlaying, isActive]);

  return (
    <div className="space-y-4">
      {/* Surah header */}
      <div className="text-center bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
        <div className="text-[#ebdbb2] font-bold text-lg mb-1">
          Surah Al-Fatiha
        </div>
        <div className="text-[#a89984] text-sm">
          The Opening • Recited by Sheikh Mishary
        </div>
      </div>

      {/* Verse display */}
      <motion.div
        className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836] min-h-[140px] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVerse}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <div className="text-right text-xl text-[#fe8019] font-arabic leading-relaxed">
              {verses[currentVerse].arabic}
            </div>
            <div className="text-sm text-[#a89984] italic">
              {verses[currentVerse].transliteration}
            </div>
            <div className="text-sm text-[#ebdbb2]">
              {verses[currentVerse].translation}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3c3836]">
          <motion.div
            className="h-full bg-[#fe8019]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>

      {/* Audio controls */}
      <div className="flex items-center justify-between bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
        <div className="flex items-center gap-3">
          <motion.button
            className="w-12 h-12 rounded-full bg-[#fe8019] flex items-center justify-center text-[#1d2021]"
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </motion.button>

          <div className="text-[#ebdbb2] text-sm">
            <div className="font-medium">
              Verse {currentVerse + 1} of {verses.length}
            </div>
            <div className="text-[#a89984] text-xs">Auto-playing</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setIsMuted(!isMuted)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-[#a89984] hover:text-[#ebdbb2]"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </motion.button>
          <div className="w-16 h-1 bg-[#3c3836] rounded-full">
            <div
              className="h-full bg-[#8ec07c] rounded-full transition-all"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
          </div>
        </div>
      </div>

      {/* Verse indicators */}
      <div className="flex justify-center space-x-2">
        {verses.map((_, i) => (
          <motion.button
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentVerse === i ? "bg-[#fe8019] scale-125" : "bg-[#3c3836]"
            )}
            onClick={() => {
              setCurrentVerse(i);
              setProgress(0);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? 1 : 0 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="text-center text-xs text-[#a89984] bg-[#1d2021] rounded-lg p-2 border border-[#3c3836]"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Headphones className="h-3 w-3 text-[#fe8019]" />
          <span className="font-medium">Beautiful recitations</span>
        </div>
        Listen to professional reciters with translations
      </motion.div>
    </div>
  );
};

// Main onboarding flow component
export default function MobileOnboardingFlow({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const steps = [
    {
      id: "welcome",
      title: "Welcome to Nafs",
      subtitle: "Your spiritual companion",
      description:
        "Transform your daily routine into a journey of spiritual growth and connection with Allah",
      component: null,
    },
    {
      id: "radar",
      title: "Track Your Spiritual Growth",
      subtitle: "7 Dimensions of Faith",
      description:
        "Visualize and improve your progress across Salah, Quran, Charity, Community, Dhikr, Knowledge, and Character",
      component: InteractiveRadarDemo,
    },
    {
      id: "calendar",
      title: "Build Consistent Habits",
      subtitle: "Daily Spiritual Tracking",
      description:
        "Mark your daily achievements, build powerful streaks, and stay motivated on your spiritual journey",
      component: InteractiveCalendarDemo,
    },
    {
      id: "search",
      title: "Search the Entire Quran",
      subtitle: "Instant Spiritual Guidance",
      description:
        "Find any verse, surah, topic, or tafsir instantly. Get guidance exactly when you need it most",
      component: InteractiveQuranSearchDemo,
    },
    {
      id: "audio",
      title: "Listen to Beautiful Recitations",
      subtitle: "Audio Quran Experience",
      description:
        "Immerse yourself in professional recitations with translations and transliterations",
      component: InteractiveAudioDemo,
    },
    {
      id: "register",
      title: "Start Your Spiritual Journey",
      subtitle: "Join the Ummah",
      description:
        "Create your account and begin your transformation with thousands of Muslims worldwide",
      component: null,
    },
  ];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    } else {
      setSwipeDirection("left");
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSwipeDirection(null);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setSwipeDirection("right");
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSwipeDirection(null);
      }, 150);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        className="fixed inset-0 bg-[#1d2021] z-50 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 1 }}
          className="text-[#fe8019] text-4xl"
        >
          <Sparkles className="h-12 w-12" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#1d2021] z-50 flex flex-col overflow-hidden"
    >
      <EnhancedFloatingParticles count={20} />

      {/* Header */}
      <div className="relative z-10 p-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Logo className="h-4 w-4 text-[#fe8019]" />
          <span className="text-[#ebdbb2] font-bold text-lg">Nafs</span>
        </motion.div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
        >
          Skip
        </Button>
      </div>

      {/* Enhanced progress bar */}
      <div className="px-4 mb-6">
        <div className="w-full bg-[#3c3836] rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-[#fe8019] to-[#fabd2f] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              opacity: 0,
              x: swipeDirection === "right" ? -50 : 50,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: swipeDirection === "left" ? -50 : 50,
              scale: 0.95,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (
                swipe < -swipeConfidenceThreshold &&
                currentStep < steps.length - 1
              ) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold && currentStep > 0) {
                handlePrevious();
              }
            }}
          >
            {/* Step content */}
            <div
              className={`${
                currentStepData.id === "welcome" ||
                currentStepData.id === "register"
                  ? "flex flex-col text-center h-full justify-center items-center"
                  : "text-center mb-8"
              }`}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                {(currentStep === 0 || currentStep === steps.length - 1) && (
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 shadow-2xl">
                    <Logo className="h-12 w-12 text-[#1d2021]" />
                  </div>
                )}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-[#ebdbb2] mb-3"
              >
                {currentStepData.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#fe8019] font-semibold text-lg mb-3"
              >
                {currentStepData.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#a89984] text-sm leading-relaxed max-w-sm mx-auto"
              >
                {currentStepData.description}
              </motion.p>
              {currentStep === steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center items-center py-4"
                >
                  <Button
                    onClick={() => onComplete()}
                    className="bg-[#fe8019]/80 text-lg py-6 text-[#fff] "
                  >
                    Register now
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Interactive component */}
            {currentStepData.component && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex-1 flex items-center justify-center mb-8"
              >
                <div className="w-full max-w-sm">
                  <currentStepData.component isActive={true} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Swipe hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-xs text-[#a89984] mb-4 flex items-center justify-center gap-2"
        >
          <ChevronLeft className="h-3 w-3" />
          <span>Swipe to navigate</span>
          <ChevronRight className="h-3 w-3" />
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center  pt-4">
          <div className="flex space-x-2">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === currentStep ? "bg-[#fe8019] scale-125" : "bg-[#3c3836]"
                )}
                whileHover={{ scale: 1.3 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
