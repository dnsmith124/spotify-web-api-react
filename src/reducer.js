export const initialState = {
  user: null,
  token: null,
  spotifyInstance: null,
  playlists: [],
  currentPlaylistID: null,
  currentPlaylist: null,
  playing: false,
  item: null,
  darkMode: true,
};

const reducer = (state, action) => {
  console.log(action);

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
    case "SET_SPOTIFY_INSTANCE":
      return {
        ...state,
        spotifyInstance: action.spotifyInstance,
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
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
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