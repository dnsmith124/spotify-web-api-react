import { useDataLayerValue } from '../../DataLayer';
import { handlePlayTrack } from '../../utilities/playbackFunctions';

const TrackRow = ({ track, index }) => {

  const [{ token }, dispatch] = useDataLayerValue();

  return (
    <button
      onClick={() => {
        handlePlayTrack(token, track.uri, dispatch);
      }}
      className="grid p-1 gap-y-5 gap-x-4 transition-colors 
        grid-cols-[40px_40px_1fr_.5fr] my-1 hover:bg-gray-100 dark:hover:bg-spotify-hover-gray
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
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      <div className="text-left">
        {track.album.name}
      </div>
    </button>
  );
}

export default TrackRow;