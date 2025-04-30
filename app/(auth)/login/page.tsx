"use client";

import { useRef } from "react";
import { useActionState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { login, loginState } from "@/lib/actions";

export default function LoginPage() {
  const initialState: loginState = { message: null, errors: {} };
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [state, formAction, isPending] = useActionState(
    async (prevState: loginState, formData: FormData) => {
      const result = await login(prevState, formData);
      if (result?.message === "Login successful") {
        toast.success("Welcome back!");
        router.push(callbackUrl);
      }
      return result;
    },
    initialState
  );

  const getFirstError = (field: keyof loginState["errors"]) => state.errors?.[field]?.[0];

  return (
    <form ref={formRef} action={formAction}>
      <Card className="border-[#2e2e2e] bg-[#1e1e1e]/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#e0e0e0]">
            Login your Account
          </CardTitle>
          <CardDescription className="text-center text-[#909090]">
            Begin your journey to spiritual enlightenment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["email", "password"].map((field) => (
            <div className="space-y-2" key={field}>
              <Label htmlFor={field} className="text-[#e0e0e0]">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                name={field}
                type={field === "password" ? "password" : "email"}
                className="border-[#2e2e2e] bg-[#121212] text-[#e0e0e0] focus-visible:ring-[#d65d0e]"
              />
              {getFirstError(field as keyof loginState["errors"]) && (
                <p className="mt-1 text-sm text-red-500">{getFirstError(field as keyof loginState["errors"])}</p>
              )}
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" name="remember" className="border-[#2e2e2e] data-[state=checked]:bg-[#d65d0e]" />
            <label htmlFor="remember" className="text-sm text-[#909090]">Remember me</label>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" disabled={isPending} className="w-full bg-[#d65d0e] hover:bg-[#b35309] text-white">
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <p className="text-center text-sm text-[#909090]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#d65d0e] hover:text-[#fe8019] underline">Register</Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
