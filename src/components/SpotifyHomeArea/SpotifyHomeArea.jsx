import { useDataLayerValue } from "../../DataLayer";
import SpotifyCardContainer from "../SpotifyCardContainer/SpotifyCardContainer";
import SpotifyCard from "../SpotifyCard/SpotifyCard";

const SpotifyHomeArea = () => {
  const [{ homeAreaData, user }] = useDataLayerValue();

  return(
    <div className="p-4">
      <div className="header">
        <h2 className="text-3xl break-words mb-2 lg:text-4xl">Welcome back {user?.display_name}</h2>
      </div>
      {
        homeAreaData.topArtists &&
        <SpotifyCardContainer className="top-artists" heading="Your Favorite Artists:">
          {
            homeAreaData.topArtists.items.map((artist) => {
              console.log(artist);
              return(
                <SpotifyCard 
                  key={artist?.id}
                  heading={artist?.name}
                  subheading="Artist"
                  roundImage
                  imageUrl={artist?.images[1]?.url}
                  link={artist?.href}
                />
              ) 
            })
          }
        </SpotifyCardContainer>
      }
      {
        homeAreaData.topTracks &&
        <SpotifyCardContainer className="top-tracks" heading="Your Top Tracks:">
            {
              homeAreaData.topTracks.items.map((track) => {
                console.log(track)
                return(
                  <SpotifyCard 
                    key={track?.id} 
                    heading={track?.name}
                    subheading={track?.artists[0]?.name}
                    imageUrl={track?.album?.images[1]?.url}
                  />
                ) 
              })
            }
        </SpotifyCardContainer>
      }
    </div>
  )
}

export default SpotifyHomeArea;