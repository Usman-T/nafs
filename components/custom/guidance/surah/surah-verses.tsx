"use client";

import { Virtuoso } from "react-virtuoso";
import Verse from "./surah-verse";
import SurahIntro from "./surah-intro";
import { useSurah } from "@/lib/context/surah-page-context";

const SurahVerses = () => {
  const { verses } = useSurah();

  return (
    <Virtuoso
      style={{ height: "calc(100vh - 200px)" }} // adjust as needed
      totalCount={verses.length}
      components={{
        Header: () => <SurahIntro />,
      }}
      itemContent={(index) => <Verse key={verses[index].id} verse={verses[index]} />}
    />
  );
};

export default SurahVerses;
