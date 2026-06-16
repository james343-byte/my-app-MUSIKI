import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const initSpotify = (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
};

export const getSpotifyAuth = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ];
  
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}`;
};

export default spotifyApi;
