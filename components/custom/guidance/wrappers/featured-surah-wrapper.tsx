import React from "react";
import FeaturedSurahsSection from "../featured-surah";

const featuredSurahs = [
  {
    id: 1,
    name: "Al-Fatihah",
    arabicName: "الفاتحة",
    verses: 7,
    type: "Meccan",
    progress: 100,
    lastRead: "Today",
    hasAudio: true,
    hasReflections: true,
  },
  {
    id: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    verses: 286,
    type: "Medinan",
    progress: 45,
    lastRead: "Yesterday",
    hasAudio: true,
    hasReflections: false,
  },
];

const FeaturedSurahsSectionWrapper = () => {
  return (
    <>
      <FeaturedSurahsSection surahs={featuredSurahs} />
    </>
  );
};

export default FeaturedSurahsSectionWrapper;
