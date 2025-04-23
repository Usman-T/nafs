import Link from "next/link"
import { ChevronLeft, CheckCircle, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CompletePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/onboarding/progress">
          <Button variant="ghost" className="text-dark-fg1 hover:text-dark-fg0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-2 rounded-full bg-dark-orange-light"></div>
          <div className="h-2 w-8 rounded-full bg-dark-orange-light"></div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-dark-orange to-dark-orange-light flex items-center justify-center shadow-orange-glow animate-pulse-slow">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-dark-fg0">You're All Set!</h1>
        <p className="text-lg text-dark-fg1 max-w-2xl mx-auto">
          You're ready to begin your spiritual journey with Spiritual Path
        </p>
      </div>

      <Card className="border-dark-bg2 bg-dark-bg1 card-gradient shadow-dark-glow overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dark-orange to-dark-orange-light"></div>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-2xl font-bold text-dark-fg0">What's Next?</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Create Your Account",
                    description: "Sign up to start tracking your spiritual journey",
                  },
                  {
                    title: "Complete Your First Challenge",
                    description: "Begin with the Beginner's Path challenge",
                  },
                  {
                    title: "Track Daily Activities",
                    description: "Record your prayers, Quran reading, and other spiritual practices",
                  },
                  {
                    title: "Monitor Your Progress",
                    description: "Watch your spiritual dimensions grow over time",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mr-4 mt-1 h-6 w-6 rounded-full bg-dark-orange-light flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-fg0">{step.title}</h3>
                      <p className="text-sm text-dark-fg1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[300px] w-[300px] rounded-full bg-dark-bg0/50 flex items-center justify-center shadow-dark-glow">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-dark-orange/10 to-dark-orange-light/5"></div>
                <Moon className="h-32 w-32 text-dark-orange-light opacity-80" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Link href="/register">
          <Button className="bg-gradient-to-r from-dark-orange to-dark-orange-light hover:from-dark-orange/90 hover:to-dark-orange-light/90 text-white shadow-md transition-all duration-300 px-8 py-6 text-lg">
            Create Your Account
          </Button>
        </Link>
      </div>
      <div className="text-center">
        <Link href="/sign-in" className="text-dark-fg1 hover:text-dark-fg0 transition-colors">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  )
}
