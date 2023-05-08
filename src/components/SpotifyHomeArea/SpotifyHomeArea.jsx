import { useDataLayerValue } from "../../DataLayer";
import SpotifyCard from "../SpotifyCard/SpotifyCard";

const SpotifyHomeArea = ({ homeData }) => {
  const [{ homeAreaData, user }] = useDataLayerValue();

  return(
    <div>
      <div className="header px-10">
        <h2 className="text-3xl break-words mb-2 lg:text-6xl">Welcome back {user.display_name}</h2>
      </div>
      <div className="cards-container">
        {
          homeAreaData.topArtists &&
          <SpotifyCard className="top-artists">
            <p>Your Top Artists:</p>
            <ol>
              {
                homeAreaData.topArtists.items.map((artist, i) => {
                  return(
                    <li key={artist.id}>{artist.name}</li>
                  ) 
                })
              }
            </ol>
          </SpotifyCard>
        }
        {
          homeAreaData.topTracks &&
          <SpotifyCard className="top-tracks">
            <p>Your Top Tracks:</p>
            <ol>
              {
                homeAreaData.topTracks.items.map((track, i) => {
                  return(
                    <li key={track.id}>{track.name}</li>
                  ) 
                })
              }
            </ol>
          </SpotifyCard>
        }
      </div>

    </div>
  )
}

export default SpotifyHomeArea;