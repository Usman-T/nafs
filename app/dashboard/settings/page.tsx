import SettingsMain from "@/components/custom/settings/main";
import { fetchGeneralSettingsTabContent } from "@/lib/data";

const SettingsPage = async () => {
  const userSettings = await fetchGeneralSettingsTabContent();

  return (
    <div className="space-y-8 p-8">
      <SettingsMain settings={userSettings}/>
    </div>
  );
};

export default SettingsPage;
