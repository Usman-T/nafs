"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PlayCircle,
  PauseCircle,
  Bookmark,
  Check,
  Copy,
  Eye,
  MessageSquare,
  Save,
  Scroll,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { arabicFontClass } from "@/lib/utils/font";
import { renderTafsir } from "@/lib/utils/renderTafsir";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { reflectAyah, saveAyah } from "@/lib/actions/manage-guidance";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { P } from "pino";

type WordByWord = {
  arabic: string;
  translation: string;
};

type Verse = {
  arabic: string;
  translation: string;
  transliteration: string;
  wordByWord: WordByWord[];
  tafsir: string;
  theme: string;
  reflection: string;
  surahId: number;
  ayahId: number;
  reference: string;
};

type AyahContentProps = {
  verse: Verse;
  ayahId: number;
};

const AyahContent = ({ verse, ayahId }: AyahContentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [showTafsir, setShowTafsir] = useState(true);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState("");
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] p-4 max-w-4xl mx-auto">
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between w-full border-b border-[#2e2e2e] bg-[#1d2021]/80 px-6 backdrop-blur-md md:px-8 shadow-lg">
          <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
          <div className="text-center">
            <Skeleton className="h-6 w-32 bg-[#3c3836] mx-auto mb-1" />
            <Skeleton className="h-4 w-20 bg-[#3c3836] mx-auto" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full bg-[#3c3836]" />
        </div>

        <div className="mt-8 mb-8">
          <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836]">
            <CardContent className="sm:p-8">
              <div className="flex justify-center mb-6">
                <Skeleton className="h-8 w-24 rounded-full bg-[#fe8019]/30" />
              </div>

              <div className="text-center mb-6">
                <Skeleton className="h-10 w-full mb-4 bg-[#3c3836]" />
              </div>

              <div className="text-center mb-6">
                <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-[#3c3836]" />
                <Skeleton className="h-4 w-1/2 mx-auto bg-[#3c3836]" />
              </div>

              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-8 w-8 rounded-full bg-[#3c3836]"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#282828] border-[#3c3836] mb-8">
          <CardContent className="p-4">
            <Skeleton className="h-6 w-40 mb-4 bg-[#3c3836]" />
            <Skeleton className="h-4 w-full mb-2 bg-[#3c3836]" />
            <Skeleton className="h-4 w-5/6 mb-2 bg-[#3c3836]" />
            <Skeleton className="h-4 w-2/3 bg-[#3c3836]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!verse) {
    return <div>No Such Ayah found</div>;
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${verse.arabic}\n\n${verse.translation}\n\n- Ayah ${ayahId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = async () => {
    if (isBookmarked) {
      toast.info("Already saved");
      return;
    }

    if (!session?.user?.email) {
      toast.error("Not logged in");
      return;
    }

    try {
      toast.promise(
        () =>
          saveAyah(
            verse.reference,
            verse.arabic,
            verse.translation,
            verse.surahId.toString(),
            session?.user?.email || ""
          ),
        {
          loading: "Saving...",
          success: "Saved to your Ayahs",
          error: "Failed to save Ayah",
        }
      );
      setIsBookmarked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveReflection = async () => {
    try {
      if (reflection.trim().length === 0) {
        toast.error("Reflection cannot be empty");
        return;
      }

      toast.promise(
        () =>
          reflectAyah(
            reflection.trim(),
            verse.reference,
            verse.arabic,
            session?.user?.email || ""
          ),
        {
          loading: "Saving reflection...",
          success: "Reflection saved",
          error: "Failed to save reflection",
        }
      );

      setReflection("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save reflection");
    }
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] relative overflow-hidden">
          <CardContent className="sm:p-8">
            <div className="flex justify-center mb-6">
              <Badge className="bg-[#fe8019] text-[#1d2021] text-lg px-4 py-2">
                Ayah {ayahId}
              </Badge>
            </div>

            <motion.div className={`text-center mb-6 ${arabicFontClass}`}>
              <p
                className="font-arabic text-[#fe8019] leading-loose mb-4"
                style={{ fontSize: `${fontSize}px` }}
              >
                {verse.arabic}
              </p>
            </motion.div>

            <div className="text-center mb-6">
              <p className="text-xl text-[#ebdbb2] italic mb-2">
                "{verse.translation}"
              </p>
              {verse.transliteration && (
                <p className="text-[#a89984]">{verse.transliteration}</p>
              )}
            </div>

            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                onClick={() => setIsPlaying((v) => !v)}
                aria-label={isPlaying ? "Pause" : "Play"}
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
                  isBookmarked ? "text-[#fabd2f]" : "text-[#a89984]"
                } hover:text-[#fe8019] hover:bg-[#3c3836]`}
                onClick={handleBookmark}
                aria-label="Bookmark"
              >
                <Bookmark className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${
                  copied ? "text-[#8ec07c]" : "text-[#a89984]"
                } hover:text-[#fe8019] hover:bg-[#3c3836]`}
                onClick={handleCopy}
                aria-label="Copy"
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
                className="h-8 w-8 rounded-full text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836]"
                onClick={() => setShowReflection((v) => !v)}
                aria-label="Reflect"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836]"
                onClick={() => setShowWordByWord((v) => !v)}
                aria-label="Word by Word"
              >
                <Eye className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836]"
                onClick={() => setShowTafsir((v) => !v)}
                aria-label="Tafsir"
              >
                <Scroll className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showWordByWord && verse.wordByWord.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <Card className="bg-[#282828] border-[#3c3836]">
              <CardContent>
                <h3 className="text-lg font-semibold text-[#ebdbb2] mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-[#fe8019]" />
                  Word by Word Translation
                </h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {verse.wordByWord.map((word, index) => (
                      <CarouselItem key={index} className="basis-1/2">
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="text-center p-3 space-y-3 rounded-lg bg-[#1d2021] border border-[#3c3836]"
                        >
                          <p
                            className={`${arabicFontClass} text-xl text-[#fe8019] mb-2`}
                          >
                            {word.arabic}
                          </p>
                          <p className="text-sm text-[#ebdbb2]">
                            {word.translation}
                          </p>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReflection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <Card className="bg-[#282828] border-[#3c3836]">
              <CardContent>
                <h3 className="text-lg font-semibold text-[#ebdbb2] mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-[#fe8019]" />
                  Your Reflection
                </h3>
                <Textarea
                  placeholder="What does this ayah mean to you? How can you apply it?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984] mb-4 min-h-[120px]"
                />
                <div className="flex justify-end">
                  <Button
                    className="bg-[#83a598] text-[#1d2021] hover:bg-[#83a598]/90"
                    onClick={handleSaveReflection}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Reflection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTafsir && verse.tafsir && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-8"
          >
            <Card className="bg-[#282828] border-[#3c3836]">
              <CardContent>
                <h3 className="text-lg font-semibold text-[#ebdbb2] mb-4 flex items-center">
                  <Scroll className="h-5 w-5 mr-2 text-[#fe8019]" />
                  Tafsir (Explanation)
                </h3>
                <div>{renderTafsir(verse.tafsir)}</div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AyahContent;
