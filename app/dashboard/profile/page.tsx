
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Heart,
  Users,
  Moon,
  Compass,
  Sunrise,
} from "lucide-react"

function PrayingHands({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 11h3v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
      <path d="M15 7h3a1 1 0 0 1 1 1v7h-4" />
      <path d="M4.6 9a9 9 0 0 1 .4-2.8A1 1 0 0 1 6 5.5h12a1 1 0 0 1 1 .7 9 9 0 0 1 .4 2.8" />
      <path d="M7 5.5V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v.5" />
      <path d="M14 16v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
    </svg>
  )
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const userProfile = {
    name: "Abdullah Ahmed",
    email: "abdullah@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "January 15, 2023",
    bio: "Dedicated to continuous spiritual growth and self-improvement. Passionate about helping others on their journey.",
    level: 7,
    streak: 21,
    achievements: [
      { name: "30-Day Streak", description: "Completed tasks for 30 consecutive days", date: "March 15, 2023" },
      { name: "Quran Memorizer", description: "Memorized 5 new surahs", date: "April 10, 2023" },
      { name: "Community Leader", description: "Helped 10 new members", date: "May 5, 2023" },
    ],
    dimensions: [
      { name: "Salah", value: 85, icon: PrayingHands, color: "#83a598" },
      { name: "Quran", value: 62, icon: BookOpen, color: "#8ec07c" },
      { name: "Charity", value: 70, icon: Heart, color: "#fe8019" },
      { name: "Community", value: 45, icon: Users, color: "#fabd2f" },
      { name: "Dhikr", value: 78, icon: Moon, color: "#d3869b" },
      { name: "Knowledge", value: 68, icon: Compass, color: "#b8bb26" },
      { name: "Character", value: 73, icon: Sunrise, color: "#fb4934" },
    ],
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ebdbb2]">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 border-4 border-[#3c3836]">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt={userProfile.name} />
                  <AvatarFallback className="bg-[#3c3836] text-[#ebdbb2] text-4xl">
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center">
                  <Badge className="bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]">Level {userProfile.level}</Badge>
                  <div className="mt-2 text-sm text-[#a89984]">{userProfile.streak} day streak</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#a89984]">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue={userProfile.name}
                          className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#a89984]">
                          Email
                        </Label>
                        <Input
                          id="email"
                          defaultValue={userProfile.email}
                          className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#a89984]">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          defaultValue={userProfile.phone}
                          className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-[#a89984]">
                          Location
                        </Label>
                        <Input
                          id="location"
                          defaultValue={userProfile.location}
                          className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-[#a89984]">
                        Bio
                      </Label>
                      <textarea
                        id="bio"
                        defaultValue={userProfile.bio}
                        rows={4}
                        className="w-full rounded-md bg-[#1d2021] border border-[#3c3836] text-[#ebdbb2] p-2"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]"
                        onClick={() => setIsEditing(false)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-[#fe8019] mr-3" />
                        <div>
                          <div className="text-xs text-[#a89984]">Name</div>
                          <div className="text-[#ebdbb2]">{userProfile.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-[#fe8019] mr-3" />
                        <div>
                          <div className="text-xs text-[#a89984]">Email</div>
                          <div className="text-[#ebdbb2]">{userProfile.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-[#fe8019] mr-3" />
                        <div>
                          <div className="text-xs text-[#a89984]">Phone</div>
                          <div className="text-[#ebdbb2]">{userProfile.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-[#fe8019] mr-3" />
                        <div>
                          <div className="text-xs text-[#a89984]">Location</div>
                          <div className="text-[#ebdbb2]">{userProfile.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-[#fe8019] mr-3" />
                        <div>
                          <div className="text-xs text-[#a89984]">Joined</div>
                          <div className="text-[#ebdbb2]">{userProfile.joinDate}</div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4 bg-[#3c3836]" />

                    <div>
                      <div className="text-sm font-medium text-[#a89984] mb-2">Bio</div>
                      <p className="text-[#ebdbb2]">{userProfile.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="dimensions" className="w-full">
        <TabsList className="bg-[#1d2021] border border-[#3c3836] mb-4">
          <TabsTrigger
            value="dimensions"
            className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]"
          >
            Dimensions
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]"
          >
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dimensions">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ebdbb2]">Spiritual Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userProfile.dimensions.map((dimension, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                            style={{ backgroundColor: dimension.color }}
                          >
                            <dimension.icon className="h-4 w-4 text-[#1d2021]" />
                          </div>
                          <span className="text-[#ebdbb2]">{dimension.name}</span>
                        </div>
                        <span className="text-[#a89984]">{dimension.value}%</span>
                      </div>
                      <Progress value={dimension.value} className="h-2 bg-[#1d2021]" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="achievements">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ebdbb2]">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="p-4 rounded-md bg-[#1d2021] border border-[#3c3836]"
                    >
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-[#fe8019] flex items-center justify-center mr-4 flex-shrink-0">
                          <Award className="h-5 w-5 text-[#1d2021]" />
                        </div>
                        <div>
                          <h3 className="text-[#ebdbb2] font-medium">{achievement.name}</h3>
                          <p className="text-sm text-[#a89984] mt-1">{achievement.description}</p>
                          <div className="text-xs text-[#a89984] mt-2">Achieved on {achievement.date}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#3c3836] pt-4">
                <div className="text-center w-full text-[#a89984]">
                  Complete more challenges to unlock additional achievements!
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
