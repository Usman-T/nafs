import React from "react";

const SurahIntro = ({
  isDarkMode,
  surah,
}: {
  isDarkMode: boolean;
  surah: any;
}) => {
  return (
    <div className="mb-8 text-center">
      <h2
        className={`text-2xl font-bold mb-2 ${
          isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
        }`}
      >
        {surah.name}
      </h2>
      <p
        className={`text-3xl font-arabic ${
          isDarkMode ? "text-[#fe8019]" : "text-amber-500"
        }`}
      >
        {surah.arabicName}
      </p>
      {surah.id !== 9 && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            isDarkMode
              ? "bg-[#282828] border border-[#3c3836]"
              : "bg-white border border-gray-200"
          }`}
        >
          <p className="text-xl font-arabic text-center leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p
            className={`text-sm mt-2 ${
              isDarkMode ? "text-[#a89984]" : "text-gray-500"
            }`}
          >
            In the name of Allah, the Entirely Merciful, the Especially
            Merciful.
          </p>
        </div>
      )}
    </div>
  );
};

export default SurahIntro;
