import axios from 'axios';
import { getWeatherByCoords } from '../config/weather';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const getSpotifyAccessToken = async (code) => {
  try {
    const response = await axios.post(SPOTIFY_AUTH_ENDPOINT, null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

export const getUserTopTracks = async (accessToken, limit = 20) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}/me/top/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: limit,
        time_range: 'medium_term',
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching user top tracks:', error);
    throw error;
  }
};

export const getUserCurrentlyPlaying = async (accessToken) => {
  try {
    const response = await axios.get(
      `${SPOTIFY_API_BASE}/me/player/currently-playing`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    throw error;
  }
};

export const searchSpotifyTracks = async (accessToken, query) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 20,
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    throw error;
  }
};

export const getRecommendations = async (accessToken, weatherCondition) => {
  try {
    // Map weather to music genres
    const genreMap = {
      sunny: ['pop', 'dance', 'indie'],
      rainy: ['indie', 'rnb', 'acoustic'],
      cloudy: ['alternative', 'indie', 'rock'],
      stormy: ['metal', 'rock', 'electronic'],
      snowy: ['chill', 'ambient', 'folk'],
    };

    const genres = genreMap[weatherCondition] || ['pop', 'indie', 'alternative'];
    const seedGenres = genres.slice(0, 3).join(',');

    const response = await axios.get(`${SPOTIFY_API_BASE}/recommendations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        seed_genres: seedGenres,
        limit: 30,
        market: 'IN',
      },
    });
    return response.data.tracks;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export const playTrack = async (accessToken, trackUri, deviceId) => {
  try {
    await axios.put(
      `${SPOTIFY_API_BASE}/me/player/play`,
      {
        uris: [trackUri],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          device_id: deviceId,
        },
      }
    );
  } catch (error) {
    console.error('Error playing track:', error);
    throw error;
  }
};

export const pausePlayback = async (accessToken, deviceId) => {
  try {
    await axios.put(
      `${SPOTIFY_API_BASE}/me/player/pause`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          device_id: deviceId,
        },
      }
    );
  } catch (error) {
    console.error('Error pausing playback:', error);
    throw error;
  }
};
