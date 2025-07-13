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

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${verse.arabic}\n\n${verse.translation}\n\n- Ayah ${ayahId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto p-4">
      {/* Ayah Card */}
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

            {/* Arabic */}
            <motion.div className={`text-center mb-6 ${arabicFontClass}`}>
              <p
                className="font-arabic text-[#fe8019] leading-loose mb-4"
                style={{ fontSize: `${fontSize}px` }}
              >
                {verse.arabic}
              </p>
            </motion.div>

            {/* Translation */}
            <div className="text-center mb-6">
              <p className="text-xl text-[#ebdbb2] italic mb-2">
                "{verse.translation}"
              </p>
              {verse.transliteration && (
                <p className="text-[#a89984]">{verse.transliteration}</p>
              )}
            </div>

            {/* Action Buttons */}
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
                onClick={() => setIsBookmarked((v) => !v)}
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

      {/* Word-by-Word */}
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

                  <Carousel
                    className="w-full"
                    opts={{
                      align: "start",
                      dragFree: false,
                      loop: false,
                      slidesToScroll: 1,
                    }}
                  >
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

      {/* Reflection Box */}
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
                  <Button className="bg-[#83a598] text-[#1d2021] hover:bg-[#83a598]/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Reflection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tafsir */}
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
