import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Forward } from '../../assets/icons/forward.svg';
import { ReactComponent as Pause } from '../../assets/icons/pause.svg';
import placeholder from '../../assets/placeholder.png'; 
import { useDataLayerValue } from '../../DataLayer';
import { useEffect } from 'react';
import { updateCurrentPlaybackState } from '../../utilities/playbackFunctions';

const SpotifyPlayer = () => {

  const [{ spotifyInstance, currentPlaybackState }, dispatch] = useDataLayerValue();
  
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
  
  const handlePlaybackChange = (instance, playbackFunction) => {
    playbackFunction().then(() => {
      updateCurrentPlaybackState(instance, dispatch)
    });
  }

  useEffect(() => {
    updateCurrentPlaybackState(spotifyInstance, dispatch)
    const interval = setInterval(() => {
      updateCurrentPlaybackState(spotifyInstance, dispatch)
    }, 5000);
  
    return () => {
      clearInterval(interval);
    };
  }, []); 
  

  return(
    <div className="p-[20px]">
      <div className="flex justify-between w-full">
        <div>
          <div className='flex'>
            <img 
              src={albumArtURL}
              alt={albumArtAltText} 
              className="mr-[20px]"
            />
            <div className="grid content-center">
              <p className="font-bold">{playbackItemName}</p>
              <p className="text-[14px] text-gray-400">{playbackItemArtist}</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <Forward 
            className="dark:fill-[#bababa] fill-spotify-dark-gray w-[35px] cursor-pointer hover:scale-[1.05] transition-all rotate-180"
            onClick={()=>handlePlaybackChange(spotifyInstance, spotifyInstance.skipToPrevious)}
          />
          {
            (currentPlaybackState !== null && currentPlaybackState.is_playing)
            ? <Pause 
                className="dark:fill-white fill-spotify-dark-gray w-[50px] mx-[15px] cursor-pointer hover:scale-[1.05] transition-all"
                onClick={()=>handlePlaybackChange(spotifyInstance, spotifyInstance.pause)}
              />
            : <Play 
                className="dark:fill-white fill-spotify-dark-gray w-[50px] mx-[15px] cursor-pointer hover:scale-[1.05] transition-all"
                onClick={()=>handlePlaybackChange(spotifyInstance, spotifyInstance.play)}
              />
          }
          <Forward 
            className="dark:fill-[#bababa] fill-spotify-dark-gray w-[35px] cursor-pointer hover:scale-[1.05] transition-all"
            onClick={()=>handlePlaybackChange(spotifyInstance, spotifyInstance.skipToNext)}
          />
        </div>
        <div></div>
      </div>
    </div>    
  )
}

export default SpotifyPlayer;