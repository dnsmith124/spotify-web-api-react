import { useState } from "react";
import { useScreenWidth } from "../../utilities/customHooks";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SpotifyBody from "../SpotifyBody/SpotifyBody";
import SpotifySidebar from "../SpotifySidebar/SpotifySidebar";
import SpotifyFooter from '../SpotifyFooter/SpotifyFooter';

const SpotifyApp = () => {
  
  const screenWidth = useScreenWidth();
  const [sidebarShowing, setSidebarShowing] = useState(false);

  const handleCloseSidebar = () => {
    setSidebarShowing(false)
  }

  return (
    <div className="grid grid-cols-[225px_1fr] grid-rows-[auto_min-content] mt-0 mb-0 dark:text-white min-h-screen relative md:grid-rows-[auto_105px]">
      {
        screenWidth <= 768 &&
        <FontAwesomeIcon 
          icon={faBars} 
          className="cursor-pointer dark:text-white text-spotify-dark-gray w-7 h-7 fixed top-6 left-5 z-20" 
          onClick={(e)=>{e.stopPropagation(); setSidebarShowing(prev => !prev)}}
        />
      }
      <div className={`sidebar-overlay ${sidebarShowing ? 'opacity-40' : 'opacity-0 pointer-events-none'} transition-all ease-out bg-black fixed top-0 right-0 bottom-0 left-0 z-10`}></div>
      <SpotifySidebar isOpen={sidebarShowing} handleCloseSidebar={handleCloseSidebar} />
      <SpotifyBody />
      <SpotifyFooter className="col-span-2" />
    </div>
  )
}
export default SpotifyApp;