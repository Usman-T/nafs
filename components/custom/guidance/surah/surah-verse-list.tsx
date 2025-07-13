"use client";

import { useSurah } from "@/lib/context/surah-page-context";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const VerseListPanel = () => {
  const {
    state: { currentVerse },
    refs: { verseButtonRef },
    actions: { scrollToVerse },
  } = useSurah();

  const { verses } = useSurah(); 

  return (
    <Sheet>
      <SheetTrigger ref={verseButtonRef} asChild>
        <div></div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full h-full bg-[#1d2021] text-[#ebdbb2] border-r border-[#3c3836] p-0"
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-[#ebdbb2]">Select Verse</SheetTitle>
          <SheetDescription className="text-[#a89984]">
            Browse and pick a verse to jump to
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6 pt-4 overflow-y-auto h-[calc(100%-100px)]">
          <div className="space-y-2">
            {verses.map((verse) => (
              <motion.div
                key={verse.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-md cursor-pointer border transition-all duration-150 ${
                  verse.id === currentVerse
                    ? "bg-[#3c3836] border-[#fe8019]"
                    : "bg-[#1d2021] border-[#3c3836] hover:border-[#504945]"
                }`}
                onClick={() => scrollToVerse(verse.id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium ${
                      verse.id === currentVerse
                        ? "bg-[#fe8019] text-[#1d2021]"
                        : "bg-[#3c3836] text-[#a89984]"
                    }`}
                  >
                    {verse.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-arabic text-[#fe8019] truncate">
                      {verse.arabic}
                    </p>
                    <p className="text-xs text-[#a89984] truncate">
                      {verse.translation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VerseListPanel;
