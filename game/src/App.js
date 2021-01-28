import './App.css';
import Pong from './components/pong'
import {GameProvider} from './context/gameContext'

function App() {
  return (
    <div className="App bg-light">
      <GameProvider>
        <Pong />
      </GameProvider>
    </div>
  );
}

export default App;
