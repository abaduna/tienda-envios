
import './App.css';
import {CaritoComprarProvider} from "../src/contexts/carito"
import RoutesPrincial from './route/Routas';
function App() {
  return (
    <div className="App">
      <CaritoComprarProvider>
        <RoutesPrincial/>
      </CaritoComprarProvider>
      
    </div>
  );
}

export default App;
