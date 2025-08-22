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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

const AccountSettingsTab = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const updatePrivacySettings = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
    });
  };

  return (
    <TabsContent value="account">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ebdbb2] text-lg font-semibold">
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            {/* Account Info */}
            <section className="space-y-3">
              <h3 className="text-[#ebdbb2] text-sm font-medium tracking-wide">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="account-email" className="text-[#a89984] text-xs">
                    Email Address
                  </Label>
                  <Input
                    id="account-email"
                    defaultValue={session?.user?.email}
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="account-username" className="text-[#a89984] text-xs">
                    Name
                  </Label>
                  <Input
                    id="account-username"
                    defaultValue={session?.user?.name}
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
              </div>
            </section>

            <Separator className="bg-[#3c3836] my-2" />

            {/* Change Password */}
            <section className="space-y-3">
              <h3 className="text-[#ebdbb2] text-sm font-medium tracking-wide">
                Change Password
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="current-password" className="text-[#a89984] text-xs">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-password" className="text-[#a89984] text-xs">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password" className="text-[#a89984] text-xs">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
              </div>
            </section>

            <Separator className="bg-[#3c3836] my-2" />

            {/* Connected Accounts */}
            <section className="space-y-3">
              <h3 className="text-[#ebdbb2] text-sm font-medium tracking-wide">
                Connected Accounts
              </h3>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1d2021] border border-[#3c3836]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#3c3836] flex items-center justify-center">
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
                    <div className="text-[#ebdbb2] text-sm">Google</div>
                    <div className="text-xs text-[#a89984]">Connected</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2] text-xs px-3"
                >
                  Disconnect
                </Button>
              </div>
            </section>
          </CardContent>

          <CardFooter className="border-t border-[#3c3836] pt-3 flex justify-end">
            <Button
              onClick={() => updatePrivacySettings()}
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

export default AccountSettingsTab;
