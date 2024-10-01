'use client'

import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Play as PlayIcon, Loader2 } from "lucide-react"
import Link from "next/link"

export function GeneratePlaylist({ playlist, isLoading }) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Your AI-Generated Playlist
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-2">Playlist: {playlist.theme}</h2>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
              <p className="mt-4 text-lg text-gray-600">Generating your playlist...</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {playlist.videos.map((video, index) => (
                <li key={index} className="bg-white shadow rounded-lg p-4 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-24 h-16 bg-gray-300 rounded flex items-center justify-center">
                      <PlayIcon className="h-8 w-8 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{video.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{video.videoId}</span>
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
    </section>
  )
}