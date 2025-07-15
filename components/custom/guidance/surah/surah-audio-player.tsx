"use client";

import { useSurah } from "@/lib/context/surah-page-context";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
} from "lucide-react";

const AudioPlayer = () => {
  const {
    state: { isPlaying, currentVerse, isRepeat, volume, isMuted, verses },
    actions: {
      handlePlayPause,
      handlePreviousVerse,
      handleNextVerse,
      handleToggleRepeat,
      handleVolumeChange,
      handleToggleMute,
    },
  } = useSurah();

  const totalVerses = verses.length;
  const isDarkMode = true;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 z-10 ${
        isDarkMode
          ? "bg-[#1d2021] border-t border-[#3c3836]"
          : "bg-white border-t border-gray-200"
      }`}
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
              onClick={handlePreviousVerse}
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
              onClick={handlePlayPause}
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
              onClick={() => handleNextVerse(totalVerses)}
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
              onClick={handleToggleRepeat}
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
              onClick={handleToggleMute}
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
                onValueChange={handleVolumeChange}
                className={isDarkMode ? "bg-[#3c3836]" : ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
