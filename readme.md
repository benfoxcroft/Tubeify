# Tubeify

A modern, **TypeScript-first** Node.js library to seamlessly convert Spotify tracks to YouTube Music links. Built with **strong typing** and **async/await** for optimal performance.

## ✨ Features

- 🔷 **Full TypeScript support** with comprehensive type definitions
- 🛡️ **Strongly typed** interfaces and error handling
- ⚡ **Async/await** powered for modern JavaScript workflows
- 🔗 **Flexible input formats** - supports multiple Spotify URL types
- 🚀 **Production-ready** with robust error handling

## Installation

```bash
npm install tubeify
```

## Prerequisites

You'll need Spotify API credentials:
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Get your `Client ID` and `Client Secret`

## Usage

### TypeScript (Recommended)

```typescript
import { auth, getSong, type SpotifyCredentials, type AuthClients } from 'tubeify';

async function example(): Promise<void> {
  try {
    // Strongly typed credentials
    const credentials: SpotifyCredentials = {
      clientID: process.env.SPOTIFY_CLIENT_ID!, // Your Spotify Client ID
      clientSecret: process.env.SPOTIFY_SECRET!, // Your Spotify Client Secret
    };

    // Initialize authentication with type safety
    const token: AuthClients = await auth(credentials);

    // Convert Spotify track to YouTube Music link
    const request: string = 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=123';
    const response: string | null = await getSong(request, token);
    
    if (response === null) {
      throw new Error("Failed to get YouTube Link");
    }
    
    console.log(response); // https://youtube.com/watch?v=...
  } catch (error) {
    console.error(error);
  }
}

example();
```

### JavaScript (ES6+)

```javascript
import { auth, getSong } from 'tubeify';

async function example() {
  try {
    // Initialize authentication
    const token = await auth({
      clientID: process.env.SPOTIFY_CLIENT_ID, // Your Spotify Client ID
      clientSecret: process.env.SPOTIFY_SECRET, // Your Spotify Client Secret
    });

    // Convert Spotify track to YouTube Music link
    const request = 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=123';
    const response = await getSong(request, token);
    
    if (response === null) {
      throw new Error("Failed to get YouTube Link");
    }
    
    console.log(response); // https://youtube.com/watch?v=...
  } catch (error) {
    console.error(error);
  }
}

example();
```

## Supported Spotify URL Formats

The library accepts various Spotify track formats:

- **Plain ID**: `4cOdK2wGLETKBW3PvgPWqT`
- **Spotify URI**: `spotify:track:4cOdK2wGLETKBW3PvgPWqT`
- **Spotify URL**: `https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT`
- **Spotify URL with params**: `https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=123`

## API Reference

### `auth(credentials: SpotifyCredentials): Promise<AuthClients>`

Initializes authentication with Spotify and YouTube Music APIs using **strongly typed** credentials.

**Parameters:**
- `credentials` (SpotifyCredentials): **Type-safe** credentials object
  - `clientID` (string): Your Spotify Client ID
  - `clientSecret` (string): Your Spotify Client Secret  
  - `accessToken` (string, optional): Existing Spotify access token

**Returns:** Promise<AuthClients> - **Strongly typed** authentication clients

### `getSong(spotifyID: string, authClients: AuthClients): Promise<string | null>`

Converts a Spotify track to a YouTube Music link with **full type safety**.

**Parameters:**
- `spotifyID` (string): Spotify track ID or URL
- `authClients` (AuthClients): **Type-safe** authentication clients from `auth()`

**Returns:** Promise<string | null> - YouTube Music URL or null if not found

### TypeScript Interfaces

```typescript
interface SpotifyCredentials {
  clientID: string;
  clientSecret: string;
  accessToken?: string;
}

interface AuthClients {
  spotifyAPI: SpotifyAPI;
  ytMusic: YTMusic;
}
```

## Error Handling

The library provides **robust, type-safe error handling** for:
- Invalid Spotify credentials
- Invalid Spotify track IDs (with **compile-time validation**)
- Network issues with Spotify/YouTube APIs

**Best practices** with **strongly typed** error handling:

```typescript
try {
  const response: string | null = await getSong(trackId, token);
  if (response === null) {
    console.log("Track not found on YouTube Music");
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  }
}
```

## REST API Example

**Enterprise-ready** REST API implementation with **full TypeScript support**:

```typescript
import { auth, getSong, type SpotifyCredentials, type AuthClients } from 'tubeify';

interface ConvertRequest {
  client: string;
  secret: string;
  track: string;
}

async function convert(req: { body: ConvertRequest }, reply: any): Promise<string | boolean> {
  try {
    const credentials: SpotifyCredentials = {
      clientID: req.body.client,
      clientSecret: req.body.secret,
    };

    const token: AuthClients = await auth(credentials);
    const response: string | null = await getSong(req.body.track, token);
    
    if (response === null) {
      throw new Error("Failed to get YouTube Link");
    }
    
    reply.code(200);
    return response;
  } catch (error: unknown) {
    console.error(error);
    reply.code(500);
    return false;
  }
}
```

## Why TypeScript?

Tubeify is built with **TypeScript-first** principles to provide:

- 🔷 **Compile-time safety** - Catch errors before runtime
- 🛡️ **IntelliSense support** - Full IDE autocomplete and documentation
- 🚀 **Scalable architecture** - Perfect for enterprise applications
- 📋 **Self-documenting code** - Types serve as living documentation
- ⚡ **Developer experience** - Faster development with fewer bugs

## License

ISC

## Contributing

Issues and pull requests are welcome! Built with ❤️ and **modern TypeScript**.