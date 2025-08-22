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
import { Moon, Shield, BarChart } from "lucide-react";
import { toast } from "sonner";

const GeneralSettingsTab = () => {
  const updateSettings = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
    });
  };

const SettingRow = ({ icon: Icon, title, subtitle, children }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-start gap-3 min-w-0">
      <Popover>
        <PopoverTrigger asChild>
          <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-[#3c3836] flex items-center justify-center cursor-pointer hover:opacity-80">
            <Icon className="h-5 w-5 text-[#fe8019]" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] max-w-xs">
          <div className="font-medium mb-2">{title}</div>
          <div className="text-sm text-[#a89984]">{subtitle}</div>
        </PopoverContent>
      </Popover>

      <div className="flex flex-col min-w-0">
        <Popover>
          <PopoverTrigger className="text-left truncate text-[#ebdbb2] cursor-pointer hover:underline">
            {title}
          </PopoverTrigger>
          <PopoverContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] max-w-xs">
            <div className="font-medium mb-2">{title}</div>
            <div className="text-sm text-[#a89984]">{subtitle}</div>
          </PopoverContent>
        </Popover>
        <div className="text-xs text-[#a89984] truncate">{subtitle}</div>
      </div>
    </div>
    {children}
  </div>
);


  return (
    <TabsContent value="general">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden shadow-lg rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ebdbb2] text-lg md:text-xl font-semibold">
              App Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-[#ebdbb2] font-medium text-base">General</h3>
              <SettingRow
                icon={Moon}
                title="Reduce Animations"
                subtitle="Minimize animations throughout the app"
              >
                <Switch className="data-[state=checked]:bg-[#fe8019]" />
              </SettingRow>
            </div>

            <Separator className="bg-[#3c3836] my-2" />

            <div className="space-y-4">
              <h3 className="text-[#ebdbb2] font-medium text-base">Privacy</h3>
              <SettingRow
                icon={BarChart}
                title="Analytics"
                subtitle="Allow anonymous usage data collection"
              >
                <Switch defaultChecked className="data-[state=checked]:bg-[#fe8019]" />
              </SettingRow>

              <SettingRow
                icon={Shield}
                title="Personalization"
                subtitle="Personalize your experience based on activity"
              >
                <Switch defaultChecked className="data-[state=checked]:bg-[#fe8019]" />
              </SettingRow>
            </div>
          </CardContent>

          <CardFooter className="border-t border-[#3c3836] pt-3 flex justify-end">
            <Button
              onClick={updateSettings}
              className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021] font-semibold px-6"
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

export default GeneralSettingsTab;
