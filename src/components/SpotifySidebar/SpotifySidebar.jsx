import { useState } from "react";
import SpotifySidebarOption from "../SpotifySidebarOption/SpotifySidebarOption";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDataLayerValue } from "../../DataLayer";
import { useScreenWidth } from "../../utilities/customHooks";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import spotifyLogoWhite from "../../assets/Spotify_Logo_RGB_White.png";
import spotifyLogoGreen from "../../assets/SpotifyLogo.png";

const SpotifySidebar = () => {
  const [{ playlists, darkMode }] = useDataLayerValue();
  const screenWidth = useScreenWidth();
  const [sidebarShowing, setSidebarShowing] = useState(false);

  return (
    <aside className="absolute top-0 bottom-[105px] md:relative">
      {
        screenWidth <= 768 &&
        <FontAwesomeIcon 
          icon={faBars} 
          className="cursor-pointer dark:text-white text-spotify-dark-gray w-7 h-7 fixed top-6 left-5 z-10" 
          onClick={()=>{setSidebarShowing(prev => !prev)}}
        />
      }
        <div className={`
          bg-white
          shadow-xl
          shadow-black
          p-5 
          border-r-px 
          min-h-screen 
          fixed
          transition-all
          ease-out
          duration-300
          h-full
        dark:bg-black 
          dark:border-r-0 
          md:opacity-100 
          md:h-auto
          md:static
          md:translate-x-0
          md:shadow-none
          ${sidebarShowing ? 'translate-x-0' : '-translate-x-full shadow-none dark:shadow-none'}`} 
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
          <div className="h-full overflow-scroll">
            {playlists?.items?.map((playlist) => (
              <SpotifySidebarOption title={playlist.name} id={playlist.id} key={playlist.id} />
            ))}
          </div>
        </div>
    </aside>
  )
}

export default SpotifySidebar;