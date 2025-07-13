"use client";

import { useSurah } from "@/lib/context/surah-page-context";

export default function SurahIntro() {
  const { state } = useSurah();

  const dummySurah = {
    id: 1,
    name: `Surah #${state.currentVerse}`,
    arabicName: "الفاتحة",
  };

  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold mb-2 text-[#ebdbb2]">
        {dummySurah.name}
      </h2>
      <p className="text-3xl font-arabic text-[#fe8019]">
        {dummySurah.arabicName}
      </p>
      {dummySurah.id !== 9 && (
        <div className="mt-6 p-4 rounded-lg bg-[#282828] border border-[#3c3836]">
          <p className="text-xl font-arabic text-center leading-loose">
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
