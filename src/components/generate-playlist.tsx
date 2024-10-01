'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Loader2, ThumbsUp, ThumbsDown, Play as PlayIcon } from "lucide-react"
import Link from "next/link"

export function GeneratePlaylist() {
  const [isLoading, setIsLoading] = useState(true)
  const [playlist, setPlaylist] = useState([])

  useEffect(() => {
    // Simulate API call to generate playlist
    const timer = setTimeout(() => {
      setIsLoading(false)
      setPlaylist([
        { title: "Introduction to AI", channel: "TechTalks", duration: "10:23", views: "1.2M" },
        { title: "Machine Learning Basics", channel: "CodeMasters", duration: "15:45", views: "890K" },
        { title: "Neural Networks Explained", channel: "AI Enthusiast", duration: "12:30", views: "2.1M" },
        { title: "The Future of AI", channel: "FutureTech", duration: "18:12", views: "3.5M" },
        { title: "AI in Healthcare", channel: "MedTech Review", duration: "14:55", views: "750K" },
      ])
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

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
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Your AI-Generated Playlist
          </h1>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-100 p-4 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-2">Playlist: AI and Machine Learning</h2>
              <p className="text-gray-600">Based on your input: "AI and machine learning basics"</p>
            </div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
                <p className="mt-4 text-lg text-gray-600">Generating your playlist...</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {playlist.map((video, index) => (
                  <li key={index} className="bg-white shadow rounded-lg p-4 flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-24 h-16 bg-gray-300 rounded flex items-center justify-center">
                        <PlayIcon className="h-8 w-8 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.channel}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{video.duration}</span>
                        <span className="mx-2">•</span>
                        <span>{video.views} views</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Button variant="ghost" size="icon" className="text-gray-600 hover:text-red-600">
                        <ThumbsUp className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-600 hover:text-red-600">
                        <ThumbsDown className="h-5 w-5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex justify-center">
              <Button className="bg-red-600 text-white hover:bg-red-700">
                Save Playlist to YouTube
              </Button>
            </div>
          </div>
        </div>
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