import React from "react";
import SpotifyBody from "../SpotifyBody/SpotifyBody";
import SpotifySidebar from "../SpotifySidebar/SpotifySidebar";
import SpotifyFooter from '../SpotifyFooter/SpotifyFooter';

const SpotifyApp = () => {
  
  return (
    <div className="grid grid-cols-[225px_1fr] mt-0 mb-0 dark:text-white">
      <SpotifySidebar />
      <SpotifyBody />
      <SpotifyFooter className="col-span-2" />
    </div>
  )
}
export default SpotifyApp;