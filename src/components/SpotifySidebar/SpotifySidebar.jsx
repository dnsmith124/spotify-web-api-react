import React from "react";
import SpotifySidebarOption from "../SpotifySidebarOption/SpotifySidebarOption";
import { useDataLayerValue } from "../../DataLayer";
import spotifyLogo from "../../assets/Spotify_Logo_RGB_White.png";

const SpotifySidebar = () => {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="dark:bg-black p-[20px]">
      <a href="/" className="block mb-[20px]">
        <img
          src={spotifyLogo}
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