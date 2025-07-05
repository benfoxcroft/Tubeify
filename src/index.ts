import SpotifyAPI from "spotify-web-api-node";
import YTMusic from "ytmusic-api";
import cleanSpotifyId from "./helpers/cleanSpotify";

export interface AuthClients {
  spotifyAPI: SpotifyAPI;
  ytMusic: YTMusic;
}

export interface SpotifyCredentials {
  clientID: string;
  clientSecret: string;
}

export async function auth({
  clientID,
  clientSecret,
}: SpotifyCredentials): Promise<AuthClients> {
  if (!clientID) throw new Error("No Client ID Provided");
  if (!clientSecret) throw new Error("No Client Secret Key Provided");

  const spotifyAPI = new SpotifyAPI({
    clientId: clientID,
    clientSecret,
  });

  const grant = await spotifyAPI.clientCredentialsGrant();
  spotifyAPI.setAccessToken(grant.body.access_token);

  const ytMusic = new YTMusic();
  await ytMusic.initialize();

  return { spotifyAPI, ytMusic };
}

export async function getSong(
  spotifyID: string,
  { spotifyAPI, ytMusic }: AuthClients
): Promise<string | null> {
  if (!spotifyID || spotifyID === "") {
    throw new Error("You need to provide a Spotify Track!");
  }

  // Clean and validate the track ID
  const cleanID = cleanSpotifyId(spotifyID);
  if (!cleanID) {
    throw new Error("Invalid Spotify track ID provided");
  }

  // Get Spotify track data
  const track = (await spotifyAPI.getTrack(cleanID)).body;
  if (!track) {
    throw new Error("No track found for the provided ID");
  }

  try {
    // Search on YouTube Music
    const searchQuery = `${track.name} ${track.artists
      .map((artist: any) => artist.name)
      .join(" ")}`;
    let content = await ytMusic.searchSongs(searchQuery);

    // Filter by primary artist
    content = content.filter(
      (song) => song?.artist?.name === track.artists[0].name
    );

    // Return YouTube URL or null if not found
    if (content.length === 0) {
      return null;
    } else {
      return `https://youtube.com/watch?v=${content[0].videoId}`;
    }
  } catch (error) {
    console.error(`Error searching for track ${track.name}:`, error);
    return null;
  }
}

export default { auth, getSong }