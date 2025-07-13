import SurahsPageContent from "@/components/custom/guidance/search-surahs/main-content";
import { fetchAllSurahs } from "@/lib/utils/guidance";

const SurahsPage = async () => {
  const fetchedSurahs = await fetchAllSurahs();

  const surahs = fetchedSurahs.map((surah) => ({
    id: surah.id,
    name: surah.name_simple,
    arabicName: surah.name_arabic,
    meaning: surah.translated_name.name,
    verses: surah.verses_count,
    revelation: surah.revelation_place === "makkah" ? "Meccan" : "Medinan",
    isBookmarked: false,
  }));

  return <SurahsPageContent surahs={surahs} />;
};

export default SurahsPage;
