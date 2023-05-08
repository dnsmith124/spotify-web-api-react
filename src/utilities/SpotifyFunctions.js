import { wait, handleFetchErrors } from "./utilities";
import { toast } from 'react-toastify';

/**
 * Function to handle requests to the Spotify API using fetch and an access token.
 * @param {string} token - The access token required to make authorized requests to the Spotify API.
 * @param {string} url - The URL to which the request is being made.
 * @param {string} [method] - The HTTP method to use for the request, defaults to POST.
 * @param {object} [body] - The body of the request, defaults to false.
 * @param {function} [onErrorCallback] - A function to be called if an error occurs during the request, defaults to an empty function.
 * @returns {Promise<Response>} - A Promise object that resolves to a Response object returned by the fetch function.
*/
export const handleSpotifyAPIRequest = async (token, url, method = 'POST', body = false, onErrorCallback = ()=>{}) => {
  let options = {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json', 
    },
  }
  if(body)
    options.body = JSON.stringify(body);

  return fetch(url, options)
    .then(res => {
      if (!res.ok) {
        onErrorCallback();
        console.error(res)
      }
      return res;
    })
}

/**
 * Generates a random string of specified length.
 * @param {number} length - The length of the string to be generated.
 * @returns {string} The randomly generated string of specified length.
*/
const generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Generates a code challenge for OAuth 2.0 PKCE flow using SHA-256 hashing algorithm.
 * @param {string} codeVerifier - The code verifier to be hashed and encoded.
 * @returns {Promise<string>} A promise that resolves to the generated code challenge string.
*/
const generateCodeChallenge = async (codeVerifier) => {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}


/**
 * Handles the Spotify login process by generating a code verifier and challenge,
 * storing the code verifier in local storage, and redirecting the user to the Spotify authorization page.
 * @param {string} clientId - The client ID provided by Spotify for authentication.
 * @param {string} redirectUri - The redirect URI for the application after authentication is completed.
 * @returns {void}
*/
export const handleLogin = async (clientId, redirectUri) => {
  let codeVerifier = generateRandomString(128);
  
  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = `user-read-email user-library-read user-top-read user-read-recently-played 
      user-read-playback-state user-modify-playback-state user-read-currently-playing`;
  
    localStorage.setItem('code_verifier', codeVerifier);
  
    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
  
    window.location = 'https://accounts.spotify.com/authorize?' + args;
  });
}

/**
 * This function retrieves the user's Spotify profile information by making a GET request to the Spotify Web API.
 * @param {string} token - The access token required for authorization to the Spotify API.
 * @param {function} dispatch - Function that updates the application state.
 * @returns {void}
*/
export const handleUpdateProfile = async (token, dispatch) => {
  handleSpotifyAPIRequest(token, 'https://api.spotify.com/v1/me', 'GET')
  .then(handleFetchErrors)
  .then(res => res.json())
  .then(
    (user) => {
      let newUser = user;
      dispatch({
        type: "SET_USER",
        user: newUser,
      });
      getUserPlaylists(token, newUser?.id)
        .then(
          (playlists) => {
            dispatch({
              type: "SET_PLAYLISTS",
              playlists,
            });
          }
        )
    }
  )
}

/**
 * This function retrieves the user's playback state by making a GET request to the Spotify Web API.
 * @param {string} token - The access token required for authorization to the Spotify API.
 * @param {function} dispatch - Function that updates the application state.
 * @returns {void} 
*/
export const handleUpdatePlaybackState = async (token, dispatch) => {

  const toastId = 'no-active-device';

  // manual wait required, since checking for playback state after updating state 
  // through another endpoint (play/pause/etc.) doesn't return the new state immediately
  // even when the requests are properly chained
  await wait(750);

  handleSpotifyAPIRequest(token, 'https://api.spotify.com/v1/me/player', 'GET')
  .then(res => {
    if(res.status === 204) {
      toast.error("No active device found. Try starting playback on one of your devices, then try again.", {toastId: toastId, autoClose: false})
      handleFetchErrors(res);
      return res.text();
    } 
    return res.json()
  })
  .then(async data => {
    if(data) {
      toast.dismiss(toastId);
      dispatch({
        type: "SET_CURRENT_PLAYBACK_STATE",
        currentPlaybackState: data,
      });
    }
  })
}

/**
 * This function retrieves the user's available devices by making a GET request to the Spotify Web API.
 * @param {string} token - The access token required for authorization to the Spotify API.
 * @param {function} dispatch - Function that updates the application state.
 * @returns {void}
*/
export const handleUpdateAvailableDevices = async (token, dispatch) => {
  handleSpotifyAPIRequest(token, 'https://api.spotify.com/v1/me/player/devices', 'GET')
  .then(handleFetchErrors)
  .then(res => res.json())
  .then(data => {
    dispatch({
      type: "SET_AVAILABLE_DEVICES",
      availableDevices: data,
    });
  })
}

/**
 * This function retrieves the user's playlists by making a GET request to the Spotify Web API.
 * @param {string} token - The access token required for authorization to the Spotify API.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's playlists.
*/
export const getUserPlaylists = async (token, userId, limit = 50) => {
  const response = await handleSpotifyAPIRequest(
    token, 
    `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}`, 
    'GET')
  .then(handleFetchErrors);

  return await response.json();
}

/**
 * Initializes the application by exchanging the authorization code for an access token,
 * setting the token in state, and calling functions to update the user profile, playback state,
 * and available devices. If the access code has expired, the user is redirected to the home page.
 * @param {string} clientId - The client ID for the Spotify API.
 * @param {string} redirectUri - The redirect URI for the Spotify API.
 * @param {string} code - The authorization code received from Spotify.
 * @param {function} dispatch - A function to update the application state.
 * @returns {void} 
*/
export const handleApplicationInitialization = async (clientId, redirectUri, code, dispatch) => {
  const verifier = localStorage.getItem("code_verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier);

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  })
  .then(res=>handleFetchErrors(res,()=>{
    console.error("Your access code appears to have expired, returning to the home page.");
    window.location.href = '/';
  }))
  .then(res => {return res.json()})
  .then(data => {
    let newToken = data.access_token;
    dispatch({
      type: "SET_TOKEN",
      token: newToken,
    });
    handleUpdateProfile(newToken, dispatch);
    handleUpdatePlaybackState(newToken, dispatch);
    handleUpdateAvailableDevices(newToken, dispatch);
  })
}

/**
 * Updates the current playlist in the state by making a GET request to Spotify API
 * @param {string} token - Authorization token for Spotify API
 * @param {string} playlistID - ID of the playlist to be updated
 * @param {function} dispatch - Function used to dispatch state updates
 * @returns {void}
*/
export const handleUpdateCurrentPlaylist = async (token, playlistID, dispatch) => {
  
  handleSpotifyAPIRequest(token, `https://api.spotify.com/v1/playlists/${playlistID}`, 'GET')
  .then(handleFetchErrors)
  .then(res => res.json())
  .then(data => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST",
      currentPlaylist: data,
    });
  })
}