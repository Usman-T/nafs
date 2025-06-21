"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SharingModal from "@/components/ui/sharing-modal";
import {
  Share2,
  PlayCircle,
  Scroll,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { arabicFontClass } from "@/lib/font";

const DailyAyahSection = ({ apiVerse }) => {
  const [showTafsir, setShowTafsir] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSharing, setShowSharing] = useState(false);

  const router = useRouter();

  // const mapAyah = (apiVerse) => {
  //   console.log({ apiVerse });

  //   const verseKey =
  //     apiVerse.verse_key || `${apiVerse.chapter_id}:${apiVerse.verse_number}`;
  //   const [surahId, ayahId] = verseKey.split(":");

  //   return {
  //     arabic: apiVerse.text_uthmani || apiVerse.arabic || "",
  //     translation:
  //       apiVerse.translation || apiVerse.translations?.[0]?.text || "",
  //     reference: `Surah ${apiVerse.surah_name || surahId}, Ayah ${
  //       apiVerse.verse_number || ayahId
  //     }`,
  //     transliteration: "", // You can add transliteration API call if needed
  //     theme: "",
  //     reflection: "",
  //     surahId: parseInt(surahId),
  //     ayahId: parseInt(ayahId),
  //     tafsir: apiVerse.tafsir || apiVerse.tafsirs?.[0]?.text || "", // Handle multiple tafsirs
  //     tafsirs: apiVerse.tafsirs || [], // Array of tafsir objects
  //   };
  // };

  const ayah = apiVerse
  console.log({ ayah });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${ayah.arabic}\n\n${ayah.translation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateToVerse = () => {
    router.push(`/dashboard/guidance/ayah/${ayah.surahId}/${ayah.ayahId}`);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] shadow-xl rounded-3xl relative overflow-hidden">
        <CardContent className="relative">
          {/* Header */}
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="h-12 w-12 rounded-full bg-[#fe8019] flex items-center justify-center shadow-lg"
              >
                <Sparkles className="h-6 w-6 text-[#1d2021]" />
              </motion.div>
              <div>
                <h2 className="text-lg font-bold text-[#ebdbb2]">Daily Ayah</h2>
                <p className="text-xs text-[#a89984]">{ayah.reference}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836] transition"
              onClick={navigateToVerse}
              aria-label="Go to verse"
            >
              <PlayCircle className="h-5 w-5" />
            </Button>
          </div>

          {/* Arabic Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1d2021] rounded-2xl p-5 border border-[#3c3836] cursor-pointer shadow"
            onClick={navigateToVerse}
          >
            <p
              className={`text-2xl sm:text-3xl text-[#fe8019] text-right font-arabic leading-loose mb-3 select-text ${arabicFontClass}`}
            >
              {ayah.arabic}
            </p>
            <p className="text-[#ebdbb2] text-base sm:text-lg mb-2 select-text">
              “{ayah.translation}”
            </p>
            {ayah.transliteration && (
              <p className="text-[#a89984] text-xs italic">
                {ayah.transliteration}
              </p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 rounded-full text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836] transition`}
                onClick={() => setShowTafsir((v) => !v)}
                aria-label="Show Tafsir"
              >
                {showTafsir ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 rounded-full ${
                  copied ? "text-[#8ec07c]" : "text-[#a89984]"
                } hover:text-[#fe8019] hover:bg-[#3c3836] transition`}
                onClick={copyToClipboard}
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
                className="h-9 w-9 rounded-full text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836] transition"
                onClick={() => setShowSharing(true)}
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836] transition"
              onClick={navigateToVerse}
              aria-label="Go to verse"
            >
              <Scroll className="h-5 w-5" />
            </Button>
          </div>

          {/* Tafsir Section */}
          <AnimatePresence initial={false}>
            {showTafsir && (
              <motion.div
                key="tafsir"
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-[#232323] rounded-xl p-4 border border-[#3c3836] shadow">
                  <h4 className="text-[#fe8019] font-semibold mb-2 flex items-center text-sm">
                    <Scroll className="h-4 w-4 mr-2" />
                    Tafsir
                  </h4>
                  <p className="text-[#a89984] text-sm leading-relaxed whitespace-pre-line">
                    {ayah.tafsir}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <SharingModal
        isOpen={showSharing}
        onClose={() => {
          localStorage.removeItem("nafs-hide-mobile-nav");
          setShowSharing(false);
        }}
        content={{
          arabic: ayah.arabic,
          translation: ayah.translation,
          reference: ayah.reference,
          type: "verse",
        }}
      />
    </>
  );
};

export default DailyAyahSection;
