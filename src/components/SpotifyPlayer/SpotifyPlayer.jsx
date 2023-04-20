import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Forward } from '../../assets/icons/forward.svg';
import { ReactComponent as Pause } from '../../assets/icons/pause.svg';
import { useDataLayerValue } from '../../DataLayer';
import { useEffect, useState } from 'react';

const SpotifyPlayer = () => {

  const [{ spotifyInstance }] = useDataLayerValue();
  const [playbackState, setPlaybackState] = useState(null);

  const getPlaybackState = (playbackStateSetterCallback) => {
    spotifyInstance.getMyCurrentPlaybackState().then(
      function (data) {
        playbackStateSetterCallback(data);
      },
      function (err) {
        console.error(err);
      }
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getPlaybackState(setPlaybackState)
    }, 7000);
  
    return () => {
      clearInterval(interval);
    };
  }, []); 
  
  console.log(playbackState)

  return(
    <div className="p-[20px]">
      <div className="flex justify-evenly w-full">
        <div>
          {
            playbackState !== null && playbackState.item && 
            <div className='flex'>
              <img 
                src={playbackState.item.album?.images[2]?.url}
                alt={`Album art: ${playbackState.item.album?.name}`} 
                className=""
              />
              <div>
                <p>{playbackState.item?.name}</p>
                <p>{playbackState.item?.artists[0].name}</p>
              </div>
              
            </div>
          }
        </div>
        <div className="flex">
          <Forward className="dark:fill-[#bababa] fill-spotify-dark-gray w-[35px] cursor-pointer hover:scale-[1.05] transition-all rotate-180"/>
          {
            (playbackState !== null && playbackState.is_playing)
            ? <Pause className="dark:fill-white fill-spotify-dark-gray w-[50px] mx-[15px] cursor-pointer hover:scale-[1.05] transition-all"/>
            : <Play className="dark:fill-white fill-spotify-dark-gray w-[50px] mx-[15px] cursor-pointer hover:scale-[1.05] transition-all"/>
          }
          <Forward className="dark:fill-[#bababa] fill-spotify-dark-gray w-[35px] cursor-pointer hover:scale-[1.05] transition-all"/>
        </div>
      </div>
    </div>    
  )
}

export default SpotifyPlayer;