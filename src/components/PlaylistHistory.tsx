"use client"
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import { Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Playlist {
  id: string;
  theme: string;
  createdAt: string;
  videos: {
    id: string;
    title: string;
    videoId: string;
    thumbnail: string;
  }[];
}

export function PlaylistHistory() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await fetch('/api/playlists');
        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaylists();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Loading your playlists...</p>
      </div>
    );
  }

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBackClick = () => {
    setSelectedPlaylist(null);
  };

  return (
    <ScrollArea className="h-[600px]">
      {selectedPlaylist ? (
        <div className="space-y-6">
          <Button onClick={handleBackClick} variant="outline" className="mb-4">
            Back to Playlists
          </Button>
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-600">{selectedPlaylist.theme}</CardTitle>
              <p className="text-sm text-gray-500">
                Created on: {new Date(selectedPlaylist.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedPlaylist.videos.map((video) => (
                  <Link key={video.id} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Play Video</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">{video.title}</p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => handlePlaylistClick(playlist)}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-red-600">{playlist.theme}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Created on: {new Date(playlist.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight className="text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{playlist.videos.length} videos</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}