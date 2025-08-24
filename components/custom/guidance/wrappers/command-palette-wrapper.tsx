"use client";

import { useCommandPalette } from "@/lib/context/command-palette-context";
import CommandPalette from "@/components/ui/guidance-command";
import { BookOpen, Quote } from "lucide-react";

type SearchItem =
  | {
      id: number;
      type: "surah";
      title: string;
      subtitle: string;
      icon: React.ComponentType;
      route: string;
    }
  | {
      id: number;
      type: "verse";
      title: string;
      subtitle: string;
      icon: React.ComponentType;
      route: string;
    };

const CommandPaletteWrapper = ({ surahs }: { surahs: Array<{ id: number; name: string; verses: number }> }) => {
  const { open, setOpen } = useCommandPalette();

  // 🔷 Pre-coded first 4 Surahs
  const preCodedSurahs: SearchItem[] = [
    {
      id: 1,
      type: "surah",
      title: "Al-Fatihah",
      subtitle: "The Opening • 7 verses",
      icon: BookOpen,
      route: "/dashboard/guidance/surah/1",
    },
    {
      id: 2,
      type: "surah",
      title: "Al-Baqarah",
      subtitle: "The Cow • 286 verses",
      icon: BookOpen,
      route: "/dashboard/guidance/surah/2",
    },
    {
      id: 3,
      type: "surah",
      title: "Aal-Imran",
      subtitle: "Family of Imran • 200 verses",
      icon: BookOpen,
      route: "/dashboard/guidance/surah/3",
    },
    {
      id: 4,
      type: "surah",
      title: "An-Nisa",
      subtitle: "The Women • 176 verses",
      icon: BookOpen,
      route: "/dashboard/guidance/surah/4",
    },
  ];

  // 🚫 Remove first 4 from dynamic list to avoid duplicates
  const dynamicSurahs = surahs.filter((surah) => surah.id > 4);

  // ➕ Generate Search Items for remaining Surahs
  const dynamicSurahData: SearchItem[] = dynamicSurahs.map((surah) => ({
    id: surah.id,
    type: "surah" as const,
    title: surah.name,
    subtitle: `Surah • ${surah.verses} verses`,
    icon: BookOpen,
    route: `/dashboard/guidance/surah/${surah.id}`,
  }));

  // 📜 Static verses (Ayat, etc.)
  const staticData: SearchItem[] = [
    {
      id: 101,
      type: "verse",
      title: "Ayat al-Kursi",
      subtitle: "Al-Baqarah 2:255 • The Throne Verse",
      icon: Quote,
      route: "/dashboard/guidance/ayah/2/255",
    },
    {
      id: 102,
      type: "verse",
      title: "Last two verses of Al-Baqarah",
      subtitle: "Al-Baqarah 2:285-286",
      icon: Quote,
      route: "/dashboard/guidance/ayah/2/285",
    },
    {
      id: 103,
      type: "verse",
      title: "Bismillah",
      subtitle: "In the name of Allah",
      icon: Quote,
      route: "/dashboard/guidance/ayah/1/1",
    },
  ];

  // 🔗 Combine: Pre-coded (4) → Dynamic → Static
  const searchData = [...preCodedSurahs, ...dynamicSurahData, ...staticData];

  return (
    <CommandPalette
      isOpen={open}
      onClose={() => {
        localStorage.removeItem("nafs-hide-mobile-nav");
        window.dispatchEvent(new Event("storage"));
        setOpen(false);
      }}
      searchData={searchData}
    />
  );
};

export default CommandPaletteWrapper;