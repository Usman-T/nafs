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
import { cn } from "@/lib/utils/utils";
import Logo from "../logo";
import { iconMap } from "@/lib/iconMap";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { arabicFont } from "@/lib/utils/font";

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
            <div
              className={`text-right text-xl text-[#fe8019] ${arabicFont.className} font-arabic leading-relaxed`}
            >
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
export default InteractiveAudioDemo;
