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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Globe, Clock, Languages } from "lucide-react";
import { toast } from "sonner";

const GeneralSettingsTab = () => {
  const updateGeneralSettings = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
    });
  };

  return (
    <TabsContent value="general">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ebdbb2]">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                    <Moon className="h-5 w-5 text-[#fe8019]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2] font-medium">
                      Reduce Animations
                    </div>
                    <div className="text-sm text-[#a89984]">
                      Minimize animations throughout the app
                    </div>
                  </div>
                </div>
                <Switch
                  checked={false}
                  className="data-[state=checked]:bg-[#fe8019]"
                />
              </div>

              <Separator className="bg-[#3c3836]" />

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                    <Languages className="h-5 w-5 text-[#fe8019]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2] font-medium">Language</div>
                    <div className="text-sm text-[#a89984]">
                      Select your preferred language
                    </div>
                  </div>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-[#3c3836]" />

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                    <Globe className="h-5 w-5 text-[#fe8019]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2] font-medium">Time Zone</div>
                    <div className="text-sm text-[#a89984]">
                      Set your local time zone for accurate prayer times
                    </div>
                  </div>
                </div>
                <Select defaultValue="america-new_york">
                  <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                    <SelectItem value="america-new_york">
                      America/New York
                    </SelectItem>
                    <SelectItem value="america-los_angeles">
                      America/Los Angeles
                    </SelectItem>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                    <SelectItem value="asia-dubai">Asia/Dubai</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-[#3c3836]" />

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[#fe8019]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2] font-medium">
                      Prayer Time Calculation
                    </div>
                    <div className="text-sm text-[#a89984]">
                      Select your preferred calculation method
                    </div>
                  </div>
                </div>
                <Select defaultValue="isna">
                  <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
                    <SelectValue placeholder="Select calculation method" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                    <SelectItem value="isna">ISNA (North America)</SelectItem>
                    <SelectItem value="mwl">Muslim World League</SelectItem>
                    <SelectItem value="egypt">
                      Egyptian General Authority
                    </SelectItem>
                    <SelectItem value="makkah">Umm al-Qura, Makkah</SelectItem>
                    <SelectItem value="karachi">
                      University of Islamic Sciences, Karachi
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#3c3836] pt-4 flex justify-end">
            <Button
              onClick={() => updateGeneralSettings()}
              className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]"
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
