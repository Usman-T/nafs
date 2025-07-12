"use client";

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

export default AudioPlayer;
