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
  verse: any;
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

export default Verse;