import { useDataLayerValue } from '../../DataLayer';

const SpotifySidebarOption = ({ title, id, handleClick }) => {

  const [{ currentPlaylist }, dispatch] = useDataLayerValue();
  let currentPlaylistID = (currentPlaylist !== null && currentPlaylist.id !== undefined ) ? currentPlaylist.id : null;

  const handleOptionClick = () => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST_ID",
      currentPlaylistID: id,
    });
    handleClick();
  }
  return (
    <div className="spotify-sidebar-option py-1">
      <button onClick={handleOptionClick} className={`max-w-full ${(currentPlaylistID === id) ? 'font-bold active' : 'inactive'}`}>
        <h4 className="whitespace-nowrap overflow-hidden overflow-ellipsis hover:underline">{title}</h4>
      </button>
    </div>
  )
}

export default SpotifySidebarOption;