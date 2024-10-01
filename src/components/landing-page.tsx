'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayCircle, Zap, ListPlus, Brain, Play} from "lucide-react"
import Link from "next/link"
import { useState } from 'react'
import { GeneratePlaylist } from "@/components/generate-playlist"

export function LandingPageComponent({ children }: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState('')
  const [playlist, setPlaylist] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate playlist')
      }

      const data = await response.json()
      setPlaylist(data)
    } catch (error) {
      console.error('Error generating playlist:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200">
        <Link className="flex items-center justify-center" href="#">
          <div className="relative w-8 h-6 mr-2">
            <div className="absolute inset-0 bg-red-600 rounded"></div>
            <Play className="absolute inset-0 w-4 h-4 m-auto text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">AITube Playlists</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-700 hover:text-red-600" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-red-600" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-red-600" href="#">
            About
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-red-600" href="/history">
  History
</Link>
        </nav>
      </header>
      <main className="flex-1">
        {children ? children : (
          <>
            <section className="w-full py-12 md:py-16 lg:py-20 bg-red-600">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                      AI-Powered YouTube Playlists
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
                      Create perfect playlists tailored to your taste with the power of artificial intelligence.
                    </p>
                  </div>
                  <div className="w-full max-w-sm space-y-2">
                    <form className="flex space-x-2" onSubmit={handleSubmit}>
                      <Input
                        className="flex-1 bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter a topic "
                        type="text"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                      />
                      <Button type="submit" className="bg-white text-red-600 hover:bg-gray-100" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Playlist'}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            {playlist && <GeneratePlaylist playlist={playlist} isLoading={isLoading} />}
            <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
              <div className="container px-4 md:px-6">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <Zap className="h-12 w-12 text-red-600" />
                    <h2 className="text-xl font-bold text-gray-900">Instant Curation</h2>
                    <p className="text-sm text-gray-600">
                      Get personalized playlists in seconds based on your input.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <Brain className="h-12 w-12 text-red-600" />
                    <h2 className="text-xl font-bold text-gray-900">AI-Powered Recommendations</h2>
                    <p className="text-sm text-gray-600">
                      Our AI understands your taste and suggests videos you'll love.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <ListPlus className="h-12 w-12 text-red-600" />
                    <h2 className="text-xl font-bold text-gray-900">Easy Integration</h2>
                    <p className="text-sm text-gray-600">
                      Seamlessly add our playlists to your YouTube account.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                      Ready to transform your YouTube experience?
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
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
                      <Button type="submit" className="bg-red-600 text-white hover:bg-red-700">
                        Get Started
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200">
        <p className="text-xs text-gray-600">© 2023 AITube Playlists. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-600 hover:text-red-600" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-600 hover:text-red-600" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}