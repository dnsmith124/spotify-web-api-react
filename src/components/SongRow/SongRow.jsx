import { useDataLayerValue } from '../../DataLayer';
import { updateCurrentPlaybackState } from '../../utilities/playbackFunctions';
import { handleNoActiveDevicesError } from '../../utilities/playbackFunctions';

const SongRow = ({ track, index }) => {

  const [{ spotifyInstance }, dispatch] = useDataLayerValue();

  const handlePlayTrack = (track, instance) => {
    instance.play({
      uris: [track.uri],
      position_ms: 0
    }).then( 
      () => {updateCurrentPlaybackState(instance, dispatch)},
      handleNoActiveDevicesError
    );
  }

  return (
    <button
      onClick={()=>handlePlayTrack(track, spotifyInstance)}
      className="grid p-[5px] gap-y-[20px] gap-x-[15px] transition-colors 
        grid-cols-[40px_40px_1fr_.5fr] my-5px hover:bg-spotify-hover-gray
        items-center w-full" 
      target="_blank" 
      rel="noreferrer"
      >
      <p className="whitespace-nowrap text-center">{index + 1}.</p>
      {
        track.album.images[0] !== undefined &&
        <img src={track.album.images[0].url} alt="" className="w-[40px]" />
      }
      <div className="text-left">
        <p>{track.name}</p>
        <p>
          {track.artists.map((artist, i) => artist.name).join(", ")}
        </p>
      </div>
      <div className="text-left">
        {track.album.name}
      </div>
    </button>
  );
}

export default SongRow;