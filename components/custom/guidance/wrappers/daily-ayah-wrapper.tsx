import React from "react";
import DailyAyahSection from "../daily-ayah";
import { fetchRandomVerse } from "@/lib/guidance";

const DailyAyahWrapper = async () => {
  const apiVerse = await fetchRandomVerse(); 

  return (
    <>
      <DailyAyahSection apiVerse={apiVerse} />
    </>
  );
};

export default DailyAyahWrapper;
