import React, { useEffect } from "react";
import { useDataLayerValue } from "../../DataLayer";
import SongRow from "../SongRow/SongRow";
import SpotifyHeader from "../SpotifyHeader/SpotifyHeader";

const SpotifyBody = ({ spotify }) => {
  const [{ currentPlaylist, currentPlaylistID, token }, dispatch] = useDataLayerValue();

  useEffect(() => { 
    if(currentPlaylistID) {
      spotify.getPlaylist(currentPlaylistID).then((playlist) => {
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          currentPlaylist: playlist,
        });
      });
    }
  }, [currentPlaylistID, dispatch, spotify, token]);

  return (
    <div className="dark:bg-spotify-dark-gray py-[20px] bg-gradient-to-b from-spotify-dark-red to-spotify-dark-gray">
      <SpotifyHeader />
      {currentPlaylist != null
        ? <div>
            <div className="">
              <img src={currentPlaylist?.images[0]?.url} alt=""  className=""/>
              <div className="">
                <h2><a href={currentPlaylist?.external_urls["spotify"]} target="_blank" rel="noreferrer">{currentPlaylist?.name}</a></h2>
                <p>{currentPlaylist?.description}</p>
              </div>
            </div>
            <div className="">
              {currentPlaylist?.tracks.items.map((item, i) => (
                <SongRow track={item.track} key={i} />
              ))}
            </div>
          </div>
        : <h2>No Playlist Selected</h2>  }
    </div>
  )
}

export default SpotifyBody;