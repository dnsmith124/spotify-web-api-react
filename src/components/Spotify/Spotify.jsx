import React, { useEffect } from 'react';
import SpotifyLogin from '../SpotifyLogin/SpotifyLogin';
import SpotifyApp from '../SpotifyApp/SpotifyApp';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from '../../DataLayer';
import { handleLogin, handleFetchAndSetToken } from '../../SpotifyAuth';

const spotify = new SpotifyWebApi();

const Spotify = () => {

  const clientId = 'cbde493d58af43a6b6352ce37fe428d0';
  const redirectUri = window.location.origin;
  const [{ token, darkMode }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if(code && !token) {
      handleFetchAndSetToken(clientId, redirectUri, code, dispatch, spotify);
    }
  });

  return (
    <div className={`${darkMode ? 'dark': ''}`}>
      <div className={` bg-white dark:bg-neutral-900 min-h-screen`}>
        {
          token 
          ? <SpotifyApp spotify={spotify} /> 
          : <SpotifyLogin handleLogin={()=>handleLogin(clientId, redirectUri)} />
        }
      </div>
    </div>
  )
}

export default Spotify;