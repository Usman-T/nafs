"use client";

import { Virtuoso } from "react-virtuoso";
import Verse from "./surah-verse";
import SurahIntro from "./surah-intro";
import { useSurah } from "@/lib/context/surah-page-context";
import { useEffect, useRef } from "react";

const SurahVerses = () => {
  const { verses, state } = useSurah();
  const virtuoso = useRef(null);

  useEffect(() => {
    if (state.currentVerse && virtuoso.current) {
      virtuoso.current.scrollToIndex({
        align: "start",
        index: state.currentVerse - 1,
        behaviour: "smooth",
      });
    }
  }, [state.currentVerse]);

  return (
    <Virtuoso
      ref={virtuoso}
      style={{ height: "calc(100vh - 200px)" }} 
      totalCount={verses.length}
      components={{
        Header: () => <SurahIntro />,
      }}
      itemContent={(index) => (
        <Verse key={verses[index].id} verse={verses[index]} />
      )}
    />
  );
};

export default SurahVerses;
