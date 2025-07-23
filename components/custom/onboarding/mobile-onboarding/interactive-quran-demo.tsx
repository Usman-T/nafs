import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Heart,
  Sparkles,
  Quote,
  Scroll,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { arabicFont } from "@/lib/utils/font";

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

  useEffect(() => {
    if (isActive) {
      setQuery("");
      setResults([]);
      setSelectedResult(null);
    }
  }, [isActive]);

  return (
    <div className="space-y-4">
      <div className="relative space-y-3">
        <div className="flex space-x-2">
          <Search className="absolute left-3 transform top-2 h-4 w-4 text-[#a89984]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Quran verses, surahs, topics..."
            className="pl-10 pr-4 py-3 bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-2 focus:ring-[#fe8019]/20 transition-all"
          />
        </div>

        <Command className="rounded-lg border shadow-md">
          {results.length <= 0 && (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {quranSearchData.map((item) => (
                  <CommandItem
                    key={item.title}
                    onSelect={() => setQuery(item.title)}
                  >
                    {item.icon && (
                      <item.icon className="h-4 w-4 text-[#fe8019] mr-2" />
                    )}
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          )}
        </Command>
        {isSearching && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute right-3 top-2 "
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
                    <div
                      className={`text-right ${arabicFont.className} text-[#fe8019] font-arabic text-lg mb-1`}
                    >
                      {result.arabic}
                    </div>
                  )}
                  <div className="text-xs text-[#a89984] italic mt-3">
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

export default InteractiveQuranSearchDemo;
