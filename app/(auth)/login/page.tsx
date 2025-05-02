"use client";

import type React from "react";

import Link from "next/link";
import { useActionState, useRef } from "react";
import { motion } from "framer-motion";
import { Moon, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { login, loginState } from "@/lib/actions";

const Login = () => {
  const initialState: loginState = { message: null, errors: {} };
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(login, initialState);

  const getFirstError = (field: keyof loginState["errors"]) =>
    state?.errors?.[field]?.[0];

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
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-[#a89984]">
                Sign in to continue your spiritual journey
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              className="w-full bg-[#3c3836] hover:bg-[#504945] text-[#ebdbb2] flex items-center justify-center gap-2 h-11 mb-6"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
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
              )}
              <span>
                {isPending ? "Signing in..." : "Continue with Google"}
              </span>
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-[#3c3836]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#1d2021] px-2 text-xs text-[#a89984]">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>

            <form action={formAction} ref={formRef} className="space-y-4">
              <input type="hidden" name="redirectTo" value="/dashboard" />
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={formRef.current?.email?.value}
                  name="email"
                  placeholder="name@example.com"
                />
                {getFirstError("email") && (
                  <p className="mt-1 text-sm text-red-500">
                    {getFirstError("email")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm text-[#fe8019] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  defaultValue={formRef.current?.password?.value}
                  name="password"
                  className="bg-[#282828] border-[#3c3836] text-[#ebdbb2] focus-visible:ring-[#fe8019]"
                />
                {getFirstError("password") && (
                  <p className="mt-1 text-sm text-red-500">
                    {getFirstError("password")}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-[#3c3836] data-[state=checked]:bg-[#fe8019] data-[state=checked]:border-[#fe8019]"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#a89984]"
                >
                  Remember me
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
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>{" "}
            </form>
          </motion.div>

          <div className="mt-6 text-center text-sm text-[#a89984]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#fe8019] hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
