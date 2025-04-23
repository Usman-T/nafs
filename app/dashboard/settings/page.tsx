import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#3c3836]">Settings</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
          <CardHeader>
            <CardTitle className="text-[#3c3836]">Profile Settings</CardTitle>
            <CardDescription className="text-[#665c54]">Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#504945]">
                Full Name
              </Label>
              <Input
                id="name"
                defaultValue="Abdullah"
                className="border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836] focus-visible:ring-[#d65d0e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#504945]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="abdullah@example.com"
                className="border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836] focus-visible:ring-[#d65d0e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-[#504945]">
                Timezone
              </Label>
              <Select defaultValue="utc+3">
                <SelectTrigger className="border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836]">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc+0">UTC+0 (London)</SelectItem>
                  <SelectItem value="utc+1">UTC+1 (Paris)</SelectItem>
                  <SelectItem value="utc+2">UTC+2 (Cairo)</SelectItem>
                  <SelectItem value="utc+3">UTC+3 (Mecca)</SelectItem>
                  <SelectItem value="utc+4">UTC+4 (Dubai)</SelectItem>
                  <SelectItem value="utc+5">UTC+5 (Karachi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#d65d0e] hover:bg-[#af3a03] text-white">Save Changes</Button>
          </CardFooter>
        </Card>

        <Card className="border-[#d5c4a1] bg-[#ebdbb2]/50">
          <CardHeader>
            <CardTitle className="text-[#3c3836]">Prayer Settings</CardTitle>
            <CardDescription className="text-[#665c54]">Configure your prayer times and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calculation" className="text-[#504945]">
                Prayer Time Calculation Method
              </Label>
              <Select defaultValue="makkah">
                <SelectTrigger className="border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836]">
                  <SelectValue placeholder="Select calculation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makkah">Umm al-Qura, Makkah</SelectItem>
                  <SelectItem value="egypt">Egyptian General Authority</SelectItem>
                  <SelectItem value="karachi">University of Islamic Sciences, Karachi</SelectItem>
                  <SelectItem value="isna">Islamic Society of North America (ISNA)</SelectItem>
                  <SelectItem value="mwl">Muslim World League</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-[#504945]">
                Location
              </Label>
              <Input
                id="location"
                defaultValue="Riyadh, Saudi Arabia"
                className="border-[#d5c4a1] bg-[#fbf1c7] text-[#3c3836] focus-visible:ring-[#d65d0e]"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="\
\
