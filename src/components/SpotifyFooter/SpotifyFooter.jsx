import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";

const SpotifyFooter = () => {
  
  return (
    <footer className=" col-span-2 sticky bottom-0 bg-[#181818]">
      <hr className="h-px border-0 my-0" />
      <SpotifyPlayer/>
    </footer>
  )
}

export default SpotifyFooter;