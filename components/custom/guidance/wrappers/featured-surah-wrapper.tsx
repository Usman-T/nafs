import React from "react";
import FeaturedSurahsSection from "../main/featured-surah";
import { fetchFeaturedSurahs } from "@/lib/data";

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

const FeaturedSurahsSectionWrapper = async () => {
  const { readings } = await fetchFeaturedSurahs();

  return (
    <>
      <FeaturedSurahsSection surahs={readings} />
    </>
  );
};

export default FeaturedSurahsSectionWrapper;
