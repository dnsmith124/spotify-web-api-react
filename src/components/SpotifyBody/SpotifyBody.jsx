import React, { useEffect } from "react";
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
    <div className="dark:bg-spotify-dark-gray pb-[20px] dark:bg-gradient-to-b dark:from-spotify-dark-red dark:to-spotify-dark-gray">
      <SpotifyHeader />
      {currentPlaylist !== null
        ? <div className="px-[30px]">
            <div className="flex">
              <img src={currentPlaylist?.images[0]?.url} alt=""  className="w-[250px] mr-[25px]"/>
              <div className="grid content-end">
                <p className="mb-[25px]">Playlist</p>
                <h2 className="text-[60px]"><a href={currentPlaylist?.external_urls["spotify"]} target="_blank" rel="noreferrer">{currentPlaylist?.name}</a></h2>
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