import { useEffect } from "react";
import { useDataLayerValue } from "../../DataLayer";
import { handleUpdateCurrentPlaylist } from "../../utilities/SpotifyFunctions";
import TrackRow from "../TrackRow/TrackRow";
import UserTag from "../UserTag/UserTag";
import SpotifyHeader from "../SpotifyHeader/SpotifyHeader";
import SpotifyHomeArea from "../SpotifyHomeArea/SpotifyHomeArea";

const SpotifyBody = () => {
  const [{ currentPlaylist, currentPlaylistID, token }, dispatch] = useDataLayerValue();

  useEffect(() => { 
    if(currentPlaylistID) {
      handleUpdateCurrentPlaylist(token, currentPlaylistID, dispatch);
    }
  }, [currentPlaylistID, dispatch, token]);

  return (
    <div className="dark:bg-spotify-dark-gray pb-5 dark:bg-gradient-to-b dark:from-spotify-dark-red dark:to-spotify-dark-gray col-span-2 md:col-span-1">
      <SpotifyHeader />
      {
        currentPlaylist === null 
        ? <h2 className="text-center text-4xl pt-12">No Playlist Selected</h2>
        : currentPlaylist.id === 'home' 
          ? <SpotifyHomeArea />
          :  <div className="px-3 md:px-7">
                <div className="md:flex">
                  <img src={currentPlaylist?.images[0]?.url} alt=""  className="w-64 mx-auto mb-3 md:mb-0 md:mr-6 md:ml-0"/>
                  <div className="grid text-center md:text-left md:content-end">
                    <p className="md:mb-6">Playlist</p>
                    <h2 className="text-3xl break-words mb-2 lg:text-6xl"><a href={currentPlaylist?.external_urls["spotify"]} target="_blank" rel="noreferrer">{currentPlaylist?.name}</a></h2>
                    <div className="flex items-center">
                      <UserTag user={currentPlaylist.owner} useImage={false} className="mr-2" />
                      <p>{currentPlaylist.tracks.items.length} songs</p>
                    </div>
                    <p>{currentPlaylist?.description}</p>
                  </div>
                </div>
                <div className="pt-7">
                  {currentPlaylist?.tracks.items.map((item, i) => (
                    <TrackRow track={item.track} index={i} key={i} />
                  ))}
                </div>
              </div>
      }
    </div>
  )
}

export default SpotifyBody;