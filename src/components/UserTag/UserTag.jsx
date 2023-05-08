import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserTag = ({ user, useImage = true, className = '' }) => {

  return (
    <div className={`${className} flex items-center rounded-3xl bg-white border-spotify-black border dark:border-none dark:bg-spotify-dark-gray`}>   
      <div className="w-8 h-8 flex items-center justify-center">
        {
          useImage ?
            <img 
              src={user?.images[0]?.url} 
              alt={user?.display_name} 
              className="object-cover object-center h-full w-full rounded-full"
            />
          :
            <FontAwesomeIcon icon={faUser} className="object-cover object-center h-5 w-5 rounded-full pl-2 text-spotify-black dark:text-white" />
        }
      </div>
      {
        user.external_urls ?
          <a href={user.external_urls.spotify} target="_blank" rel="noreferrer" className="text-spotify-black mb-0 ml-1 font-bold pr-2 hover:underline dark:text-white">{user?.display_name}</a>
        :
          <h4 className="text-spotify-black mb-0 ml-1 font-bold pr-2 dark:text-white">{user?.display_name}</h4>
      }
    </div>
  );
}

export default UserTag;