"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  PlayCircle,
  PauseCircle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Download,
  Share2,
  Settings,
  List,
  Bookmark,
} from "lucide-react";
import Loading from "@/components/ui/loading";

// Sample data for Al-Fatihah
const surahData = {
  id: 1,
  name: "Al-Fatihah",
  arabicName: "الفاتحة",
  verses: 7,
  type: "Meccan",
  meaning: "The Opening",
  description: "The first chapter of the Quran, recited in every prayer",
};

const verses = [
  {
    id: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    duration: 8,
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    duration: 6,
  },
  {
    id: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Entirely Merciful, the Especially Merciful.",
    duration: 4,
  },
  {
    id: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Sovereign of the Day of Recompense.",
    duration: 5,
  },
  {
    id: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
    duration: 7,
  },
  {
    id: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
    duration: 6,
  },
  {
    id: 7,
    arabic:
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translation:
      "The path of those upon whom You have bestowed favor, not of those who have earned anger or gone astray.",
    duration: 12,
  },
];

const reciters = [
  { id: 1, name: "Mishary Rashid Alafasy", style: "Melodic" },
  { id: 2, name: "Abdul Rahman Al-Sudais", style: "Traditional" },
  { id: 3, name: "Saud Al-Shuraim", style: "Emotional" },
  { id: 4, name: "Abu Bakr Al-Shatri", style: "Clear" },
];

// Floating audio waves component
const AudioWaves = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#fe8019] rounded-full"
          animate={{
            height: isPlaying ? [4, 20, 4] : 4,
          }}
          transition={{
            duration: 0.8,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

// Verse list component
const VerseList = ({
  verses,
  currentVerse,
  onSelectVerse,
  isPlaying,
}: {
  verses: typeof verses;
  currentVerse: number;
  onSelectVerse: (id: number) => void;
  isPlaying: boolean;
}) => {
  return (
    <div className="space-y-2">
      {verses.map((verse) => (
        <motion.div
          key={verse.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            verse.id === currentVerse
              ? "bg-[#fe8019]/20 border border-[#fe8019]"
              : "bg-[#282828] border border-[#3c3836] hover:border-[#504945]"
          }`}
          onClick={() => onSelectVerse(verse.id)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                verse.id === currentVerse
                  ? "bg-[#fe8019] text-[#1d2021]"
                  : "bg-[#3c3836] text-[#a89984]"
              }`}
            >
              {verse.id === currentVerse && isPlaying ? (
                <AudioWaves isPlaying={isPlaying} />
              ) : (
                verse.id
              )}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-arabic mb-1 ${
                  verse.id === currentVerse
                    ? "text-[#fe8019]"
                    : "text-[#ebdbb2]"
                }`}
              >
                {verse.arabic}
              </p>
              <p className="text-xs text-[#a89984]">{verse.translation}</p>
            </div>
            <span className="text-xs text-[#a89984]">{verse.duration}s</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Settings panel
const SettingsPanel = ({
  isOpen,
  onClose,
  selectedReciter,
  onReciterChange,
  playbackSpeed,
  onSpeedChange,
  autoPlay,
  onAutoPlayChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedReciter: number;
  onReciterChange: (id: number) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  autoPlay: boolean;
  onAutoPlayChange: (auto: boolean) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-y-0 right-0 w-80 bg-[#282828] border-l border-[#3c3836] z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#ebdbb2]">
                Audio Settings
              </h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Reciter Selection */}
              <div>
                <h4 className="text-sm font-medium text-[#a89984] mb-3">
                  Reciter
                </h4>
                <div className="space-y-2">
                  {reciters.map((reciter) => (
                    <motion.div
                      key={reciter.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg cursor-pointer border ${
                        selectedReciter === reciter.id
                          ? "bg-[#fe8019]/20 border-[#fe8019]"
                          : "bg-[#1d2021] border-[#3c3836] hover:border-[#504945]"
                      }`}
                      onClick={() => onReciterChange(reciter.id)}
                    >
                      <p className="text-[#ebdbb2] font-medium">
                        {reciter.name}
                      </p>
                      <p className="text-xs text-[#a89984]">{reciter.style}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Playback Speed */}
              <div>
                <h4 className="text-sm font-medium text-[#a89984] mb-3">
                  Playback Speed
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a89984]">Speed</span>
                    <span className="text-[#ebdbb2]">{playbackSpeed}x</span>
                  </div>
                  <Slider
                    value={[playbackSpeed]}
                    onValueChange={(value) => onSpeedChange(value[0])}
                    min={0.5}
                    max={2}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#a89984]">
                    <span>0.5x</span>
                    <span>1x</span>
                    <span>2x</span>
                  </div>
                </div>
              </div>

              {/* Auto Play */}
              <div>
                <h4 className="text-sm font-medium text-[#a89984] mb-3">
                  Auto Play
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-[#ebdbb2]">Continue to next verse</span>
                  <Button
                    variant={autoPlay ? "default" : "outline"}
                    size="sm"
                    onClick={() => onAutoPlayChange(!autoPlay)}
                    className={autoPlay ? "bg-[#8ec07c] text-[#1d2021]" : ""}
                  >
                    {autoPlay ? "On" : "Off"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function AudioPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const surahId = Number(params.surahId);

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(verses[0].duration);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showVerseList, setShowVerseList] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (autoPlay && currentVerse < verses.length) {
              handleNextVerse();
            } else {
              setIsPlaying(false);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, currentVerse, autoPlay]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextVerse = () => {
    if (currentVerse < verses.length) {
      setCurrentVerse(currentVerse + 1);
      setDuration(verses[currentVerse].duration);
      setCurrentTime(0);
    }
  };

  const handlePreviousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(currentVerse - 1);
      setDuration(verses[currentVerse - 2].duration);
      setCurrentTime(0);
    }
  };

  const handleSelectVerse = (verseId: number) => {
    setCurrentVerse(verseId);
    setDuration(verses[verseId - 1].duration);
    setCurrentTime(0);
    setShowVerseList(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading audio player..." />;
  }

  const currentVerseData = verses[currentVerse - 1];

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#fe8019] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-[#3c3836]">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-[#a89984] hover:text-[#ebdbb2]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="text-center">
            <h1 className="text-lg font-semibold">{surahData.name}</h1>
            <p className="text-sm text-[#a89984]">{surahData.meaning}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowVerseList(!showVerseList)}
              className="text-[#a89984] hover:text-[#ebdbb2]"
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="text-[#a89984] hover:text-[#ebdbb2]"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-6">
        {/* Surah Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#fe8019] to-[#fabd2f] flex items-center justify-center">
            <span className="text-3xl font-arabic text-[#1d2021]">
              {surahData.arabicName}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{surahData.name}</h2>
          <p className="text-[#a89984]">{surahData.description}</p>
          <Badge className="mt-2 bg-[#3c3836] text-[#a89984]">
            {surahData.verses} verses • {surahData.type}
          </Badge>
        </motion.div>

        {/* Current Verse */}
        <motion.div
          key={currentVerse}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card className="bg-[#282828] border-[#3c3836]">
            <CardContent className="p-6 text-center">
              <Badge className="mb-4 bg-[#fe8019] text-[#1d2021]">
                Verse {currentVerse}
              </Badge>
              <p className="text-2xl font-arabic text-[#fe8019] mb-4 leading-loose">
                {currentVerseData.arabic}
              </p>
              <p className="text-[#ebdbb2] italic">
                "{currentVerseData.translation}"
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-[#a89984] mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="w-full bg-[#3c3836] rounded-full h-2">
            <motion.div
              className="bg-[#fe8019] h-2 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsShuffle(!isShuffle)}
            className={`${
              isShuffle ? "text-[#fe8019]" : "text-[#a89984]"
            } hover:text-[#ebdbb2]`}
          >
            <Shuffle className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousVerse}
            disabled={currentVerse <= 1}
            className="text-[#a89984] hover:text-[#ebdbb2] disabled:opacity-50"
          >
            <SkipBack className="h-6 w-6" />
          </Button>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="icon"
              onClick={handlePlayPause}
              className="h-16 w-16 rounded-full bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
            >
              {isPlaying ? (
                <PauseCircle className="h-8 w-8" />
              ) : (
                <PlayCircle className="h-8 w-8" />
              )}
            </Button>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextVerse}
            disabled={currentVerse >= verses.length}
            className="text-[#a89984] hover:text-[#ebdbb2] disabled:opacity-50"
          >
            <SkipForward className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRepeat(!isRepeat)}
            className={`${
              isRepeat ? "text-[#fe8019]" : "text-[#a89984]"
            } hover:text-[#ebdbb2]`}
          >
            <Repeat className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#a89984] hover:text-[#ebdbb2]"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-[#a89984] w-12">{volume}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-[#3c3836] text-[#a89984]"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#3c3836] text-[#a89984]"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#3c3836] text-[#a89984]"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Verse List Drawer */}
      <AnimatePresence>
        {showVerseList && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="fixed inset-x-0 bottom-0 bg-[#282828] border-t border-[#3c3836] z-40 max-h-[60vh] overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#ebdbb2]">Verses</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVerseList(false)}
                >
                  Close
                </Button>
              </div>
              <VerseList
                verses={verses}
                currentVerse={currentVerse}
                onSelectVerse={handleSelectVerse}
                isPlaying={isPlaying}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        selectedReciter={selectedReciter}
        onReciterChange={setSelectedReciter}
        playbackSpeed={playbackSpeed}
        onSpeedChange={setPlaybackSpeed}
        autoPlay={autoPlay}
        onAutoPlayChange={setAutoPlay}
      />
    </div>
  );
}
