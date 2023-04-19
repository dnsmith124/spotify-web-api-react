import React from "react";
import SpotifyBody from "../SpotifyBody/SpotifyBody";
import SpotifySidebar from "../SpotifySidebar/SpotifySidebar";

const SpotifyApp = ({ spotify }) => {
  
  return (
    <div className="grid grid-cols-[225px_1fr] mt-0 mb-0 dark:text-white">
      <SpotifySidebar  />
      <SpotifyBody spotify={spotify} />
    </div>
  )
}
export default SpotifyApp;