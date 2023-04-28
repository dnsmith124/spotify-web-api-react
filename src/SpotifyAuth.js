/**
 * Handles fetch errors and calls the onErrorCallback function if specified.
 * @param {Response} response - The response object from a fetch call.
 * @param {function} onErrorCallback - The callback function to be called when an error occurs. Defaults to a console.log message.
 * @returns {Response} The response object passed as input if there are no errors.
*/
export const handleFetchErrors = (response, onErrorCallback = () => console.log('No error callback function specified.')) => {
  if(!response.ok) {
    onErrorCallback(response);
    throw Error(response.statusText);
  }
  return response
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
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's profile information.
*/
export const getProfile = async (token) => {

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(handleFetchErrors);

  return await response.json();
}
export const handleFetchAndSetToken = async (clientId, redirectUri, code, dispatch, spotify) => {
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
    console.error("Your access code appears to have expired, returning to the home page to log in again.");
    window.location.href = '/';
  }))
  .then(res => {return res.json()})
  .then(data => {
    let newToken = data.access_token;
      dispatch({
        type: "SET_TOKEN",
        token: newToken,
      });
      spotify.setAccessToken(newToken);
      spotify.getMe()
        .then(
          function (user) {
            dispatch({
              type: "SET_USER",
              user,
            });
          },
          function (err) {
            console.error(err);
          }
        )
      spotify.getUserPlaylists({limit:50}).then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
  })
}