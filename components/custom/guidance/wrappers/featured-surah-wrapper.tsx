import React from "react";
import FeaturedSurahsSection from "../main/featured-surah";
import { fetchFeaturedSurahs } from "@/lib/data";

const FeaturedSurahsSectionWrapper = async () => {
  const { readings } = await fetchFeaturedSurahs();

  return (
    <>
      <FeaturedSurahsSection surahs={readings} />
    </>
  );
};

export default FeaturedSurahsSectionWrapper;
