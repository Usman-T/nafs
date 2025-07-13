"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Bookmark,
  BookmarkPlus,
  PauseCircle,
  PlayCircle,
  Scroll,
  MessageSquare,
  Copy,
  Check,
  Highlighter,
} from "lucide-react";
import { useSurah } from "@/lib/context/surah-page-context";

const Verse = ({ verse }: { verse: any }) => {
  const { state, actions } = useSurah();
  const [copied, setCopied] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const isBookmarked = state.bookmarkedVerses.includes(verse.id);
  const isHighlighted = state.highlightedVerses.includes(verse.id);
  const isPlaying = state.isPlaying && state.playingVerse === verse.id;
  const showWordByWord = state.showWordByWord;
  const showTafsir = state.showTafsir.includes(verse.id);
  const fontSize = state.fontSize;
  const note = state.userNotes[verse.id] || "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${verse.arabic}\n\n${verse.translation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      id={`verse-${verse.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-8 p-4 rounded-lg border ${
        isHighlighted
          ? "bg-[#3c3836] border-[#fe8019]"
          : "bg-[#282828] border-[#3c3836]"
      } relative`}
    >
      <div className="flex justify-between items-start mb-4">
        <Badge className="bg-[#3c3836] text-[#a89984] rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium">
          {verse.id}
        </Badge>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={() => actions.togglePlayPause(verse.id)}
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
            } hover:text-[#ebdbb2] hover:bg-[#3c3836]`}
            onClick={() => actions.toggleBookmark(verse.id)}
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
              isHighlighted ? "text-[#fe8019]" : "text-[#a89984]"
            } hover:text-[#ebdbb2] hover:bg-[#3c3836]`}
            onClick={() => actions.toggleHighlight(verse.id)}
          >
            <Highlighter className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              copied ? "text-[#8ec07c]" : "text-[#a89984]"
            } hover:text-[#ebdbb2] hover:bg-[#3c3836]`}
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
              showNote ? "text-[#83a598]" : "text-[#a89984]"
            } hover:text-[#ebdbb2] hover:bg-[#3c3836]`}
            onClick={() => setShowNote(!showNote)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <p
          className="text-right font-arabic leading-loose text-[#fe8019]"
          style={{ fontSize: `${fontSize}px` }}
        >
          {verse.arabic}
        </p>

        {showWordByWord && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
            {verse.wordByWord.map((word: any, index: number) => (
              <div
                key={index}
                className="p-2 rounded text-center bg-[#3c3836] text-[#ebdbb2]"
              >
                <p className="font-arabic text-lg mb-1">{word.arabic}</p>
                <p className="text-xs">{word.translation}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p
            className="text-[#ebdbb2]"
            style={{ fontSize: `${fontSize - 2}px` }}
          >
            {verse.translation}
          </p>
          <p className="text-sm italic text-[#a89984]">
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
                  className="w-full bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
                  value={note}
                  onChange={(e) => actions.saveNote(verse.id, e.target.value)}
                />
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
              <div className="mt-4 p-4 rounded-lg bg-[#1d2021] border border-[#3c3836]">
                <h4 className="font-medium mb-2 flex items-center text-[#ebdbb2]">
                  <Scroll className="h-4 w-4 mr-2 text-[#fe8019]" /> Tafsir
                </h4>
                <p className="text-sm text-[#a89984]">{verse.tafsir}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={() => actions.toggleTafsir(verse.id)}
          >
            {showTafsir ? "Hide Tafsir" : "Show Tafsir"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Verse;
