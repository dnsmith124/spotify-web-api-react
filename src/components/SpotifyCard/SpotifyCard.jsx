import ConditionalLink from "../ConditionalLink/ConditionalLink";

const SpotifyCard = ({ imageUrl, imageAlt = '', heading, subheading, className = '', roundImage = false, link = false }) => {

  const classes = `bg-white transition-all m-1 shadow-md hover:shadow-xl dark:hover:bg-spotify-hover-gray dark:bg-spotify-dark-gray p-3 rounded-lg ${className}`;

  return(
    <ConditionalLink className={classes} link={link} target="_blank" rel="noreferrer">
      {
        imageUrl && 
        <div className={`image overflow-hidden aspect-square mb-4 ${roundImage ? 'rounded-full' : 'rounded-lg'}`}>
          <img src={imageUrl} alt={imageAlt} className="w-full h-full object-fill object-center" />
        </div>
      }
      {
        heading && 
        <p className="font-bold mb-1 whitespace-nowrap overflow-ellipsis overflow-hidden w-full">{heading}</p>
      }
      {
        subheading && 
        <p className="text-gray-400 mb-2 overflow-ellipsis overflow-hidden w-full">{subheading}</p>
      }
    </ConditionalLink>
  )
}

export default SpotifyCard;