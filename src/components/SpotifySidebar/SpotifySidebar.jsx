import SpotifySidebarOption from "../SpotifySidebarOption/SpotifySidebarOption";
import OutsideClickHandler from "../OutsideClickHandler/OutsideClickHandler";
import { useDataLayerValue } from "../../DataLayer";
import spotifyLogoWhite from "../../assets/Spotify_Logo_RGB_White.png";
import spotifyLogoGreen from "../../assets/SpotifyLogo.png";

const SpotifySidebar = ({isOpen, handleCloseSidebar}) => {
  const [{ playlists, darkMode }] = useDataLayerValue();

  return (
    <aside className="absolute top-0 bottom-[105px] md:relative">
      <OutsideClickHandler 
        className={`
          bg-white
          shadow-xl
          p-5 
          border-r-px 
          min-h-screen 
          fixed
          transition-all
          ease-out
          duration-300
          h-full
          z-10
        dark:bg-black 
          dark:border-r-0 
          md:opacity-100 
          md:static
          md:translate-x-0
          md:shadow-none
          ${isOpen ? 'translate-x-0 ' : '-translate-x-full shadow-none'}`
        } 
        onOutsideClick={handleCloseSidebar} 
        >
        <a href="/" className="block mb-5 ml-10 md:ml-0">
          <img
            src={(darkMode) ? spotifyLogoWhite : spotifyLogoGreen}
            className="spotify-logo max-w-[125px]"
            alt="Spotify logo"
          />
        </a>
        {/* Playlists */}
        <hr className="h-px my-[8px] bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="overflow-scroll sidebar-items-height md:h-full">
          <SpotifySidebarOption title="Home" id="home" handleClick={handleCloseSidebar} />
          {playlists?.items?.map((playlist) => (
            <SpotifySidebarOption title={playlist.name} id={playlist.id} key={playlist.id} handleClick={handleCloseSidebar} />
          ))}
        </div>
      </OutsideClickHandler>
    </aside>
  )
}

export default SpotifySidebar;