"use server";

import axios from "axios";
import { getQuranApiToken } from "./token";

export async function fetchRandomVerse() {
  const token = await getQuranApiToken();
  // const verseKey = Math.floor(Math.random() * 114) + 1 + ':' + Math.floor(Math.random() * 4) + 1;
  const verseKey = "1:1";

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://apis.quran.foundation/content/api/v4/verses/by_key/${verseKey}?tafsirs=169&language=en`,
    headers: {
      Accept: "application/json",
      "x-auth-token": token,
      "x-client-id": process.env.QURAN_API_CLIENT_ID!,
    },
    params: {
      words: true,
      translations: "85",
      fields: "text_uthmani,text_indopak",
      word_fields: "text_indopak",
    },
  };

  try {
    const response = await axios(config);

    const tafsirResponse = await axios({
      ...config,
      url: `https://apis.quran.foundation/content/api/v4/tafsirs/168/by_ayah/${verseKey}`,
    });
    return {
      arabic: response.data.verse.text_uthmani,
      translation: response.data.verse.translations[0].text,
      reference: `Surah ${response.data.verse.verse_key.split(":")[0]}, Ayah ${
        response.data.verse.verse_key.split(":")[1]
      }`,
      transliteration: response.data.verse.text_indopak,
      ayahId: response.data.verse.verse_key.split(":")[1],
      surahId: response.data.verse.verse_key.split(":")[0],
      tafsir: tafsirResponse.data.tafsir.text || "",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch random verse");
  }
}

export async function fetchVerse(surahId: number, ayahId: number) {
  const token = await getQuranApiToken();
  const verseKey = `${surahId}:${ayahId}`;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://apis.quran.foundation/content/api/v4/verses/by_key/${verseKey}?tafsirs=169&language=en`,
    headers: {
      Accept: "application/json",
      "x-auth-token": token,
      "x-client-id": process.env.QURAN_API_CLIENT_ID!,
    },
    params: {
      words: true,
      translations: "85",
      fields: "text_uthmani,text_indopak",
      word_fields: "text_indopak",
    },
  };

  try {
    const response = await axios(config);
    const verse = response.data.verse;

    const tafsirResponse = await axios({
      ...config,
      url: `https://apis.quran.foundation/content/api/v4/tafsirs/168/by_ayah/${verseKey}`,
    });

    const wordByWord = verse.words
      .filter((w: any) => w.char_type_name === "word")
      .map((w: any) => ({
        arabic: w.text_indopak || w.text || "",
        translation: w.translation?.text || "",
        transliteration: w.transliteration?.text || "",
        audio: w.audio_url || null,
      }));

    return {
      arabic: verse.text_uthmani,
      translation: verse.translations[0].text,
      reference: `Surah ${verse.verse_key.split(":")[0]}, Ayah ${
        verse.verse_key.split(":")[1]
      }`,
      transliteration: verse.text_indopak,
      ayahId: verse.verse_key.split(":")[1],
      surahId: verse.verse_key.split(":")[0],
      tafsir: tafsirResponse.data.tafsir.text || "",
      wordByWord,
    };
  } catch (error: any) {
    console.error("Error fetching verse:", error?.response || error);
    throw new Error("Failed to fetch verse");
  }
}

export async function fetchAllSurahs() {
  const token = await getQuranApiToken();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://apis.quran.foundation/content/api/v4/chapters",
    headers: {
      Accept: "application/json",
      "x-auth-token": token,
      "x-client-id": process.env.QURAN_API_CLIENT_ID,
    },
  };

  try {
    const response = await axios(config);
    return response.data.chapters;
  } catch (error) {
    console.error("Error fetching all surahs:", error);
    throw new Error("Failed to fetch all surahs");
  }
}
