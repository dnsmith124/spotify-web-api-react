import Spotify  from "./components/Spotify/Spotify";
import reducer,{ initialState } from './reducer';
import { DataLayer } from './DataLayer';

function App() {
  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <div className="App">
        <Spotify />
      </div>
    </DataLayer>
  )
}

export default App;
