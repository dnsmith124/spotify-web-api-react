import { useDataLayerValue } from '../../DataLayer';

const SpotifySidebarOption = ({ title, Icon, id }) => {

  const [{ currentPlaylist }, dispatch] = useDataLayerValue();
  let currentPlaylistID = (currentPlaylist !== null && currentPlaylist.id !== undefined ) ? currentPlaylist.id : null;

  const handleClick = () => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST_ID",
      currentPlaylistID: id,
    });
  }
  return (
    <div className="spotify-sidebar-option py-[4px]">
      {Icon && <Icon className="spotify-sidebar-option__icon" />}
      <button onClick={handleClick} className={`max-w-full ${(currentPlaylistID === id) ? 'active' : 'inactive'}`}>
        <h4 className="whitespace-nowrap overflow-hidden overflow-ellipsis">{title}</h4>
      </button>
    </div>
  )
}

export default SpotifySidebarOption;