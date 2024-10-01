'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Music } from "lucide-react"
import React from "react"

export function NeoTuneComponent() {
  const [showApp, setShowApp] = useState(false)
  const [theme, setTheme] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [playlist, setPlaylist] = useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate playlist');
      }
      const data = await response.json();
      setPlaylist(data.videos);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">NeoTune</h1>
        <p className="text-xl md:text-2xl mb-8">AI-Powered YouTube Playlists</p>
        {!showApp && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowApp(true)}
            className="bg-white text-black hover:bg-gray-200"
          >
            Get Started
          </Button>
        )}
      </motion.div>
      {showApp && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mt-8"
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Create Playlist</CardTitle>
              <CardDescription>Enter a theme for your AI-generated playlist</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter playlist theme..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Playlist"
                  )}
                </Button>
              </form>
            </CardContent>
            {playlist.length > 0 && (
              <CardFooter>
                <ScrollArea className="h-[300px] w-full">
                  <h2 className="text-xl font-semibold mb-4">Your Playlist</h2>
                  <ul className="space-y-4">
                    {playlist.map((video, index) => (
                      <li key={index} className="flex items-center space-x-4">
                        <img src={video.thumbnail} alt={video.title} className="w-20 h-20 object-cover rounded" />
                        <div>
                          <a
                            href={`https://www.youtube.com/watch?v=${video.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-blue-400"
                          >
                            {video.title}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  )
}