import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";

const SpotifyFooter = () => {
  
  return (
    <footer className=" col-span-2 sticky bottom-0 dark:bg-spotify-black bg-white border-t dark:border-t-0">
      <hr className="h-px border-0 my-0" />
      <SpotifyPlayer/>
    </footer>
  )
}

export default SpotifyFooter;