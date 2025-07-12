"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft, Loader } from "lucide-react";
import SettingsPanel from "@/components/custom/guidance/surah/surah-settings";
import AudioPlayer from "@/components/custom/guidance/surah/surah-audio-player";
import Verse from "@/components/custom/guidance/surah/surah-verse";
import VerseListPanel from "@/components/custom/guidance/surah/surah-verse-list";
import SurahInfoPanel from "@/components/custom/guidance/surah/surah-info-panel";
import SurahHeader from "@/components/custom/guidance/surah/surah-header";
import SurahIntro from "@/components/custom/guidance/surah/surah-intro";

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

const surahVerses = {
  1: alFatihahVerses,
  2: alBaqarahVerses,
};

export default function SurahPage() {
  const params = useParams();
  const router = useRouter();
  const surahId = Number(params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [surah, setSurah] = useState<(typeof quranSurahs)[0] | null>(null);
  const [verses, setVerses] = useState<typeof alFatihahVerses | []>([]);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);
  const [highlightedVerses, setHighlightedVerses] = useState<number[]>([]);
  const [showTafsir, setShowTafsir] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [selectedReciter, setSelectedReciter] = useState(1);
  const [selectedTranslation, setSelectedTranslation] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const versesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const verseButtonRef = useRef<HTMLButtonElement>(null);
  const actionsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const foundSurah = quranSurahs.find((s) => s.id === surahId);
    if (foundSurah) {
      setSurah(foundSurah);
      setVerses(surahVerses[surahId as keyof typeof surahVerses] || []);
    }
    setIsLoading(false);
  }, [surahId]);

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

  const toggleBookmark = (verseId: number) => {
    setBookmarkedVerses((prev) =>
      prev.includes(verseId)
        ? prev.filter((id) => id !== verseId)
        : [...prev, verseId]
    );
  };

  const toggleHighlight = (verseId: number) => {
    setHighlightedVerses((prev) =>
      prev.includes(verseId)
        ? prev.filter((id) => id !== verseId)
        : [...prev, verseId]
    );
  };

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

  const handlePreviousVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(currentVerse - 1);
      if (isPlaying) {
        setPlayingVerse(currentVerse - 1);
      }
    }
  };

  const handleNextVerse = () => {
    if (currentVerse < verses.length) {
      setCurrentVerse(currentVerse + 1);
      if (isPlaying) {
        setPlayingVerse(currentVerse + 1);
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleGoBack = () => {
    router.push("/dashboard/guidance");
  };

  if (isLoading) {
    return <Loading />;
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
      <SurahHeader
        isDarkMode={isDarkMode}
        handleGoBack={handleGoBack}
        surah={surah}
        verseButtonRef={verseButtonRef}
        settingsButtonRef={settingsButtonRef}
        infoButtonRef={infoButtonRef}
        actionsButtonRef={actionsButtonRef}
      />
      <div className="max-w-3xl mx-auto px-4 py-6" ref={versesRef}>
        <SurahIntro isDarkMode={isDarkMode} surah={surah} />
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

      <SettingsPanel
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        showWordByWord={showWordByWord}
        onToggleWordByWord={() => setShowWordByWord(!showWordByWord)}
        selectedReciter={selectedReciter}
        onReciterChange={setSelectedReciter}
        selectedTranslation={selectedTranslation}
        onTranslationChange={setSelectedTranslation}
        settingsButtonRef={settingsButtonRef}
      />

      <SurahInfoPanel
        surah={surah}
        isDarkMode={isDarkMode}
        infoButtonRef={infoButtonRef}
      />

      <VerseListPanel
        verses={verses}
        currentVerse={currentVerse}
        isDarkMode={isDarkMode}
        onSelectVerse={(id) => {
          setCurrentVerse(id);
          actionsButtonRef?.current?.click()
          verseButtonRef?.current?.click();
        }}
        verseButtonRef={verseButtonRef}
      />
    </div>
  );
}
