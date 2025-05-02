"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Moon, Sun, Globe, Lock, Shield, Clock, Languages, Users } from "lucide-react"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [reminderNotifications, setReminderNotifications] = useState(true)
  const [achievementNotifications, setAchievementNotifications] = useState(true)

  return (
    <div className="space-y-8">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-[#1d2021] border border-[#3c3836] mb-4">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]">
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]">
            Account
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ebdbb2]">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                        {isDarkMode ? (
                          <Moon className="h-5 w-5 text-[#fe8019]" />
                        ) : (
                          <Sun className="h-5 w-5 text-[#fe8019]" />
                        )}
                      </div>
                      <div>
                        <div className="text-[#ebdbb2] font-medium">Appearance</div>
                        <div className="text-sm text-[#a89984]">Toggle between dark and light mode</div>
                      </div>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
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
                        <div className="text-sm text-[#a89984]">Select your preferred language</div>
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
                        <div className="text-sm text-[#a89984]">Set your local time zone for accurate prayer times</div>
                      </div>
                    </div>
                    <Select defaultValue="america-new_york">
                      <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                        <SelectItem value="america-new_york">America/New York</SelectItem>
                        <SelectItem value="america-los_angeles">America/Los Angeles</SelectItem>
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
                        <div className="text-[#ebdbb2] font-medium">Prayer Time Calculation</div>
                        <div className="text-sm text-[#a89984]">Select your preferred calculation method</div>
                      </div>
                    </div>
                    <Select defaultValue="isna">
                      <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
                        <SelectValue placeholder="Select calculation method" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                        <SelectItem value="isna">ISNA (North America)</SelectItem>
                        <SelectItem value="mwl">Muslim World League</SelectItem>
                        <SelectItem value="egypt">Egyptian General Authority</SelectItem>
                        <SelectItem value="makkah">Umm al-Qura, Makkah</SelectItem>
                        <SelectItem value="karachi">University of Islamic Sciences, Karachi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#3c3836] pt-4 flex justify-end">
                <Button className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]">Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ebdbb2]">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                      <Bell className="h-5 w-5 text-[#fe8019]" />
                    </div>
                    <div>
                      <div className="text-[#ebdbb2] font-medium">Enable Notifications</div>
                      <div className="text-sm text-[#a89984]">Receive notifications for important updates</div>
                    </div>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    className="data-[state=checked]:bg-[#fe8019]"
                  />
                </div>

                <Separator className="bg-[#3c3836]" />

                <div className="space-y-4">
                  <h3 className="text-[#ebdbb2] font-medium">Notification Types</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[#ebdbb2]">Email Notifications</div>
                        <div className="text-xs text-[#a89984]">Receive updates via email</div>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        disabled={!notificationsEnabled}
                        className="data-[state=checked]:bg-[#fe8019]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[#ebdbb2]">Push Notifications</div>
                        <div className="text-xs text-[#a89984]">Receive notifications on your device</div>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                        disabled={!notificationsEnabled}
                        className="data-[state=checked]:bg-[#fe8019]"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#3c3836]" />

                <div className="space-y-4">
                  <h3 className="text-[#ebdbb2] font-medium">Notification Categories</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[#ebdbb2]">Prayer Time Reminders</div>
                        <div className="text-xs text-[#a89984]">Get notified before prayer times</div>
                      </div>
                      <Switch
                        checked={reminderNotifications}
                        onCheckedChange={setReminderNotifications}
                        disabled={!notificationsEnabled}
                        className="data-[state=checked]:bg-[#fe8019]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[#ebdbb2]">Achievement Alerts</div>
                        <div className="text-xs text-[#a89984]">Get notified when you earn achievements</div>
                      </div>
                      <Switch
                        checked={achievementNotifications}
                        onCheckedChange={setAchievementNotifications}
                        disabled={!notificationsEnabled}
                        className="data-[state=checked]:bg-[#fe8019]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#3c3836] pt-4 flex justify-end">
                <Button className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]">Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="account">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ebdbb2]">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-[#ebdbb2] font-medium">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-email" className="text-[#a89984]">
                        Email Address
                      </Label>
                      <Input
                        id="account-email"
                        defaultValue="abdullah@example.com"
                        className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-username" className="text-[#a89984]">
                        Username
                      </Label>
                      <Input
                        id="account-username"
                        defaultValue="abdullah_ahmed"
                        className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#3c3836]" />

                <div className="space-y-4">
                  <h3 className="text-[#ebdbb2] font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-[#a89984]">
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-[#a89984]">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-[#a89984]">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#3c3836]" />

                <div className="space-y-4">
                  <h3 className="text-[#ebdbb2] font-medium">Connected Accounts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#3c3836] flex items-center justify-center mr-3">
                          <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[#ebdbb2]">Google</div>
                          <div className="text-xs text-[#a89984]">Connected</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                      >
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#3c3836] flex items-center justify-center mr-3">
                          <svg className="h-4 w-4 text-[#1877F2]" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[#ebdbb2]">Facebook</div>
                          <div className="text-xs text-[#a89984]">Not connected</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#3c3836] pt-4 flex justify-end">
                <Button className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]">Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="privacy">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
                        <div className="text-[#ebdbb2] font-medium">Profile Visibility</div>
                        <div className="text-sm text-[#a89984]">Control who can see your profile</div>
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
                        <div className="text-[#ebdbb2] font-medium">Activity Sharing</div>
                        <div className="text-sm text-[#a89984]">Share your activity with others</div>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#fe8019]" />
                  </div>

                  <Separator className="bg-[#3c3836]" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center">
                        <Users className="h-5 w-5 text-[#fe8019]" />
                      </div>
                      <div>
                        <div className="text-[#ebdbb2] font-medium">Community Participation</div>
                        <div className="text-sm text-[#a89984]">Allow others to see your participation</div>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#fe8019]" />
                  </div>

                  <Separator className="bg-[#3c3836]" />

                  <div className="space-y-4">
                    <h3 className="text-[#ebdbb2] font-medium">Data Usage</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[#ebdbb2]">Analytics</div>
                          <div className="text-xs text-[#a89984]">Allow anonymous usage data collection</div>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-[#fe8019]" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[#ebdbb2]">Personalization</div>
                          <div className="text-xs text-[#a89984]">Personalize your experience based on activity</div>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-[#fe8019]" />
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
                <Button className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]">Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
