import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Forward } from '../../assets/icons/play.svg';
import { ReactComponent as Back } from '../../assets/icons/play.svg';
import { useDataLayerValue } from '../../DataLayer';

const SpotifyPlayer = () => {
  const [{ darkMode }] = useDataLayerValue();

  return(
    <div className="p-[30px]">
      <div className="flex justify-center w-full">
        <Back className="dark:fill-white fill-spotify-dark-gray w-[50px] cursor-pointer hover:scale-[1.05] transition-all"/>
        <Play className="dark:fill-white fill-spotify-dark-gray w-[50px] mx-[15px] cursor-pointer hover:scale-[1.05] transition-all"/>
        <Forward className="dark:fill-white fill-spotify-dark-gray w-[50px] cursor-pointer hover:scale-[1.05] transition-all"/>
      </div>
    </div>    
  )
}

export default SpotifyPlayer;