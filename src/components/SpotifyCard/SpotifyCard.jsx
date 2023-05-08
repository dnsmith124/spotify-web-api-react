
const SpotifyCard = ({ className = '', children }) => {

  return(
    <section className={`p-4 bg-white dark:bg-spotify-hover-gray rounded-lg ${className} m-4 shadow-lg`}>
      {children}
    </section>
  )
}

export default SpotifyCard;