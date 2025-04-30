import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createUser } from "@/lib/actions";

export default function RegisterPage() {
  return (
    <form action={createUser}>
      <Card className="border-[#2e2e2e] bg-[#1e1e1e]/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#e0e0e0]">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-[#909090]">
            Begin your journey to spiritual enlightenment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#e0e0e0]">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              className="border-[#2e2e2e] bg-[#121212] text-[#e0e0e0] focus-visible:ring-[#d65d0e]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#e0e0e0]">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="border-[#2e2e2e] bg-[#121212] text-[#e0e0e0] focus-visible:ring-[#d65d0e]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#e0e0e0]">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="border-[#2e2e2e] bg-[#121212] text-[#e0e0e0] focus-visible:ring-[#d65d0e]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-[#e0e0e0]">
              Confirm Password
            </Label>
            <Input
              id="confirm"
              type="password"
              required
              className="border-[#2e2e2e] bg-[#121212] text-[#e0e0e0] focus-visible:ring-[#d65d0e]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="border-[#2e2e2e] data-[state=checked]:bg-[#d65d0e] data-[state=checked]:text-white"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#909090]"
            >
              I agree to the{" "}
              <Link
                href="#"
                className="text-[#d65d0e] hover:text-[#fe8019] underline underline-offset-4"
              >
                terms of service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-[#d65d0e] hover:text-[#fe8019] underline underline-offset-4"
              >
                privacy policy
              </Link>
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-[#d65d0e] hover:bg-[#b35309] text-white">
            Create Account
          </Button>
          <div className="text-center text-sm text-[#909090]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#d65d0e] hover:text-[#fe8019] underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
