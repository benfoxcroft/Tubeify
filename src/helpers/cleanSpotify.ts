export default function cleanSpotifyId(input: string): string | null {
  if (!input || typeof input !== 'string') {
    return null;
  }

  let trackId = input.trim();

  // Remove various Spotify URL formats
  const patterns = [
    /^spotify:track:(.+)$/,
    /^https?:\/\/open\.spotify\.com\/track\/([^?]+)/,
    /^https?:\/\/api\.spotify\.com\/v1\/tracks\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = trackId.match(pattern);
    if (match) {
      trackId = match[1];
      break;
    }
  }

  // Remove query parameters
  trackId = trackId.split('?')[0];

  // Validate: Spotify track IDs are exactly 22 characters, base62 (a-zA-Z0-9)
  if (!/^[a-zA-Z0-9]{22}$/.test(trackId)) {
    console.warn(`Invalid Spotify track ID: ${input} -> ${trackId}`);
    return null;
  }
  return trackId;
}