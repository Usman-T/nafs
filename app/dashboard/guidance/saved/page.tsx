import SavedAyahClientPage from "@/components/custom/guidance/saved/main-client";
import { getSavedAyahs } from "@/lib/data";

export default async function SavedAyahPage() {
  const savedVerses = await getSavedAyahs();

  return <SavedAyahClientPage savedVerses={savedVerses} />;
}
