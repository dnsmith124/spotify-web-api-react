import React, { useEffect } from 'react';
import SpotifyLogin from '../SpotifyLogin/SpotifyLogin';
import SpotifyApp from '../SpotifyApp/SpotifyApp';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from '../../DataLayer';
import { handleLogin, handleApplicationInitialization } from '../../SpotifyFunctions';

const spotify = new SpotifyWebApi();

const Spotify = () => {

  const clientId = 'cbde493d58af43a6b6352ce37fe428d0';
  const redirectUri = 'http://localhost:5173';
  const [{ token, darkMode, spotifyInstance }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if((code && !token) && spotifyInstance) {
      handleApplicationInitialization(clientId, redirectUri, code, dispatch, spotifyInstance);
    }
    if(!spotifyInstance) {
      dispatch({
        type: "SET_SPOTIFY_INSTANCE",
        spotifyInstance: spotify,
      });
    }
  });

  return (
    <div className={`${darkMode ? 'dark': ''}`}>
      <div className={` bg-white dark:bg-neutral-900 min-h-screen`}>
        {
          token 
          ? <SpotifyApp /> 
          : <SpotifyLogin handleLogin={()=>handleLogin(clientId, redirectUri)} />
        }
      </div>
    </div>
  )
}

export default Spotify;