import React from "react";
import SpotifySidebarOption from "../SpotifySidebarOption/SpotifySidebarOption";
import { useDataLayerValue } from "../../DataLayer";
import spotifyLogoWhite from "../../assets/Spotify_Logo_RGB_White.png";
import spotifyLogoGreen from "../../assets/SpotifyLogo.png";

const SpotifySidebar = () => {
  const [{ playlists, darkMode }] = useDataLayerValue();

  return (
    <div className="dark:bg-black p-[20px] border-r-[1px] dark:border-r-0 min-h-screen">
      <a href="/" className="block mb-[20px]">
        <img
          src={(darkMode) ? spotifyLogoWhite : spotifyLogoGreen}
          className="spotify-logo max-w-[125px]"
          alt="Spotify logo"
        />
      </a>
      {/* Playlists */}
      <hr className="h-px my-[8px] bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="spotify-sidebar__options">
        {playlists?.items?.map((playlist, i) => (
          <SpotifySidebarOption title={playlist.name} id={playlist.id} key={i} />
        ))}
      </div>
    </div>
  )
}

export default SpotifySidebar;