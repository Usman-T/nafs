import React from "react";
import DailyAyahSection from "../main/daily-ayah";
import { fetchRandomVerse } from "@/lib/utils/guidance";

const DailyAyahWrapper = async () => {
  const apiVerse = await fetchRandomVerse(); 

  return (
    <>
      <DailyAyahSection apiVerse={apiVerse} />
    </>
  );
};

export default DailyAyahWrapper;
