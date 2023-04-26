import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Forward } from '../../assets/icons/forward.svg';
import { ReactComponent as Pause } from '../../assets/icons/pause.svg';
import { useDataLayerValue } from '../../DataLayer';
import { useEffect } from 'react';
import { updateCurrentPlaybackState } from '../../utilities/playbackFunctions';

const SpotifyPlayer = () => {

  const [{ spotifyInstance, currentPlaybackState }, dispatch] = useDataLayerValue();
  
  const albumArtURL = (currentPlaybackState !== null && currentPlaybackState.item)
    ? currentPlaybackState.item.album?.images[2]?.url
    : '';
  const albumArtAltText = (currentPlaybackState !== null && currentPlaybackState.item)
    ? `Album art: ${currentPlaybackState.item.album?.name}`
    : 'Album art placeholder image';
  const playbackItemName = (currentPlaybackState !== null && currentPlaybackState.item)
    ? currentPlaybackState.item?.name
    : '';
  const playbackItemArtist = (currentPlaybackState !== null && currentPlaybackState.item)
    ? currentPlaybackState.item?.artists[0].name
    : '';  

  const getPlaybackState = (instance) => {
    instance.getMyCurrentPlaybackState().then(
      function (data) {
        dispatch({
          type: "SET_CURRENT_PLAYBACK_STATE",
          currentPlaybackState: data,
        });
      },
      function (err) {
        console.error(err);
      }
    );
  }

  const handleSkipToNext = (instance) => {
    instance.skipToNext().then(() => {
      updateCurrentPlaybackState(instance, dispatch)
    });
  }
  
  const handleSkipToPrevious = (instance) => {
    instance.skipToPrevious().then(() => {
      updateCurrentPlaybackState(instance, dispatch)
    });
  }
  
  const handlePause = (instance) => {
    instance.pause().then(() => {
      updateCurrentPlaybackState(instance, dispatch)
    });
  }
  
  const handlePlay = (instance) => {
    instance.play().then(() => {
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
            onClick={()=>handleSkipToPrevious(spotifyInstance)}
          />
          {
            (currentPlaybackState !== null && currentPlaybackState.is_playing)
            ? <Pause 
                className="dark:fill-white fill-spotify-dark-gray w-[50px] mx-[15px] cursor-pointer hover:scale-[1.05] transition-all"
                onClick={()=>handlePause(spotifyInstance)}
              />
            : <Play 
                className="dark:fill-white fill-spotify-dark-gray w-[50px] mx-[15px] cursor-pointer hover:scale-[1.05] transition-all"
                onClick={()=>handlePlay(spotifyInstance)}
              />
          }
          <Forward 
            className="dark:fill-[#bababa] fill-spotify-dark-gray w-[35px] cursor-pointer hover:scale-[1.05] transition-all"
            onClick={()=>handleSkipToNext(spotifyInstance)}
          />
        </div>
        <div></div>
      </div>
    </div>    
  )
}

export default SpotifyPlayer;