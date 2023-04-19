
const SongRow = ({ track, index }) => {

  return (
    <a 
      href={track?.external_urls["spotify"]} 
      className="grid p-[5px] gap-y-[20px] gap-x-[15px] transition-colors 
        grid-cols-[40px_40px_1fr_.5fr] my-5px hover:bg-spotify-hover-gray
        items-center" 
      target="_blank" 
      rel="noreferrer"
      >
      <p className="whitespace-nowrap text-center">{index + 1}.</p>
      {
        track.album.images[0] !== undefined &&
        <img src={track.album.images[0].url} alt="" className="w-[40px]" />
      }
      <div>
        <p>{track.name}</p>
        <p>
          {track.artists.map((artist, i) => artist.name).join(", ")}
        </p>
      </div>
      <div>
        {track.album.name}
      </div>

    </a>
  );
}

export default SongRow;