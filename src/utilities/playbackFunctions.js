import { toast } from 'react-toastify';
import { handleFetchErrors } from '../SpotifyAuth';

export const updateCurrentPlaybackState = (instance, dispatch) => {
  instance.getMyCurrentPlaybackState().then(
    (data) => {
      dispatch({
        type: "SET_CURRENT_PLAYBACK_STATE",
        currentPlaybackState: data,
      });
    },
    (err) => {
      console.error(err);
    }
  )
  instance.getMyDevices().then(
    (data) => {
      dispatch({
        type: "SET_AVAILABLE_DEVICES",
        availableDevices: data,
      });
    },
    (err) => {
      console.error(err);
    }
  )
}

export const handleNoActiveDevicesError = (err) => {
  console.error(err);
  if(err.responseText.includes("No active device found"))
    toast.error("No active device found. Try starting playback on one of your devices, then try again.");
}


export const handlePlayTrack = async (token, trackURI) => {

  const body = JSON.stringify({
    "uris": [trackURI],
    "position_ms": 0
  });

  const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: body
  }).then(data=>console.log(data), (err) => console.error(err));

  return await response.json();
}