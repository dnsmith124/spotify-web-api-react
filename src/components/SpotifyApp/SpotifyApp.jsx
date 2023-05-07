import SpotifyBody from "../SpotifyBody/SpotifyBody";
import SpotifySidebar from "../SpotifySidebar/SpotifySidebar";
import SpotifyFooter from '../SpotifyFooter/SpotifyFooter';

const SpotifyApp = () => {
  
  return (
    <div className="grid grid-cols-[225px_1fr] grid-rows-[auto_min-content] md:grid-rows-[auto_105px] mt-0 mb-0 dark:text-white min-h-screen ">
      <SpotifySidebar />
      <SpotifyBody />
      <SpotifyFooter className="col-span-2" />
    </div>
  )
}
export default SpotifyApp;