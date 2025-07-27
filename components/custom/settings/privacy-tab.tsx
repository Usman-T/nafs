import { motion } from "framer-motion"; import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TabsContent} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Shield, Users } from "lucide-react";

const PrivacySettingsTab = () => {
  return (
    <TabsContent value="privacy">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ebdbb2]">Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#fe8019]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2] font-medium">
                      Profile Visibility
                    </div>
                    <div className="text-sm text-[#a89984]">
                      Control who can see your profile
                    </div>
                  </div>
                </div>
                <Select defaultValue="friends">
                  <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-[140px]">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-[#3c3836]" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                    <Lock className="h-5 w-5 text-[#fe8019]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2] font-medium">
                      Activity Sharing
                    </div>
                    <div className="text-sm text-[#a89984]">
                      Share your activity with others
                    </div>
                  </div>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#fe8019]"
                />
              </div>

              <Separator className="bg-[#3c3836]" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#fe8019]" />
                  </div>
                  <div>
                    <div className="text-[#ebdbb2] font-medium">
                      Community Participation
                    </div>
                    <div className="text-sm text-[#a89984]">
                      Allow others to see your participation
                    </div>
                  </div>
                </div>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#fe8019]"
                />
              </div>

              <Separator className="bg-[#3c3836]" />

              <div className="space-y-4">
                <h3 className="text-[#ebdbb2] font-medium">Data Usage</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#ebdbb2]">Analytics</div>
                      <div className="text-xs text-[#a89984]">
                        Allow anonymous usage data collection
                      </div>
                    </div>
                    <Switch
                      defaultChecked
                      className="data-[state=checked]:bg-[#fe8019]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#ebdbb2]">Personalization</div>
                      <div className="text-xs text-[#a89984]">
                        Personalize your experience based on activity
                      </div>
                    </div>
                    <Switch
                      defaultChecked
                      className="data-[state=checked]:bg-[#fe8019]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#3c3836] pt-4 flex justify-between">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              Delete Account
            </Button>
            <Button className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

export default PrivacySettingsTab;
