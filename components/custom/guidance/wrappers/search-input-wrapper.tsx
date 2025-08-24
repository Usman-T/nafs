import { CommandPaletteProvider } from "@/lib/context/command-palette-context";
import CommandPaletteWrapper from "@/components/custom/guidance/wrappers/command-palette-wrapper";
import Search from "@/components/custom/guidance/search-surahs/search";
import { fetchAllSurahs } from "@/lib/utils/guidance";

const SearchInputWrapper = async () => {
  const fetchedSurahs = await fetchAllSurahs();

  const surahs = fetchedSurahs.map((surah) => ({
    id: surah.id,
    name: surah.name_simple,
    verses: surah.verses_count,
    // Add more fields if needed
  }));

  return (
    <CommandPaletteProvider>
      <Search />
      <CommandPaletteWrapper surahs={surahs} />
    </CommandPaletteProvider>
  );
};

export default SearchInputWrapper;