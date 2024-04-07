import "./App.css";
import AddPlayerDialog from "./components/Dialog/AddPlayerDialog/AddPlayerDialog";
import Dialog from "./components/Dialog/Dialog";
import GameBoard from './components/GameBoard/GameBoard'
import GameControl from "./components/GameControl/GameControl";
import GameLayout from "./components/GameLayout/GameLayout";
import GameStatus from "./components/GameStatus/GameStatus";
import MoveTracker from "./components/MoveTracker/MoveTracker";
import { gameBoardActions } from './store/slices/gameBoardSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const gameOver = useSelector(state => state.gameboard.gameOver);
    const { setPlayers, setBoardSize, generateTilemap, resetGameBoard } = gameBoardActions;
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
            disabled: false,
        },
        // {
        //     label: "Save",
        //     action: () => {},
        //     icon: "fa-solid fa-bookmark"
        // },
        {
            icon: "fa-solid fa-power-off",
            label: gameOver ? "Reset" : "Abandon",
            danger: true,
            action: () => {
                if(gameOver) {
                    dispatch(resetGameBoard());
                } else {
                    dispatch(resetGameBoard());
                }
            }
        }
    ];

    return (
        <div className="container">
            <Dialog>
                <AddPlayerDialog />
            </Dialog>
            <GameLayout>
                <GameStatus />
                <GameBoard />
                <GameControl controls={controls} /> 
            </GameLayout>
        </div>
    )
}

export default App
