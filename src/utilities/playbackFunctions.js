import { toast } from 'react-toastify';
import { handleUpdatePlaybackState, handleSpotifyAPIRequest } from './SpotifyFunctions';
import { handleFetchErrors } from "./utilities";

export const handleNoActiveDevicesError = (err) => {
  console.error(err);
  if(err.responseText.includes("No active device found"))
    toast.error("No active device found. Try starting playback on one of your devices, then try again.");
}

export const checkForValidToken = (token) => {
  let response = handleSpotifyAPIRequest(
    token,
    'https://api.spotify.com/v1/me',
  );
  return response;
}

/**
 * This function sends a PUT request to play a specified song to the Spotify Web API.
 * @param {string} token - The access token required for authorization to the Spotify API.
 * @param {string} trackURI - The specified track URI.
 * @param {function} dispatch - Function that updates the application state.
 * @returns {void}
*/
export const handlePlayTrack = async (token, trackURI, dispatch) => {
  // play track
  handleSpotifyAPIRequest(
    token,
    'https://api.spotify.com/v1/me/player/play',
    'PUT',
    {"uris": [trackURI]},
    () => toast.error("No active device found. Try starting playback on one of your devices, then try again.")
  )
  .then(handleFetchErrors)
  // Then get and update the current playback state
  .then(() => {
    handleUpdatePlaybackState(token, dispatch);
  })
  .catch(error => {
    console.error('Unable to play track:', error);
  });
}

/**
 * This function pauses or plays the current track via a PUT request to the Spotify Web API.
 * @param {string} token - The access token required for authorization to the Spotify API.
 * @param {string} trackURI - The specified track URI.
 * @param {function} dispatch - Function that updates the application state.
 * @returns {void}
*/
export const handlePausePlay = async (play = true, token, dispatch) => {

  let url = (play)
    ? 'https://api.spotify.com/v1/me/player/play'
    : 'https://api.spotify.com/v1/me/player/pause';

  handleSpotifyAPIRequest(
    token,
    url,
    'PUT',
    false,
    () => toast.error("No active device found. Try starting playback on one of your devices, then try again.")
  )
  .then(handleFetchErrors)
  // Then get and update the current playback state
  .then(() => {
    handleUpdatePlaybackState(token, dispatch);
  })
  .catch(error => {
    console.error('Unable to play track:', error);
  });
}

/**
 * This function skips to the next or prev track via a POST request to the Spotify Web API.
 * @param {string} token - The access token required for authorization to the Spotify API.
 * @param {string} trackURI - The specified track URI.
 * @param {function} dispatch - Function that updates the application state.
 * @returns {void}
*/
export const handleNextPrevious = async (next = true, token, dispatch) => {

  let url = (next)
    ? 'https://api.spotify.com/v1/me/player/next'
    : 'https://api.spotify.com/v1/me/player/previous';

  handleSpotifyAPIRequest(
    token,
    url,
    'POST',
    false,
    () => toast.error("No active device found. Try starting playback on one of your devices, then try again.")
  )
  .then(handleFetchErrors)
  // Then get and update the current playback state
  .then(() => {
    handleUpdatePlaybackState(token, dispatch);
  })
  .catch(error => {
    console.error('Unable to play track:', error);
  });
}