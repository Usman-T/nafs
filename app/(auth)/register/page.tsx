"use client";

import type React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef } from "react";
import { useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { createUser, State } from "@/lib/actions";

export default function SignupPage() {
  const initialState: State = { message: null, errors: {} };
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [state, formAction, isPending] = useActionState(
    async (prevState: State, formData: FormData) => {
      const result = await createUser(prevState, formData);
      if (result?.message === "Account created successfully") {
        toast.success("Account created!");
        router.push(callbackUrl);
      }
      return result;
    },
    initialState
  );

  const getFirstError = (field: keyof State["errors"]) =>
    state.errors?.[field]?.[0];

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <Moon className="h-6 w-6 text-[#fe8019]" />
              <span className="text-xl font-bold">Nafs</span>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-2">Create an account</h1>
              <p className="text-[#a89984]">
                Start your spiritual journey today
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="name@example.com"
                      className="bg-[#282828] border-[#3c3836] text-[#ebdbb2] focus-visible:ring-[#fe8019]"
                    />
                    {getFirstError("name" as keyof State["errors"]) && (
                      <p className="mt-1 text-sm text-red-500">
                        {getFirstError("name" as keyof State["errors"])}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      className="bg-[#282828] border-[#3c3836] text-[#ebdbb2] focus-visible:ring-[#fe8019]"
                    />
                    {getFirstError("email" as keyof State["errors"]) && (
                      <p className="mt-1 text-sm text-red-500">
                        {getFirstError("email" as keyof State["errors"])}
                      </p>
                    )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="bg-[#282828] border-[#3c3836] text-[#ebdbb2] focus-visible:ring-[#fe8019]"
                  />
                  {getFirstError("password" as keyof State["errors"]) && (
                    <p className="mt-1 text-sm text-red-500">
                      {getFirstError("password" as keyof State["errors"])}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    name="confirm"
                    placeholder="••••••••"
                    className="bg-[#282828] border-[#3c3836] text-[#ebdbb2] focus-visible:ring-[#fe8019]"
                  />
                  {getFirstError("confirm" as keyof State["errors"]) && (
                    <p className="mt-1 text-sm text-red-500">
                      {getFirstError("confirm" as keyof State["errors"])}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  name="terms"
                  className="border-[#3c3836] data-[state=checked]:bg-[#fe8019] data-[state=checked]:border-[#fe8019]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#a89984]"
                >
                  I agree to the{" "}
                  <Link href="#" className="text-[#fe8019] hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-[#fe8019] hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#fe8019] hover:bg-[#d65d0e] text-[#1d2021]"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <div className="mt-6 text-center text-sm text-[#a89984]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#fe8019] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}