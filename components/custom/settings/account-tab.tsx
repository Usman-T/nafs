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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2, LogOut, Trash2 } from "lucide-react";
import { updateAccountSettings, deleteAccount } from "@/lib/actions";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const AccountSettingsTab = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const [username, setUsername] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateSettings = async () => {
    setLoading(true);
    try {
      toast.promise(
        new Promise(async (resolve, reject) => {
          const result = await updateAccountSettings({
            username,
            email,
            currentPassword,
            newPassword,
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

  const handleLogout = () => {
    console.log("Logging out user...");
    signOut();
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      console.log("Deleting account...");
      const result = await deleteAccount();
      if (result.success) {
        toast.success("Account deleted successfully.");
        signOut();
      } else {
        toast.error(result.error || "Failed to delete account.");
      }
    } catch {
      toast.error("Failed to delete account.");
      setDeleting(false);
    }
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
          <CardContent>
            {/* Account Info */}
            <section className="space-y-3">
              <h3 className="text-[#ebdbb2] text-sm font-medium tracking-wide">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="account-email"
                    className="text-[#a89984] text-xs"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="account-email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="account-username"
                    className="text-[#a89984] text-xs"
                  >
                    Name
                  </Label>
                  <Input
                    id="account-username"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                  <Label
                    htmlFor="current-password"
                    className="text-[#a89984] text-xs"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    placeholder="••••••••"
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="new-password"
                    className="text-[#a89984] text-xs"
                  >
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    placeholder="••••••••"
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="confirm-password"
                    className="text-[#a89984] text-xs"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] text-sm"
                  />
                </div>
              </div>
            </section>

            <Separator className="bg-[#3c3836] my-2" />

            {/* Logout and Delete */}
            <section className="space-y-3">
              <h3 className="text-[#ebdbb2] text-sm font-medium tracking-wide">
                Danger Zone
              </h3>

              {/* Logout */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1d2021] border border-[#3c3836]">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-3 min-w-0 cursor-pointer hover:opacity-80">
                      <div className="h-8 w-8 flex-shrink-0 rounded-lg bg-[#3c3836] flex items-center justify-center">
                        <LogOut className="h-4 w-4 text-[#fe8019]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-left truncate text-[#ebdbb2] text-sm">
                          Log out
                        </div>
                        <div className="text-xs text-[#a89984] truncate block sm:hidden">
                          Logout of your account on this device
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] max-w-xs">
                    <div className="font-medium mb-2">Log out</div>
                    <div className="text-sm text-[#a89984] mb-3">
                      Logout of your account on this device
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2] text-xs px-3 w-full"
                    >
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
                <div className="hidden sm:block text-sm text-[#a89984]">
                  Logout of your account on this device
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2] text-xs px-3 hidden sm:flex"
                >
                  Logout
                </Button>
              </div>

              {/* Delete Account */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1d2021] border border-[#3c3836]">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-3 min-w-0 cursor-pointer hover:opacity-80">
                      <div className="h-8 w-8 flex-shrink-0 rounded-lg bg-[#3c3836] flex items-center justify-center">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-left truncate text-red-400 text-sm">
                          Delete account
                        </div>
                        <div className="text-xs text-[#a89984] truncate block sm:hidden">
                          Delete your account permanently
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] max-w-xs">
                    <div className="font-medium mb-2 text-red-400">Delete account</div>
                    <div className="text-sm text-[#a89984] mb-3">
                      Delete your account permanently
                    </div>
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="text-xs px-3 w-full"
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#282828] border-[#3c3836]">
                        <DialogHeader>
                          <DialogTitle className="text-[#ebdbb2]">
                            Delete Account
                          </DialogTitle>
                          <DialogDescription className="text-[#a89984]">
                            Are you sure you want to delete your account? This action cannot be undone. 
                            All your data will be permanently removed from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            className="border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            className="flex items-center gap-2"
                          >
                            {deleting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete Account"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </PopoverContent>
                </Popover>
                <div className="hidden sm:block text-sm text-red-400">
                  Delete your account permanently
                </div>
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="text-xs px-3 hidden sm:flex"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#282828] border-[#3c3836]">
                    <DialogHeader>
                      <DialogTitle className="text-[#ebdbb2]">
                        Delete Account
                      </DialogTitle>
                      <DialogDescription className="text-[#a89984]">
                        Are you sure you want to delete your account? This action cannot be undone. 
                        All your data will be permanently removed from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteDialogOpen(false)}
                        className="border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        className="flex items-center gap-2"
                      >
                        {deleting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete Account"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </section>
          </CardContent>

          <CardFooter className="border-t border-[#3c3836] pt-3 flex justify-end">
            <Button
              onClick={updateSettings}
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

export default AccountSettingsTab;