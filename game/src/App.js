import './App.css';
import Pong from './components/pong'
import {GameProvider} from './context/gameContext'

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Pong />
      </GameProvider>
    </div>
  );
}

export default App;
