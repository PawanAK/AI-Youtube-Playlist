import { NextResponse } from 'next/server';
import { generatePlaylistIdeas } from '@/lib/anthropic';
import { createPlaylist } from '@/lib/youtube';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { theme } = await request.json();
    console.log('Received theme:', theme);

    const ideas = await generatePlaylistIdeas(theme);
    console.log('Generated playlist ideas:', ideas);

    const playlist = await createPlaylist(ideas);
    console.log('Created playlist:', playlist);

    // Store the playlist in the database
    const savedPlaylist = await prisma.playlist.create({
      data: {
        theme,
        videos: {
          create: playlist.map(video => ({
            title: video.title,
            videoId: video.videoId,
            thumbnail: video.thumbnail,
          })),
        },
      },
      include: {
        videos: true,
      },
    });
    console.log('Saved playlist to database:', savedPlaylist);

    return NextResponse.json(savedPlaylist);
  } catch (error) {
    console.error('Error generating playlist:', error);
    return NextResponse.json({ error: 'Failed to generate playlist' }, { status: 500 });
  }
}