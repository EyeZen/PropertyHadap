import "./App.css";
import CreateGame from "./components/CreateGame/CreateGame";
import AddPlayerDialog from "./components/Dialog/AddPlayerDialog/AddPlayerDialog";
import Dialog from "./components/Dialog/Dialog";
import GameBoard from './components/GameBoard/GameBoard'
import GameControl from "./components/GameControl/GameControl";
import GameLayout from "./components/GameLayout/GameLayout";
import GameStatus from "./components/GameStatus/GameStatus";
import { gameBoardActions } from './store/slices/gameBoardSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const gameOver = useSelector(state => state.gameboard.gameOver);
    const gameStarted = useSelector(state => state.gameboard.gameStarted);
    const { generateTilemap, resetGameBoard, setGameStarted } = gameBoardActions;
    const dispatch = useDispatch();

    const controls = [
        {
            label: "Start",
            icon: "fa-solid fa-play",
            action: () => {
                dispatch(generateTilemap());
            },
            disabled: false,
        },
        {
            icon: "fa-solid fa-power-off",
            label: gameOver ? "Reset" : "Abandon",
            danger: true,
            action: () => {
                if(gameOver) {
                    dispatch(resetGameBoard());
                    dispatch(setGameStarted(false));
                } else {
                    dispatch(resetGameBoard());
                    dispatch(setGameStarted(false));
                }
            }
        }
    ];

    return (
        <div className="container">
            {
                gameStarted
                ? <>
                    <Dialog>
                        <AddPlayerDialog />
                    </Dialog>
                    <GameLayout>
                        <GameStatus />
                        <GameBoard />
                        <GameControl controls={controls} /> 
                    </GameLayout>
                </>
                : <CreateGame />
            }
        </div>
    )
}

export default App
