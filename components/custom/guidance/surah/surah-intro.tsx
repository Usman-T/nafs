"use client";

import { useSurah } from "@/lib/context/surah-page-context";
import { arabicFontClass } from "@/lib/utils/font";

export default function SurahIntro() {
  const { surah } = useSurah();


  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold mb-2 text-[#ebdbb2]">
        {surah.name}
      </h2>
      <p className={`text-3xl ${arabicFontClass} text-[#fe8019]`}>
        {surah.arabicName}
      </p>
      {surah.id !== 9 && (
        <div className="mt-6 p-4 rounded-lg bg-[#282828] border border-[#3c3836]">
          <p className={`${arabicFontClass} text-xl text-center leading-loose`}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-sm mt-2 text-[#a89984]">
            In the name of Allah, the Entirely Merciful, the Especially
            Merciful.
          </p>
        </div>
      )}
    </div>
  );
}
