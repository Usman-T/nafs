"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft, Info, Menu, Sliders, List, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSurah } from "@/lib/context/surah-page-context";

export default function SurahHeader() {
  const router = useRouter();
  const {
    refs: {
      settingsButtonRef,
      infoButtonRef,
      verseButtonRef,
      actionsButtonRef,
    },
    surah,
  } = useSurah();

  const isDarkMode = true;
  const drawerBg = isDarkMode ? "bg-[#1d2021]" : "bg-white";
  const drawerBorder = isDarkMode ? "border-[#3c3836]" : "border-gray-200";
  const iconColor = isDarkMode ? "text-[#a89984]" : "text-gray-500";
  const iconHover = isDarkMode ? "hover:text-[#ebdbb2]" : "hover:text-gray-700";

  return (
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
          className={`rounded-full ${iconColor} ${iconHover}`}
          onClick={() => router.back()}
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
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${iconColor} ${iconHover}`}
                ref={actionsButtonRef}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className={`${drawerBg} ${drawerBorder}`}>
              <DrawerHeader className="pb-6 mb-2">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-2 rounded-full bg-[#fe8019]/20"
                  >
                    <Info className="w-5 h-5 text-[#fe8019]" />
                  </motion.div>
                  <DrawerTitle
                    className={`text-xl ${
                      isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                    }`}
                  >
                    Quick Actions
                  </DrawerTitle>
                </div>
              </DrawerHeader>

              <div className="px-4 space-y-4 py-4">
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => settingsButtonRef?.current?.click()}
                  className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border bg-[#282828] border-[#3c3836] hover:bg-[#3c3836]/60 transition-all"
                >
                  <Sliders className="h-5 w-5 text-[#fe8019]" />
                  <span className="text-sm font-medium text-[#ebdbb2]">
                    Open Settings
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => infoButtonRef?.current?.click()}
                  className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border bg-[#282828] border-[#3c3836] hover:bg-[#3c3836]/60 transition-all"
                >
                  <BookOpen className="h-5 w-5 text-[#fe8019]" />
                  <span className="text-sm font-medium text-[#ebdbb2]">
                    Surah Info
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => verseButtonRef?.current?.click()}
                  className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border bg-[#282828] border-[#3c3836] hover:bg-[#3c3836]/60 transition-all"
                >
                  <List className="h-5 w-5 text-[#fe8019]" />
                  <span className="text-sm font-medium text-[#ebdbb2]">
                    Go to Verse
                  </span>
                </motion.div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
