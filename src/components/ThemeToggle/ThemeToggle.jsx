import { useDataLayerValue } from "../../DataLayer";

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
        className="checkbox-label bg-neutral-700 w-[50px] h-[26px] rounded-full relative p-[5px] cursor-pointer flex justify-between align-middle"
        >
        <i className="fas fa-moon text-yellow-light"></i>
        <i className="fas fa-sun text-yellow-dark"></i>
        <span className="transition linear ball w-[22px] h-[22px] bg-white absolute left-[2px] top-[2px] rounded-full"></span>
      </label>
    </div>
  )
}

export default ThemeToggle;