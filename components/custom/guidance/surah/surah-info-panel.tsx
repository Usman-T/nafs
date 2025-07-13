"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSurah } from "@/lib/context/surah-page-context";
import type { Surah } from "@/lib/context/surah-page-context";

const getSurahInfo = (surahId: number) => {
  switch (surahId) {
    case 1:
      return {
        about:
          "Surah Al-Fatihah, also known as 'The Opening,' is the first chapter of the Quran. It consists of seven verses and is recited in every unit of prayer (rakat) in the Islamic prayer (salah). It is a prayer for guidance and mercy from Allah, and it encapsulates the essence of the Quran's message.",
        virtue:
          "The Prophet Muhammad (peace be upon him) said: 'The Opening of the Book (Al-Fatihah) is the best surah in the Quran.' It is also known as 'The Mother of the Quran' (Umm al-Quran) and 'The Seven Oft-Repeated Verses' (As-Sab' Al-Mathani).",
        order: "5th",
      };
    case 2:
      return {
        about:
          "Surah Al-Baqarah, 'The Cow,' is the longest chapter of the Quran with 286 verses. It was revealed in Medina and covers various aspects of Islamic law, faith, and history.",
        virtue:
          "The Prophet Muhammad (peace be upon him) said: 'Satan does not enter the house where Surah Al-Baqarah is recited.' The last two verses provide protection when recited at night.",
        order: "87th",
      };
    default:
      return {
        about: "Information about this surah is not available.",
        virtue: "Virtues of this surah are not available.",
        order: "Unknown",
      };
  }
};

export default function SurahInfoPanel() {
  const { state, refs } = useSurah();
  const surah = state.verses?.[0]
    ? ({
        id: state.verses[0].id,
        name: "Surah Placeholder",
        arabicName: "سورة",
        verses: state.verses.length,
        type: "Meccan",
      } satisfies Surah)
    : null;

  const info = getSurahInfo(surah?.id ?? 0);

  if (!surah) return null;

  return (
    <Drawer>
      <DrawerTrigger ref={refs.infoButtonRef} asChild>
        <div></div>
      </DrawerTrigger>
      <DrawerContent className="bg-[#1d2021] border-t border-[#3c3836]">
        <DrawerHeader>
          <DrawerTitle className="text-[#ebdbb2]">Surah Information</DrawerTitle>
          <DrawerDescription className="text-[#a89984]">
            Overview and virtues of this surah
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#3c3836] flex items-center justify-center text-xl font-bold text-[#fe8019]">
              {surah.id}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#ebdbb2]">
                {surah.name}
              </h3>
              <p className="text-sm text-[#a89984]">
                {surah.verses} verses • {surah.type}
              </p>
            </div>
            <div className="ml-auto text-3xl font-arabic text-[#fe8019]">
              {surah.arabicName}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[#3c3836]">
            <h4 className="font-medium mb-2 text-[#ebdbb2]">About this Surah</h4>
            <p className="text-sm text-[#a89984]">{info.about}</p>
          </div>

          <div className="p-4 rounded-lg border border-[#3c3836]">
            <h4 className="font-medium mb-2 text-[#ebdbb2]">Virtues</h4>
            <p className="text-sm text-[#a89984]">{info.virtue}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Stat label="Number" value={surah.id} />
            <Stat label="Verses" value={surah.verses} />
            <Stat label="Type" value={surah.type} />
            <Stat label="Order" value={info.order} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-3 rounded-lg border border-[#3c3836] bg-[#1d2021]">
      <p className="text-xs text-[#a89984]">{label}</p>
      <p className="text-lg font-medium text-[#ebdbb2]">{value}</p>
    </div>
  );
}
