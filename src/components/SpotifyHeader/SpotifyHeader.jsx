import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useDataLayerValue } from "../../DataLayer";

const SpotifyHeader = () => {
  const [{ user }] = useDataLayerValue();

  return (
    <header className="p-[20px] sticky bg-spotify-dark-red">
      <div className="max-w-[1450px] flex justify-between ml-auto mr-auto">
        <div className="grid content-center">

        </div>
        <div >
          {
            user &&
            <div className="flex items-center rounded-[10px] bg-spotify-dark-gray mb-[10px]">   
              <div className="w-[30px] h-[30px]">   
                <img 
                  src={user?.images[0]?.url} 
                  alt={user?.display_name} 
                  className="object-cover object-center h-[100%] w-[100%] rounded-full"
                />
              </div>
              <h4 className="mb-0 ml-[4px] font-bold pr-[8px]">{user?.display_name}</h4>
            </div>
          }
          <ThemeToggle className="flex justify-end"/>
        </div>
      </div>
    </header>
  )
}

export default SpotifyHeader;