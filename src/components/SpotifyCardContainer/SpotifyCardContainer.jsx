
const SpotifyCardContainer = ({ heading, className = '', children }) => {

  return(
    <section className={`py-4  ${className}`}>
      {
        heading && 
        <h4 className="text-xl font-bold">{heading}</h4>
      }
      <div className="grid my-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-4">
        {
          children
        }
      </div>
    </section>
  )
}

export default SpotifyCardContainer;