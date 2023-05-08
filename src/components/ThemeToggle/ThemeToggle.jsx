import { useDataLayerValue } from "../../DataLayer";
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ThemeToggle = ({className}) => {

  const [{ darkMode }, dispatch] = useDataLayerValue();

  return(
    <div className={className}>
      <input 
        type="checkbox" 
        className="checkbox opacity-0 absolute" 
        id="checkbox" 
        onChange={()=> dispatch({
          type: "SET_DARK_MODE",
          darkMode: !darkMode,
        })} 
      />
      <label 
        htmlFor="checkbox" 
        className="checkbox-label bg-spotify-dark-gray w-[50px] h-[26px] rounded-full relative p- p-[5px] cursor-pointer flex justify-between align-middle"
        >
          <FontAwesomeIcon icon={faMoon} className="text-yellow-light" />
          <FontAwesomeIcon icon={faSun} className="text-yellow-dark"/>
        <span className="transition linear ball w-[22px] h-[22px] bg-white absolute left-[2px] top-[2px] rounded-full"></span>
      </label>
    </div>
  )
}

export default ThemeToggle;