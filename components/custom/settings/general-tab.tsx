"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Shield, BarChart, Loader2, Pause, Mail } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { updateGeneralSettings } from "@/lib/actions";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

type GeneralSettingsProps = {
  settings: {
    emailNotifications: boolean;
    analyticsEnabled: boolean;
    personalizationEnabled: boolean;
  };
};

const GeneralSettingsTab = ({ settings }: GeneralSettingsProps) => {
  const [loading, setLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(
    settings?.emailNotifications
  );
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    settings?.analyticsEnabled
  );
  const [personalizationEnabled, setPersonalizationEnabled] = useState(
    settings?.personalizationEnabled
  );
  const [reduceAnimations, setReduceAnimations] = useLocalStorage(
    "reduceAnimations",
    false
  );

  const saveSettings = async () => {
    setLoading(true);
    try {
      toast.promise(
        new Promise(async (resolve, reject) => {
          const result = await updateGeneralSettings({
            emailNotifications,
            analyticsEnabled,
            personalizationEnabled,
          });
          if (result.success) {
            resolve(result);
          } else {
            reject(result.error);
          }
        }),
        {
          loading: "Saving settings...",
          success: "Settings saved successfully!",
          error: (error) => `Failed to save settings: ${error}`,
        }
      );
    } catch (e) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const SettingRow = ({ icon: Icon, title, subtitle, children }) => (
    <div className="flex items-center justify-between gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-start gap-3 min-w-0 cursor-pointer hover:opacity-80">
            <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-[#3c3836] flex items-center justify-center">
              <Icon className="h-5 w-5 text-[#fe8019]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="text-left truncate text-[#ebdbb2]">{title}</div>
              <div className="text-xs text-[#a89984] truncate">{subtitle}</div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] max-w-xs">
          <div className="font-medium mb-2">{title}</div>
          <div className="text-sm text-[#a89984]">{subtitle}</div>
        </PopoverContent>
      </Popover>
      {children}
    </div>
  );

  return (
    <TabsContent value="general">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-[#282828] overflow-hidden shadow-lg rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ebdbb2] text-lg md:text-xl font-semibold">
              App Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="">
            <div className="space-y-4">
              <h3 className="text-[#ebdbb2] font-medium text-base">General</h3>
              <SettingRow
                icon={Pause}
                title="Reduce Animations"
                subtitle="Minimize animations throughout the app"
              >
                <Switch
                  checked={reduceAnimations}
                  onCheckedChange={setReduceAnimations}
                  className="data-[state=checked]:bg-[#fe8019]"
                />
              </SettingRow>
              <SettingRow
                icon={Mail}
                title="Email Notifications"
                subtitle="Receive important updates and tips directly in your inbox"
              >
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-[#fe8019]"
                />
              </SettingRow>
            </div>

            <Separator className="bg-[#3c3836]" />

            <div className="space-y-4">
              <h3 className="text-[#ebdbb2] font-medium text-base">Privacy</h3>
              <SettingRow
                icon={BarChart}
                title="Analytics"
                subtitle="Allow anonymous usage data collection"
              >
                <Switch
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                  className="data-[state=checked]:bg-[#fe8019]"
                />
              </SettingRow>

              <SettingRow
                icon={Shield}
                title="Personalization"
                subtitle="Personalize your experience based on activity"
              >
                <Switch
                  checked={personalizationEnabled}
                  onCheckedChange={setPersonalizationEnabled}
                  className="data-[state=checked]:bg-[#fe8019]"
                />
              </SettingRow>
            </div>

            <Separator className="bg-[#3c3836]" />
          </CardContent>

          <CardFooter className="mt-4 pt-3 flex justify-end">
            <Button
              onClick={saveSettings}
              disabled={loading}
              className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021] font-semibold px-6 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

export default GeneralSettingsTab;
