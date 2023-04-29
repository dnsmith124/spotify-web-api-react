import { toast } from 'react-toastify';

export const updateCurrentPlaybackState = (instance, dispatch) => {
  instance.getMyCurrentPlaybackState().then(
    function (data) {
      dispatch({
        type: "SET_CURRENT_PLAYBACK_STATE",
        currentPlaybackState: data,
      });
    },
    function (err) {
      console.error(err);
    }
  )
  instance.getMyDevices().then(
    function (data) {
      dispatch({
        type: "SET_AVAILABLE_DEVICES",
        availableDevices: data,
      });
    },
    function (err) {
      console.error(err);
    }
  )
}

export const handleNoActiveDevicesError = (err) => {
  console.error(err);
  if(err.responseText.includes("No active device found"))
    toast.error("No active device found. Try starting playback on one of your devices, then try again.");
}