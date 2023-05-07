import { useEffect, useState, useCallback } from 'react';
import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Forward } from '../../assets/icons/forward.svg';
import { ReactComponent as Pause } from '../../assets/icons/pause.svg';
import placeholder from '../../assets/placeholder.png'; 
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDataLayerValue } from '../../DataLayer';
import OutsideClickHandler from '../OutsideClickHandler/OutsideClickHandler';
import { handleUpdatePlaybackState } from '../../utilities/SpotifyFunctions';
import { handlePausePlay, handleNextPrevious } from '../../utilities/playbackFunctions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SpotifyPlayer = () => {

  const [{ currentPlaybackState, availableDevices, darkMode, token }, dispatch] = useDataLayerValue();
  const [availableDevicesOpen, setAvailableDevicesOpen] = useState(false);
  
  const albumArtURL = (currentPlaybackState !== null && currentPlaybackState.item)
    ? currentPlaybackState.item.album?.images[2]?.url
    : placeholder;
  const albumArtAltText = (currentPlaybackState !== null && currentPlaybackState.item)
    ? `Album art: ${currentPlaybackState.item.album?.name}`
    : 'Album art placeholder image';
  const playbackItemName = (currentPlaybackState !== null && currentPlaybackState.item)
    ? currentPlaybackState.item?.name
    : '';
  const playbackItemArtist = (currentPlaybackState !== null && currentPlaybackState.item)
    ? currentPlaybackState.item?.artists[0].name
    : '';  

  const handleCloseAvailableDevices = () => {
    setAvailableDevicesOpen(false)
  }

  useEffect(() => {
    // Poll for playback state 
    const interval = setInterval(() => {
      handleUpdatePlaybackState(token, dispatch)
    }, 2000);
  
    return () => {
      clearInterval(interval);
    };
  }, []); 
  

  return(
    <div className="p-3 md:p-5">
      <ToastContainer 
        theme={darkMode ? 'dark' : 'light'} 
        position="top-center"
      />
      <div className="grid justify-center w-full md:flex md:justify-between">
        <div className="w-80 mx-auto mb-3 md:mx-0 md:mb-0">
          <div className='flex'>
            <img 
              src={albumArtURL}
              alt={albumArtAltText} 
              className="mr-5 w-16 h-16 object-fill object-center"
            />
            <div className="grid content-center">
              <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{playbackItemName}</p>
              <p className="text-sm text-gray-400">{playbackItemArtist}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-1 md:mb-0 md:justify-normal">
          <Forward 
            className="dark:fill-[#bababa] fill-spotify-dark-gray w-9 cursor-pointer hover:scale-[1.05] transition-all rotate-180"
            onClick={()=>handleNextPrevious(false, token, dispatch)}
          />
          {
            (currentPlaybackState !== null && currentPlaybackState.is_playing)
            ? <Pause 
                className="dark:fill-white fill-spotify-dark-gray w-12 mx-4 cursor-pointer hover:scale-[1.05] transition-all"
                onClick={()=>handlePausePlay(false, token, dispatch)}
              />
            : <Play 
                className="dark:fill-white fill-spotify-dark-gray w-12 mx-4 cursor-pointer hover:scale-[1.05] transition-all"
                onClick={()=>handlePausePlay(true, token, dispatch)}
              />
          }
          <Forward 
            className="dark:fill-[#bababa] fill-spotify-dark-gray w-9 cursor-pointer hover:scale-[1.05] transition-all"
            onClick={()=>handleNextPrevious(true, token, dispatch)}
          />
        </div>
        <div className="flex justify-center relative order-first md:order-last">
          <FontAwesomeIcon 
            icon={faComputer} 
            className="cursor-pointer dark:text-[#bababa] text-spotify-dark-gray p-2 md:px-20" 
            onClick={(e)=>{e.stopPropagation();setAvailableDevicesOpen(prev => !prev)}}
          />
          <div>
            <OutsideClickHandler 
              onOutsideClick={handleCloseAvailableDevices} 
              className={`transition-opacity absolute bottom-[110%] p-5 rounded-md bg-gray-200 dark:bg-spotify-hover-gray left-1/2 -translate-x-1/2 ${availableDevicesOpen ? `opacity-100` : `opacity-0`}`}
              >
              <p className="font-bold whitespace-nowrap mb-2">Available Devices:</p>
              {
                availableDevices &&
                availableDevices.devices.map((item) => {
                  return(
                    <div key={item.id} className={`${item.is_active ? `active text-spotify-green`: `inactive`} flex mb-2`}>
                      {
                        item.type === 'Smartphone' &&
                        <FontAwesomeIcon icon={faMobile}  className="w-5" />
                      }
                      {
                        item.type === 'Computer' &&
                        <FontAwesomeIcon icon={faComputer}  className="w-5" />
                      }
                      <p className="ml-3 whitespace-nowrap text-sm">
                        {item.name}
                      </p>
                    </div>
                  )
                })
              }
              <span className="block h-0 w-0 border-transparent border-t-gray-200 dark:border-t-spotify-hover-gray border-[10px] absolute left-1/2 -bottom-5 -translate-x-1/2"></span>
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </div>    
  )
}

export default SpotifyPlayer;