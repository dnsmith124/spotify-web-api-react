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
  );
}