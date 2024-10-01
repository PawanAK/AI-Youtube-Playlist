'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayCircle, Zap, ListPlus, Brain} from "lucide-react"
import Link from "next/link"

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <PlayCircle className="h-6 w-6 text-red-600" />
          <span className="ml-2 text-xl font-bold">AI Playlists</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered YouTube Playlists
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Create perfect playlists tailored to your taste with the power of artificial intelligence.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1"
                    placeholder="Enter a topic or mood"
                    type="text"
                  />
                  <Button type="submit">Generate Playlist</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-12 w-12 text-red-600" />
                <h2 className="text-xl font-bold">Instant Curation</h2>
                <p className="text-sm text-gray-500">
                  Get personalized playlists in seconds based on your input.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Brain className="h-12 w-12 text-red-600" />
                <h2 className="text-xl font-bold">AI-Powered Recommendations</h2>
                <p className="text-sm text-gray-500">
                  Our AI understands your taste and suggests videos you'll love.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <ListPlus className="h-12 w-12 text-red-600" />
                <h2 className="text-xl font-bold">Easy Integration</h2>
                <p className="text-sm text-gray-500">
                  Seamlessly add our playlists to your YouTube account.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to transform your YouTube experience?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                  Join thousands of users who have discovered new content with AI-powered playlists.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 AI Playlists. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}