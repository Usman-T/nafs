import { getReflections } from "@/lib/data";
import ReflectionsPageClient from "@/components/custom/guidance/reflections/reflections-main-cilent";

export default async function ReflectionsPage() {
  const reflections = await getReflections();

  return <ReflectionsPageClient reflections={reflections} />;
}
