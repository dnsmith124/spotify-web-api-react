export const initialState = {
  user: null,
  token: null,
  playlists: [],
  currentPlaylistID: null,
  currentPlaylist: null,
  currentPlaybackState: null,
  availableDevices: null,
  discoverWeekly: null,
  darkMode: true,
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_CURRENT_PLAYLIST_ID":
      return {
        ...state,
        currentPlaylistID: action.currentPlaylistID,
      };
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        currentPlaylist: action.currentPlaylist,
      };
    case "SET_CURRENT_PLAYBACK_STATE":
      if(state.currentPlaybackState === action.currentPlaybackState)
        return {...state};
      return {
        ...state,
        currentPlaybackState: action.currentPlaybackState,
      };
    case "SET_AVAILABLE_DEVICES":
      return {
        ...state,
        availableDevices: action.availableDevices,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discoverWeekly: action.discoverWeekly,
      };
    case "SET_DARK_MODE":
      return {
        ...state,
        darkMode: action.darkMode
      }
    default:
      return state;
  }
};

export default reducer;