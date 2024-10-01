export async function searchYouTube(searchQuery: string) {
    console.log(`Searching YouTube for: ${searchQuery}`);
    searchQuery = searchQuery.replaceAll(" ", "+");
    console.count("youtube search");
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`,
      {
        method: "GET",
      }
    );
    console.log(`YouTube API response status: ${response.status}`);
    const json = await response.json();
    if (!json) {
      console.log("YouTube API returned no JSON");
      return null;
    }
    if (json.items[0] == undefined) {
      console.log("YouTube API returned no items");
      return null;
    }
    console.log(`Found video ID: ${json.items[0].id.videoId}`);
    return json.items[0].id.videoId;
  }
  
  export async function createPlaylist(ideas: string[]): Promise<any[]> {
    console.log(`Creating playlist from ${ideas.length} ideas`);
    const playlist = [];
  
    for (const idea of ideas) {
      console.log(`Searching for video: ${idea}`);
      const videoId = await searchYouTube(idea);
      if (videoId) {
        console.log(`Adding video to playlist: ${idea} (${videoId})`);
        playlist.push({
          title: idea,
          videoId: videoId,
          thumbnail: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        });
      } else {
        console.log(`No video found for: ${idea}`);
      }
    }
  
    console.log(`Playlist created with ${playlist.length} videos`);
    return playlist;
  }