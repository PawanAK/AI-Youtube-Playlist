import { NextResponse } from 'next/server';
import { generatePlaylistIdeas } from '@/lib/anthropic';
import { createPlaylist } from '@/lib/youtube';
import { prisma } from '@/lib/db';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryOperation<T>(operation: () => Promise<T>): Promise<T> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === MAX_RETRIES) throw error;
      console.warn(`Attempt ${attempt} failed, retrying in ${RETRY_DELAY}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('This should never be reached');
}

export async function POST(request: Request) {
  try {
    const { theme } = await request.json();
    console.log('Received theme:', theme);

    const ideas = await generatePlaylistIdeas(theme);
    console.log('Generated playlist ideas:', ideas);

    const playlist = await createPlaylist(ideas);
    console.log('Created playlist:', playlist);

    // Store the playlist in the database with retry mechanism
    const savedPlaylist = await retryOperation(async () => {
      return prisma.playlist.create({
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
    });

    console.log('Saved playlist to database:', savedPlaylist);

    return NextResponse.json(savedPlaylist);
  } catch (error) {
    console.error('Error generating playlist:', error);
    return NextResponse.json({ error: 'Failed to generate playlist' }, { status: 500 });
  }
}