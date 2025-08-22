"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import GeneralSettingsTab from "./general-tab";
import AccountSettingsTab from "./account-tab";
import LoadingSettings from "./settings-loading";

const tabs = [
  {
    label: "General",
    value: "general",
  },
  {
    label: "Account",
    value: "account",
  },
];

const SettingsMain = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingSettings />; 
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="bg-[#1d2021] border border-[#3c3836] mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <GeneralSettingsTab />
      <AccountSettingsTab />
    </Tabs>
  );
};

export default SettingsMain;
