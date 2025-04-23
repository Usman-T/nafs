import Link from "next/link"
import { Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-dark-bg0 bg-dark-pattern">
      <header className="border-b border-dark-bg2 bg-dark-bg0/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-dark-orange-light" />
            <span className="text-xl font-bold text-dark-fg0">Spiritual Path</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-dark-orange to-dark-orange-light px-4 py-2 text-sm font-medium text-white shadow-md hover:from-dark-orange/90 hover:to-dark-orange-light/90 transition-all duration-300"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light"></div>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-dark-fg0">Welcome back</CardTitle>
              <CardDescription className="text-center text-dark-fg2">Continue your spiritual journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-dark-fg1">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-dark-bg0 border-dark-bg2 text-dark-fg0 focus-visible:ring-dark-orange focus-visible:border-dark-orange"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-dark-fg1">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-dark-orange-light hover:text-dark-fg0 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-dark-bg0 border-dark-bg2 text-dark-fg0 focus-visible:ring-dark-orange focus-visible:border-dark-orange"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-dark-bg2 data-[state=checked]:bg-dark-orange data-[state=checked]:text-white"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-dark-fg1"
                >
                  Remember me
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300">
                Sign In
              </Button>
              <div className="text-center text-sm text-dark-fg2">
                Don't have an account?{" "}
                <Link href="/register" className="text-dark-orange-light hover:text-dark-fg0 underline underline-offset-4 transition-colors">
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </Card>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-dark-bg2" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-dark-bg0 px-2 text-dark-fg2">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              {/* Social Login Buttons */}
            </div>\
