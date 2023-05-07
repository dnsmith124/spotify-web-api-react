import { useEffect } from "react";
import { useDataLayerValue } from "../../DataLayer";
import { handleUpdateCurrentPlaylist } from "../../utilities/SpotifyFunctions";
import TrackRow from "../TrackRow/TrackRow";
import SpotifyHeader from "../SpotifyHeader/SpotifyHeader";

const SpotifyBody = () => {
  const [{ currentPlaylist, currentPlaylistID, token, spotifyInstance }, dispatch] = useDataLayerValue();

  useEffect(() => { 
    if(currentPlaylistID) {
      handleUpdateCurrentPlaylist(token, currentPlaylistID, dispatch);
    }
  }, [currentPlaylistID, dispatch, spotifyInstance, token]);

  return (
    <div className="dark:bg-spotify-dark-gray pb-[20px] dark:bg-gradient-to-b dark:from-spotify-dark-red dark:to-spotify-dark-gray col-span-2 md:col-span-1">
      <SpotifyHeader />
      {currentPlaylist !== null
        ? <div className="px-[30px]">
            <div className="md:flex">
              <img src={currentPlaylist?.images[0]?.url} alt=""  className="w-[250px] mx-auto mb-3 md:mb-0 md:mr-6 md:ml-0"/>
              <div className="grid text-center md:text-left md:content-end">
                <p className="md:mb-6">Playlist</p>
                <h2 className="text-3xl break-words lg:text-6xl"><a href={currentPlaylist?.external_urls["spotify"]} target="_blank" rel="noreferrer">{currentPlaylist?.name}</a></h2>
                <p>{currentPlaylist?.description}</p>
              </div>
            </div>
            <div className=" pt-[30px]">
              {currentPlaylist?.tracks.items.map((item, i) => (
                <TrackRow track={item.track} index={i} key={i} />
              ))}
            </div>
          </div>
        : <h2 className="text-center text-[40px] pt-[50px]">No Playlist Selected</h2>  }
    </div>
  )
}

export default SpotifyBody;