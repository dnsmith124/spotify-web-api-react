import spotifyLogo from '../../assets/SpotifyLogo.png'; 
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const SpotifyLogin = ({ handleLogin }) => {
  return (
    <div className="text-center py-[20px]">
      <div className="max-w-[1400px] mx-auto grid content-end">
        <ThemeToggle className="mr-0 ml-auto inline-block px-4"/>
      </div>
      <div className="mb-[50px] pt-[100px]">
        <a href="/" className="inline">
          <img
            src={spotifyLogo}
            className="spotify-logo max-w-xs mx-auto"
            alt="Spotify logo"
          />
        </a>
      </div>
      <button
        onClick={async () => await handleLogin()} 
        className="p-[15px] font-semibold md:max-w-sm ml-auto mr-auto mt-0 mb-0 
        bg-spotify-green text-white dark:text-spotify-black rounded-full"
        >
        Login with Spotify
      </button>
    </div>
  )
}

export default SpotifyLogin;