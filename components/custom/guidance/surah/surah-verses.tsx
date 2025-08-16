"use client";

import { Virtuoso } from "react-virtuoso";
import Verse from "./surah-verse";

const SurahVerses = ({ verses }) => {
  return (
    <Virtuoso
      data={verses}
      useWindowScroll
      itemContent={(_, verse) => <Verse key={verse.id} verse={verse} />}
    />
  );
};

export default SurahVerses;
