import "./App.css";
import GameBoard from './components/GameBoard/GameBoard'
import GameControl from "./components/GameControl/GameControl";
import GameLayout from "./components/GameLayout/GameLayout";
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
    };

    const controls = [
        {
            label: "Start",
            icon: "fa-solid fa-play",
            action: initialize,
        },
        // {
        //     label: "Save",
        //     action: () => {},
        //     icon: "fa-solid fa-bookmark"
        // },
        {
            icon: "fa-solid fa-power-off",
            label: "Abandon",
            danger: true
        }
    ];

    return (
        <div className="container">
            <GameLayout>
                <GameStatus />
                <GameBoard />
                <GameControl controls={controls} /> 
            </GameLayout>
            {/* <div className="game-container">
            </div>*/}
        </div>
    )
}

export default App
