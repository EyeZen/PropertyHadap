import "./App.css";
import GameBoard from './components/GameBoard/GameBoard'
import GameStatus from "./components/GameStatus/GameStatus";
import { gameBoardActions } from './store/slices/gameBoardSlice';
import { useDispatch } from 'react-redux';

function App() {
    const { setPlayers, setBoardSize, generateTilemap } = gameBoardActions;
    const dispatch = useDispatch();

    const initialize = () => {
        dispatch(setPlayers({
            players: [
                { alias: "Shivam" },
                { alias: "Raanu" }
            ]
        }));
        
        dispatch(setBoardSize({ rows: 3, columns: 3 }));
        dispatch(generateTilemap());
    }

    return (
        <div className="container">
            <button onClick={initialize}>Start</button>
            <div className="game-container">
                <GameStatus />
                <GameBoard />
            </div>
        </div>
    )
}

export default App
