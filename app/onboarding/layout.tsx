import type React from "react"
import Link from "next/link"
import { Moon } from "lucide-react"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-dark-bg0 bg-dark-pattern flex flex-col">
      <header className="border-b border-dark-bg2 bg-dark-bg0/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-dark-orange-light" />
            <span className="text-xl font-bold text-dark-fg0">Nafs</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium text-dark-fg1 hover:text-dark-fg0 transition-colors">
              Skip Onboarding
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="container max-w-4xl">{children}</div>
      </main>
      <footer className="border-t border-dark-bg2 bg-dark-bg0 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Moon className="h-5 w-5 text-dark-orange-light" />
              <span className="text-lg font-bold text-dark-fg0">Nafs</span>
            </div>
            <div className="text-sm text-dark-fg2">
              &copy; {new Date().getFullYear()} Nafs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
