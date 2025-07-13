import axios from "axios";
import { getQuranApiToken } from "../utils/token";

export class SurahDataService {
  static async getAllSurahs() {
    const token = await getQuranApiToken();

    try {
      const response = await axios({
        method: "get",
        url: "https://apis.quran.foundation/content/api/v4/chapters",
        headers: {
          Accept: "application/json",
          "x-auth-token": token,
          "x-client-id": process.env.QURAN_API_CLIENT_ID!,
        },
      });

      const chapters = response.data.chapters;

      return chapters.map((chapter: any) => ({
        id: chapter.id,
        name: chapter.name_simple,
        arabicName: chapter.name_arabic,
        verses: chapter.verses_count,
        type: chapter.revelation_place === "makkah" ? "Meccan" : "Medinan",
      }));
    } catch (error) {
      console.error("Error fetching all surahs:", error);
      throw new Error("Failed to fetch all surahs");
    }
  }

  static async getSurah(id: number): Promise<Surah | null> {
    const allSurahs = await this.getAllSurahs();
    const base = allSurahs.find((s) => s.id === id);
    if (!base) return null;

    const info = await this.getSurahInfo(id);
    console.log({ info });

    return {
      ...base,
      about: info.about,
      virtue: info.virtue,
      order: info.order,
    };
  }

  static async getSurahVerses(surahId: number) {
    const token = await getQuranApiToken();

    try {
      const response = await axios({
        method: "get",
        url: `https://apis.quran.foundation/content/api/v4/verses/by_chapter/${surahId}`,
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
          per_page: 300,
        },
      });

      const tafsirResponse = await axios({
        method: "get",
        url: `https://apis.quran.foundation/content/api/v4/tafsirs/168/by_chapter/${surahId}`,
        headers: {
          Accept: "application/json",
          "x-auth-token": token,
          "x-client-id": process.env.QURAN_API_CLIENT_ID!,
        },
      });

      const tafsirs = tafsirResponse.data.tafsirs;
      const verses = response.data.verses;

      return verses.map((v: any, i: number) => {
        const wordByWord = v.words
          .filter((w: any) => w.char_type_name === "word")
          .map((w: any) => ({
            arabic: w.text_indopak || w.text,
            translation: w.translation?.text || "",
            transliteration: w.transliteration?.text || "",
            audio: w.audio_url || null,
          }));

        return {
          id: v.verse_number,
          arabic: v.text_uthmani,
          translation: v.translations[0]?.text || "",
          transliteration: v.text_indopak || "",
          tafsir: tafsirs?.[i]?.text || "",
          wordByWord,
          audio: v.audio?.url || null,
        };
      });
    } catch (error) {
      console.error("Error fetching verses:", error?.response || error);
      throw new Error("Failed to fetch surah verses");
    }
  }

  static async getSurahInfo(surahId: number) {
    const token = await getQuranApiToken();

    try {
      const response = await axios({
        method: "get",
        url: `https://apis.quran.foundation/content/api/v4/chapters/${surahId}/info`,
        headers: {
          Accept: "application/json",
          "x-auth-token": token,
          "x-client-id": process.env.QURAN_API_CLIENT_ID!,
        },
        params: {
          order: true,
        },
      });

      console.log({ response: response.data });

      const chapter = response.data.chapter_info;
      return {
        about: chapter.short_text || chapter.text || null,
        virtue: chapter.text,
        order: chapter.order || "Unknown",
      };
    } catch (error) {
      console.log(error);
      return {
        about: null,
        virtue: null,
        order: "Unknown",
      };
    }
  }
}
