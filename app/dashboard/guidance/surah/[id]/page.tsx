"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkPlus,
  Share2,
  PauseCircle,
  PlayCircle,
  Sun,
  Moon,
  Scroll,
  MessageSquare,
  Copy,
  Check,
  Highlighter,
  ArrowLeft,
  Settings,
  Info,
  Heart,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  List,
  X,
  Plus,
  Minus,
  Eye,
  Download,
  Printer,
  Loader,
} from "lucide-react";

const Loading = () => {
  return <Loader className="animate-spin h-6 w-6 text-gray-500" />;
};

// Sample data for surahs
const quranSurahs = [
  {
    id: 1,
    name: "Al-Fatihah",
    arabicName: "الفاتحة",
    verses: 7,
    type: "Meccan",
  },
  {
    id: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    verses: 286,
    type: "Medinan",
  },
  {
    id: 3,
    name: "Aal-Imran",
    arabicName: "آل عمران",
    verses: 200,
    type: "Medinan",
  },
  {
    id: 4,
    name: "An-Nisa",
    arabicName: "النساء",
    verses: 176,
    type: "Medinan",
  },
  {
    id: 5,
    name: "Al-Ma'idah",
    arabicName: "المائدة",
    verses: 120,
    type: "Medinan",
  },
];

// Sample data for Al-Fatihah verses
const alFatihahVerses = [
  {
    id: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    transliteration: "Bismillahir rahmanir raheem",
    wordByWord: [
      { arabic: "بِسْمِ", translation: "In (the) name" },
      { arabic: "اللَّهِ", translation: "(of) Allah" },
      { arabic: "الرَّحْمَٰنِ", translation: "the Most Gracious" },
      { arabic: "الرَّحِيمِ", translation: "the Most Merciful" },
    ],
    tafsir:
      "This verse is known as the Basmalah, and it is recommended to recite it before starting any action. It acknowledges that everything we do is with the permission and blessing of Allah, who is described with two of His beautiful names: Ar-Rahman (the Most Gracious) and Ar-Raheem (the Most Merciful).",
    audio: "https://example.com/audio/1_1.mp3",
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Alhamdu lillahi rabbil 'alamin",
    wordByWord: [
      { arabic: "الْحَمْدُ", translation: "All praise" },
      { arabic: "لِلَّهِ", translation: "(is) for Allah" },
      { arabic: "رَبِّ", translation: "(the) Lord" },
      { arabic: "الْعَالَمِينَ", translation: "(of) the worlds" },
    ],
    tafsir:
      "This verse establishes that all praise belongs to Allah alone, who is the Lord and Sustainer of all creation. The term 'worlds' refers to everything that exists, including all creatures, realms, and dimensions.",
    audio: "https://example.com/audio/1_2.mp3",
  },
  {
    id: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Entirely Merciful, the Especially Merciful.",
    transliteration: "Ar-Rahmanir-Raheem",
    wordByWord: [
      { arabic: "الرَّحْمَٰنِ", translation: "The Most Gracious" },
      { arabic: "الرَّحِيمِ", translation: "the Most Merciful" },
    ],
    tafsir:
      "This verse repeats the two beautiful names of Allah mentioned in the Basmalah, emphasizing His all-encompassing mercy. Ar-Rahman refers to the general mercy that Allah extends to all creation, while Ar-Raheem refers to the special mercy He bestows upon the believers.",
    audio: "https://example.com/audio/1_3.mp3",
  },
  {
    id: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Sovereign of the Day of Recompense.",
    transliteration: "Maliki yawmid-deen",
    wordByWord: [
      { arabic: "مَالِكِ", translation: "Master" },
      { arabic: "يَوْمِ", translation: "(of the) Day" },
      { arabic: "الدِّينِ", translation: "(of) Judgment" },
    ],
    tafsir:
      "This verse highlights Allah's absolute sovereignty, particularly on the Day of Judgment when all souls will be held accountable for their deeds. It serves as a reminder of the ultimate reality that we will all face.",
    audio: "https://example.com/audio/1_4.mp3",
  },
  {
    id: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
    transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
    wordByWord: [
      { arabic: "إِيَّاكَ", translation: "You Alone" },
      { arabic: "نَعْبُدُ", translation: "we worship" },
      { arabic: "وَإِيَّاكَ", translation: "and You Alone" },
      { arabic: "نَسْتَعِينُ", translation: "we ask for help" },
    ],
    tafsir:
      "This verse represents the essence of Islamic monotheism, where the believer affirms that worship and seeking help are directed solely to Allah. It establishes the direct relationship between the servant and their Creator, without any intermediaries.",
    audio: "https://example.com/audio/1_5.mp3",
  },
  {
    id: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
    transliteration: "Ihdinas-siratal-mustaqeem",
    wordByWord: [
      { arabic: "اهْدِنَا", translation: "Guide us" },
      { arabic: "الصِّرَاطَ", translation: "(to) the path" },
      { arabic: "الْمُسْتَقِيمَ", translation: "the straight" },
    ],
    tafsir:
      "This verse contains the most important supplication a believer can make: asking for guidance to the straight path. This path represents the way of truth, righteousness, and correct understanding that leads to Allah's pleasure and Paradise.",
    audio: "https://example.com/audio/1_6.mp3",
  },
  {
    id: 7,
    arabic:
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translation:
      "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
    transliteration:
      "Siratal-latheena an'amta 'alayhim ghayril-maghdubi 'alayhim wa lad-dalleen",
    wordByWord: [
      { arabic: "صِرَاطَ", translation: "The path" },
      { arabic: "الَّذِينَ", translation: "(of) those" },
      { arabic: "أَنْعَمْتَ", translation: "You have bestowed favor" },
      { arabic: "عَلَيْهِمْ", translation: "upon them" },
      { arabic: "غَيْرِ", translation: "not" },
      {
        arabic: "الْمَغْضُوبِ",
        translation: "(of) those who earned (Your) anger",
      },
      { arabic: "عَلَيْهِمْ", translation: "upon them" },
      { arabic: "وَلَا", translation: "and not" },
      { arabic: "الضَّالِّينَ", translation: "(of) those who go astray" },
    ],
    tafsir:
      "This verse clarifies the straight path mentioned in the previous verse. It is the path of those whom Allah has blessed, such as the prophets, the truthful, the martyrs, and the righteous. It is not the path of those who have earned Allah's anger by knowing the truth but not following it, nor of those who have gone astray by deviating from the truth out of ignorance.",
    audio: "https://example.com/audio/1_7.mp3",
  },
];

// Sample data for Al-Baqarah verses (just a few for demonstration)
const alBaqarahVerses = [
  {
    id: 1,
    arabic: "الم",
    translation: "Alif, Lam, Meem.",
    transliteration: "Alif Lam Meem",
    wordByWord: [{ arabic: "الم", translation: "Alif Lam Meem" }],
    tafsir:
      "These are among the 'huroof muqatta'at' (disconnected letters) that appear at the beginning of some surahs. Their exact meaning is known only to Allah, though scholars have offered various interpretations.",
    audio: "https://example.com/audio/2_1.mp3",
  },
  {
    id: 2,
    arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
    translation:
      "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
    transliteration: "Thalikal-Kitabu la rayba feehi hudal-lil-muttaqeen",
    wordByWord: [
      { arabic: "ذَٰلِكَ", translation: "This is" },
      { arabic: "الْكِتَابُ", translation: "the Book" },
      { arabic: "لَا", translation: "no" },
      { arabic: "رَيْبَ", translation: "doubt" },
      { arabic: "فِيهِ", translation: "in it" },
      { arabic: "هُدًى", translation: "a guidance" },
      { arabic: "لِّلْمُتَّقِينَ", translation: "for the God-conscious" },
    ],
    tafsir:
      "This verse affirms the divine origin of the Quran and its role as a guide for those who are conscious of Allah (the muttaqeen). The absence of doubt refers to its authenticity and the truth of its message.",
    audio: "https://example.com/audio/2_2.mp3",
  },
];

// Map of surah IDs to their verses
const surahVerses = {
  1: alFatihahVerses,
  2: alBaqarahVerses,
};

// Reciters data
const reciters = [
  { id: 1, name: "Mishary Rashid Alafasy", language: "Arabic" },
  { id: 2, name: "Abdul Rahman Al-Sudais", language: "Arabic" },
  { id: 3, name: "Saud Al-Shuraim", language: "Arabic" },
  { id: 4, name: "Abu Bakr Al-Shatri", language: "Arabic" },
  { id: 5, name: "Hani Ar-Rifai", language: "Arabic" },
];

// Translations data
const translations = [
  { id: 1, name: "Sahih International", language: "English" },
  { id: 2, name: "Pickthall", language: "English" },
  { id: 3, name: "Yusuf Ali", language: "English" },
  { id: 4, name: "Dr. Mustafa Khattab", language: "English" },
  { id: 5, name: "Mufti Taqi Usmani", language: "English" },
];

// Verse component
const Verse = ({
  verse,
  isBookmarked,
  isHighlighted,
  isPlaying,
  isDarkMode,
  showWordByWord,
  showTafsir,
  fontSize,
  onToggleBookmark,
  onToggleHighlight,
  onPlayPause,
  onShowTafsir,
}: {
  verse: (typeof alFatihahVerses)[0];
  isBookmarked: boolean;
  isHighlighted: boolean;
  isPlaying: boolean;
  isDarkMode: boolean;
  showWordByWord: boolean;
  showTafsir: boolean;
  fontSize: number;
  onToggleBookmark: () => void;
  onToggleHighlight: () => void;
  onPlayPause: () => void;
  onShowTafsir: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${verse.arabic}\n\n${verse.translation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-8 p-4 rounded-lg border ${
        isDarkMode
          ? isHighlighted
            ? "bg-[#3c3836] border-[#fe8019]"
            : "bg-[#282828] border-[#3c3836]"
          : isHighlighted
          ? "bg-amber-50 border-amber-200"
          : "bg-white border-gray-200"
      } relative`}
    >
      <div className="flex justify-between items-start mb-4">
        <Badge
          className={`${
            isDarkMode
              ? "bg-[#3c3836] text-[#a89984]"
              : "bg-gray-100 text-gray-600"
          } rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium`}
        >
          {verse.id}
        </Badge>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <PauseCircle className="h-5 w-5" />
            ) : (
              <PlayCircle className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            } ${
              isBookmarked
                ? isDarkMode
                  ? "text-[#fabd2f]"
                  : "text-amber-500"
                : ""
            }`}
            onClick={onToggleBookmark}
          >
            {isBookmarked ? (
              <Bookmark className="h-5 w-5" />
            ) : (
              <BookmarkPlus className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            } ${
              isHighlighted
                ? isDarkMode
                  ? "text-[#fe8019]"
                  : "text-amber-500"
                : ""
            }`}
            onClick={onToggleHighlight}
          >
            <Highlighter className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            } ${
              copied ? (isDarkMode ? "text-[#8ec07c]" : "text-green-500") : ""
            }`}
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            } ${
              showNote ? (isDarkMode ? "text-[#83a598]" : "text-blue-500") : ""
            }`}
            onClick={() => setShowNote(!showNote)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <p
          className={`text-right font-arabic leading-loose ${
            isDarkMode ? "text-[#fe8019]" : "text-gray-800"
          }`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {verse.arabic}
        </p>

        {showWordByWord && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
            {verse.wordByWord.map((word, index) => (
              <div
                key={index}
                className={`p-2 rounded text-center ${
                  isDarkMode
                    ? "bg-[#3c3836] text-[#ebdbb2]"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                <p className="font-arabic text-lg mb-1">{word.arabic}</p>
                <p className="text-xs">{word.translation}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p
            className={`${isDarkMode ? "text-[#ebdbb2]" : "text-gray-700"}`}
            style={{ fontSize: `${fontSize - 2}px` }}
          >
            {verse.translation}
          </p>
          <p
            className={`text-sm italic ${
              isDarkMode ? "text-[#a89984]" : "text-gray-500"
            }`}
          >
            {verse.transliteration}
          </p>
        </div>

        <AnimatePresence>
          {showNote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4">
                <Textarea
                  placeholder="Add your notes here..."
                  className={`w-full ${
                    isDarkMode
                      ? "bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
                      : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400"
                  }`}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    className={`${
                      isDarkMode
                        ? "bg-[#83a598] text-[#1d2021] hover:bg-[#83a598]/90"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Save Note
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTafsir && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className={`mt-4 p-4 rounded-lg ${
                  isDarkMode
                    ? "bg-[#1d2021] border border-[#3c3836]"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <h4
                  className={`font-medium mb-2 flex items-center ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  <Scroll
                    className={`h-4 w-4 mr-2 ${
                      isDarkMode ? "text-[#fe8019]" : "text-amber-500"
                    }`}
                  />{" "}
                  Tafsir
                </h4>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-[#a89984]" : "text-gray-600"
                  }`}
                >
                  {verse.tafsir}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            onClick={onShowTafsir}
          >
            {showTafsir ? "Hide Tafsir" : "Show Tafsir"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Audio player component
const AudioPlayer = ({
  isPlaying,
  currentVerse,
  totalVerses,
  isDarkMode,
  onPlayPause,
  onPrevious,
  onNext,
  onToggleRepeat,
  isRepeat,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}: {
  isPlaying: boolean;
  currentVerse: number;
  totalVerses: number;
  isDarkMode: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleRepeat: () => void;
  isRepeat: boolean;
  volume: number;
  onVolumeChange: (value: number[]) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 ${
        isDarkMode
          ? "bg-[#1d2021] border-t border-[#3c3836]"
          : "bg-white border-t border-gray-200"
      } z-10`}
    >
      <div className="max-w-3xl mx-auto flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                isDarkMode
                  ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={onPrevious}
              disabled={currentVerse <= 1}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 ${
                isDarkMode
                  ? "text-[#fe8019] hover:text-[#fe8019] hover:bg-[#3c3836]"
                  : "text-amber-500 hover:text-amber-600"
              }`}
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <PauseCircle className="h-7 w-7" />
              ) : (
                <PlayCircle className="h-7 w-7" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                isDarkMode
                  ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={onNext}
              disabled={currentVerse >= totalVerses}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                isRepeat
                  ? isDarkMode
                    ? "text-[#fe8019]"
                    : "text-amber-500"
                  : isDarkMode
                  ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={onToggleRepeat}
            >
              <Repeat className="h-5 w-5" />
            </Button>
          </div>

          <div
            className={`text-sm ${
              isDarkMode ? "text-[#a89984]" : "text-gray-500"
            }`}
          >
            Verse {currentVerse} of {totalVerses}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                isDarkMode
                  ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={onToggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <div className="w-24">
              <Slider
                defaultValue={[volume]}
                max={100}
                step={1}
                value={[volume]}
                onValueChange={onVolumeChange}
                className={isDarkMode ? "bg-[#3c3836]" : ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings panel component
const SettingsPanel = ({
  isDarkMode,
  onToggleDarkMode,
  fontSize,
  onFontSizeChange,
  showWordByWord,
  onToggleWordByWord,
  selectedReciter,
  onReciterChange,
  selectedTranslation,
  onTranslationChange,
  onClose,
}: {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showWordByWord: boolean;
  onToggleWordByWord: () => void;
  selectedReciter: number;
  onReciterChange: (id: number) => void;
  selectedTranslation: number;
  onTranslationChange: (id: number) => void;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-y-0 right-0 w-full sm:w-96 z-20 ${
        isDarkMode
          ? "bg-[#282828] border-l border-[#3c3836]"
          : "bg-white border-l border-gray-200"
      } overflow-y-auto`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
            }`}
          >
            Settings
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Display Settings */}
          <div>
            <h3
              className={`text-sm font-medium mb-4 ${
                isDarkMode ? "text-[#a89984]" : "text-gray-500"
              } uppercase tracking-wider`}
            >
              Display
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-[#ebdbb2]" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-800" />
                  )}
                  <span
                    className={isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"}
                  >
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onToggleDarkMode}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"}
                  >
                    Font Size
                  </span>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-[#a89984]" : "text-gray-500"
                    }`}
                  >
                    {fontSize}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-8 w-8 ${
                      isDarkMode
                        ? "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                        : "border-gray-200 text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => onFontSizeChange(Math.max(14, fontSize - 2))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Slider
                    defaultValue={[fontSize]}
                    min={14}
                    max={32}
                    step={2}
                    value={[fontSize]}
                    onValueChange={(value) => onFontSizeChange(value[0])}
                    className={isDarkMode ? "bg-[#3c3836]" : ""}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-8 w-8 ${
                      isDarkMode
                        ? "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                        : "border-gray-200 text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => onFontSizeChange(Math.min(32, fontSize + 2))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye
                    className={`h-5 w-5 ${
                      isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                    }`}
                  />
                  <span
                    className={isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"}
                  >
                    Word by Word Translation
                  </span>
                </div>
                <Switch
                  checked={showWordByWord}
                  onCheckedChange={onToggleWordByWord}
                />
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div>
            <h3
              className={`text-sm font-medium mb-4 ${
                isDarkMode ? "text-[#a89984]" : "text-gray-500"
              } uppercase tracking-wider`}
            >
              Audio
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className={`text-sm ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  Reciter
                </label>
                <select
                  className={`w-full rounded-md ${
                    isDarkMode
                      ? "bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                      : "bg-white border-gray-200 text-gray-800"
                  } p-2`}
                  value={selectedReciter}
                  onChange={(e) => onReciterChange(Number(e.target.value))}
                >
                  {reciters.map((reciter) => (
                    <option key={reciter.id} value={reciter.id}>
                      {reciter.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Translation Settings */}
          <div>
            <h3
              className={`text-sm font-medium mb-4 ${
                isDarkMode ? "text-[#a89984]" : "text-gray-500"
              } uppercase tracking-wider`}
            >
              Translation
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className={`text-sm ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  Translation Source
                </label>
                <select
                  className={`w-full rounded-md ${
                    isDarkMode
                      ? "bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                      : "bg-white border-gray-200 text-gray-800"
                  } p-2`}
                  value={selectedTranslation}
                  onChange={(e) => onTranslationChange(Number(e.target.value))}
                >
                  {translations.map((translation) => (
                    <option key={translation.id} value={translation.id}>
                      {translation.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3
              className={`text-sm font-medium mb-4 ${
                isDarkMode ? "text-[#a89984]" : "text-gray-500"
              } uppercase tracking-wider`}
            >
              Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={`${
                  isDarkMode
                    ? "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                    : "border-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
              <Button
                variant="outline"
                className={`${
                  isDarkMode
                    ? "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                    : "border-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                <Printer className="h-4 w-4 mr-2" /> Print
              </Button>
              <Button
                variant="outline"
                className={`${
                  isDarkMode
                    ? "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                    : "border-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button
                variant="outline"
                className={`${
                  isDarkMode
                    ? "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                    : "border-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                <Heart className="h-4 w-4 mr-2" /> Favorite
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Surah info panel component
const SurahInfoPanel = ({
  surah,
  isDarkMode,
  onClose,
}: {
  surah: (typeof quranSurahs)[0];
  isDarkMode: boolean;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-x-0 bottom-0 z-20 ${
        isDarkMode
          ? "bg-[#282828] border-t border-[#3c3836]"
          : "bg-white border-t border-gray-200"
      } rounded-t-xl max-h-[80vh] overflow-y-auto`}
    >
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
            }`}
          >
            Surah Information
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div
              className={`h-16 w-16 rounded-full ${
                isDarkMode ? "bg-[#3c3836]" : "bg-gray-100"
              } flex items-center justify-center text-xl font-bold ${
                isDarkMode ? "text-[#fe8019]" : "text-amber-500"
              }`}
            >
              {surah.id}
            </div>
            <div>
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                }`}
              >
                {surah.name}
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-500"
                }`}
              >
                {surah.verses} verses • {surah.type}
              </p>
            </div>
            <div className="ml-auto">
              <p
                className={`text-3xl font-arabic ${
                  isDarkMode ? "text-[#fe8019]" : "text-amber-500"
                }`}
              >
                {surah.arabicName}
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode
                ? "bg-[#1d2021] border border-[#3c3836]"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <h4
              className={`font-medium mb-2 ${
                isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
              }`}
            >
              About this Surah
            </h4>
            <p
              className={`text-sm ${
                isDarkMode ? "text-[#a89984]" : "text-gray-600"
              }`}
            >
              {surah.id === 1
                ? "Surah Al-Fatihah, also known as 'The Opening,' is the first chapter of the Quran. It consists of seven verses and is recited in every unit of prayer (rakat) in the Islamic prayer (salah). It is a prayer for guidance and mercy from Allah, and it encapsulates the essence of the Quran's message."
                : surah.id === 2
                ? "Surah Al-Baqarah, 'The Cow,' is the longest chapter of the Quran with 286 verses. It was revealed in Medina and covers various aspects of Islamic law, faith, and history. The surah derives its name from the story of the cow that the Children of Israel were commanded to sacrifice."
                : "Information about this surah is not available."}
            </p>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode
                ? "bg-[#1d2021] border border-[#3c3836]"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <h4
              className={`font-medium mb-2 ${
                isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
              }`}
            >
              Virtues
            </h4>
            <p
              className={`text-sm ${
                isDarkMode ? "text-[#a89984]" : "text-gray-600"
              }`}
            >
              {surah.id === 1
                ? "The Prophet Muhammad (peace be upon him) said: 'The Opening of the Book (Al-Fatihah) is the best surah in the Quran.' It is also known as 'The Mother of the Quran' (Umm al-Quran) and 'The Seven Oft-Repeated Verses' (As-Sab' Al-Mathani)."
                : surah.id === 2
                ? "The Prophet Muhammad (peace be upon him) said: 'Do not turn your houses into graves. Verily, Satan does not enter the house where Surah Al-Baqarah is recited.' The last two verses of this surah are also known to provide protection when recited at night."
                : "Information about the virtues of this surah is not available."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div
              className={`p-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#1d2021] border border-[#3c3836]"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-500"
                }`}
              >
                Number
              </p>
              <p
                className={`text-lg font-medium ${
                  isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                }`}
              >
                {surah.id}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#1d2021] border border-[#3c3836]"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-500"
                }`}
              >
                Verses
              </p>
              <p
                className={`text-lg font-medium ${
                  isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                }`}
              >
                {surah.verses}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#1d2021] border border-[#3c3836]"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-500"
                }`}
              >
                Type
              </p>
              <p
                className={`text-lg font-medium ${
                  isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                }`}
              >
                {surah.type}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#1d2021] border border-[#3c3836]"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-500"
                }`}
              >
                Order
              </p>
              <p
                className={`text-lg font-medium ${
                  isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                }`}
              >
                {surah.id === 1 ? "5th" : surah.id === 2 ? "87th" : "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Verse list panel component
const VerseListPanel = ({
  verses,
  currentVerse,
  isDarkMode,
  onSelectVerse,
  onClose,
}: {
  verses: typeof alFatihahVerses;
  currentVerse: number;
  isDarkMode: boolean;
  onSelectVerse: (id: number) => void;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-y-0 left-0 w-full sm:w-80 z-20 ${
        isDarkMode
          ? "bg-[#282828] border-r border-[#3c3836]"
          : "bg-white border-r border-gray-200"
      } overflow-y-auto`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
            }`}
          >
            Verses
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          {verses.map((verse) => (
            <motion.div
              key={verse.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-lg cursor-pointer ${
                verse.id === currentVerse
                  ? isDarkMode
                    ? "bg-[#3c3836] border border-[#fe8019]"
                    : "bg-amber-50 border border-amber-200"
                  : isDarkMode
                  ? "bg-[#1d2021] border border-[#3c3836] hover:border-[#504945]"
                  : "bg-white border border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onSelectVerse(verse.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    verse.id === currentVerse
                      ? isDarkMode
                        ? "bg-[#fe8019] text-[#1d2021]"
                        : "bg-amber-500 text-white"
                      : isDarkMode
                      ? "bg-[#3c3836] text-[#a89984]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {verse.id}
                </div>
                <div className="overflow-hidden">
                  <p
                    className={`text-sm font-arabic truncate ${
                      isDarkMode ? "text-[#fe8019]" : "text-amber-600"
                    }`}
                  >
                    {verse.arabic}
                  </p>
                  <p
                    className={`text-xs truncate ${
                      isDarkMode ? "text-[#a89984]" : "text-gray-500"
                    }`}
                  >
                    {verse.translation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main surah page component
export default function SurahPage() {
  const params = useParams();
  const router = useRouter();
  const surahId = Number(params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [surah, setSurah] = useState<(typeof quranSurahs)[0] | null>(null);
  const [verses, setVerses] = useState<typeof alFatihahVerses | []>([]);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);
  const [highlightedVerses, setHighlightedVerses] = useState<number[]>([]);
  const [showTafsir, setShowTafsir] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [showSettings, setShowSettings] = useState(false);
  const [showSurahInfo, setShowSurahInfo] = useState(false);
  const [showVerseList, setShowVerseList] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(1);
  const [selectedTranslation, setSelectedTranslation] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const versesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundSurah = quranSurahs.find((s) => s.id === surahId);
      if (foundSurah) {
        setSurah(foundSurah);
        setVerses(surahVerses[surahId as keyof typeof surahVerses] || []);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [surahId]);

  // Scroll to verse
  useEffect(() => {
    if (versesRef.current && !isLoading) {
      const verseElement = document.getElementById(`verse-${currentVerse}`);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentVerse, isLoading]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = (verseId: number) => {
    setBookmarkedVerses((prev) =>
      prev.includes(verseId)
        ? prev.filter((id) => id !== verseId)
        : [...prev, verseId]
    );
  };

  // Toggle highlight
  const toggleHighlight = (verseId: number) => {
    setHighlightedVerses((prev) =>
      prev.includes(verseId)
        ? prev.filter((id) => id !== verseId)
        : [...prev, verseId]
    );
  };

  // Toggle tafsir
  const toggleTafsir = (verseId: number) => {
    setShowTafsir((prev) =>
      prev.includes(verseId)
        ? prev.filter((id) => id !== verseId)
        : [...prev, verseId]
    );
  };

  // Play/pause verse audio
  const togglePlayPause = (verseId: number) => {
    if (playingVerse === verseId && isPlaying) {
      setIsPlaying(false);
      setPlayingVerse(null);
    } else {
      setIsPlaying(true);
      setPlayingVerse(verseId);
      setCurrentVerse(verseId);
    }
  };

  // Global play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (!playingVerse) {
        setPlayingVerse(currentVerse);
      }
    }
  };

  // Previous verse
  const handlePreviousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(currentVerse - 1);
      if (isPlaying) {
        setPlayingVerse(currentVerse - 1);
      }
    }
  };

  // Next verse
  const handleNextVerse = () => {
    if (currentVerse < verses.length) {
      setCurrentVerse(currentVerse + 1);
      if (isPlaying) {
        setPlayingVerse(currentVerse + 1);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle repeat
  const handleToggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  // Go back to guidance page
  const handleGoBack = () => {
    router.push("/dashboard/guidance");
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading surah..." />;
  }

  if (!surah) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1
          className={`text-2xl font-bold mb-4 ${
            isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
          }`}
        >
          Surah not found
        </h1>
        <Button
          className={`${
            isDarkMode
              ? "bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
              : "bg-amber-500 text-white hover:bg-amber-600"
          }`}
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Guidance
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-20 ${
        isDarkMode ? "bg-[#1d2021] text-[#ebdbb2]" : "bg-gray-50 text-gray-800"
      }`}
      ref={containerRef}
    >
      {/* Header */}
      <div
        className={`sticky top-0 z-10 ${
          isDarkMode
            ? "bg-[#1d2021] border-b border-[#3c3836]"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              isDarkMode
                ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex flex-col items-center">
            <h1
              className={`text-lg font-medium ${
                isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
              }`}
            >
              {surah.name}
            </h1>
            <p
              className={`text-xs ${
                isDarkMode ? "text-[#a89984]" : "text-gray-500"
              }`}
            >
              {surah.verses} verses • {surah.type}
            </p>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${
                isDarkMode
                  ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setShowVerseList(true)}
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${
                isDarkMode
                  ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setShowSurahInfo(true)}
            >
              <Info className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${
                isDarkMode
                  ? "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-6" ref={versesRef}>
        <div className="mb-8 text-center">
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
            }`}
          >
            {surah.name}
          </h2>
          <p
            className={`text-3xl font-arabic ${
              isDarkMode ? "text-[#fe8019]" : "text-amber-500"
            }`}
          >
            {surah.arabicName}
          </p>
          {surah.id !== 9 && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                isDarkMode
                  ? "bg-[#282828] border border-[#3c3836]"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-xl font-arabic text-center leading-loose">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p
                className={`text-sm mt-2 ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-500"
                }`}
              >
                In the name of Allah, the Entirely Merciful, the Especially
                Merciful.
              </p>
            </div>
          )}
        </div>

        {verses.map((verse) => (
          <div key={verse.id} id={`verse-${verse.id}`}>
            <Verse
              verse={verse}
              isBookmarked={bookmarkedVerses.includes(verse.id)}
              isHighlighted={highlightedVerses.includes(verse.id)}
              isPlaying={isPlaying && playingVerse === verse.id}
              isDarkMode={isDarkMode}
              showWordByWord={showWordByWord}
              showTafsir={showTafsir.includes(verse.id)}
              fontSize={fontSize}
              onToggleBookmark={() => toggleBookmark(verse.id)}
              onToggleHighlight={() => toggleHighlight(verse.id)}
              onPlayPause={() => togglePlayPause(verse.id)}
              onShowTafsir={() => toggleTafsir(verse.id)}
            />
          </div>
        ))}

        <div className="flex justify-between items-center mt-8">
          <Button
            className={`${
              isDarkMode
                ? "bg-[#3c3836] text-[#a89984] hover:bg-[#504945] hover:text-[#ebdbb2]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={handlePreviousVerse}
            disabled={currentVerse <= 1}
          >
            <ChevronLeft className="h-5 w-5 mr-1" /> Previous
          </Button>
          <span
            className={`text-sm ${
              isDarkMode ? "text-[#a89984]" : "text-gray-500"
            }`}
          >
            Verse {currentVerse} of {verses.length}
          </span>
          <Button
            className={`${
              isDarkMode
                ? "bg-[#3c3836] text-[#a89984] hover:bg-[#504945] hover:text-[#ebdbb2]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={handleNextVerse}
            disabled={currentVerse >= verses.length}
          >
            Next <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Audio player */}
      <AudioPlayer
        isPlaying={isPlaying}
        currentVerse={currentVerse}
        totalVerses={verses.length}
        isDarkMode={isDarkMode}
        onPlayPause={handlePlayPause}
        onPrevious={handlePreviousVerse}
        onNext={handleNextVerse}
        onToggleRepeat={handleToggleRepeat}
        isRepeat={isRepeat}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            showWordByWord={showWordByWord}
            onToggleWordByWord={() => setShowWordByWord(!showWordByWord)}
            selectedReciter={selectedReciter}
            onReciterChange={setSelectedReciter}
            selectedTranslation={selectedTranslation}
            onTranslationChange={setSelectedTranslation}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      {/* Surah info panel */}
      <AnimatePresence>
        {showSurahInfo && (
          <SurahInfoPanel
            surah={surah}
            isDarkMode={isDarkMode}
            onClose={() => setShowSurahInfo(false)}
          />
        )}
      </AnimatePresence>

      {/* Verse list panel */}
      <AnimatePresence>
        {showVerseList && (
          <VerseListPanel
            verses={verses}
            currentVerse={currentVerse}
            isDarkMode={isDarkMode}
            onSelectVerse={(id) => {
              setCurrentVerse(id);
              setShowVerseList(false);
            }}
            onClose={() => setShowVerseList(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}