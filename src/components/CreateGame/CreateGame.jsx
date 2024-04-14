import { useState } from "react";
import "./CreateGame.css";
import { useDispatch } from "react-redux";
import { gameBoardActions } from "../../store/slices/gameBoardSlice";
import Dialog from "../Dialog/Dialog";

function CreateGame() {
    const [createGameFlag, setCreateGameFlag] = useState(false);
    const [showGuideFlag, setShowGuideFlag] = useState(false);

    return (
        <div className="create-game">
            <h1>Property Hadap</h1>
            <div className="btn-group">
                <button onClick={() => setCreateGameFlag(flag => !flag)}>Create Game</button>
                <button onClick={() => setShowGuideFlag(true)}>Guide</button>
            </div>

            <Dialog open={createGameFlag}>
                <CreateGameForm onCancel={() => setCreateGameFlag(false)} />
            </Dialog>

            <Dialog open={showGuideFlag} >
                <GameGuide onClose={() => setShowGuideFlag(false)} />
            </Dialog>
            
        </div>
    )
}

function CreateGameForm({ onCancel }) {
    const [size, setSize] = useState(3);
    const [playersList, setPlayersList] = useState([]);
    const [newPlayer, setNewPlayer] = useState('');
    const dispatch = useDispatch();
    const { setBoardSize, setPlayers, setGameStarted } = gameBoardActions;

    const sizeChangeHandler = (ev) => {
        const value = ev.target.value;
        // if(value && !isNaN(parseInt(value))) {
            setSize(value);
        // }
    };

    const playerAddHandler = () => {
        if(newPlayer && newPlayer !== '') {
            const normalizedPlayer = newPlayer.trim().replace(' ', '-').toLowerCase();
            if(playersList.some(existingPlayer => existingPlayer === normalizedPlayer)) {
                return;
            }
            setPlayersList(_list => [..._list, normalizedPlayer]);
            setNewPlayer('');
        }
    };

    const playerRemoveHandler = (index) => {
        setPlayersList(_list => _list.filter((_, idx) => idx !== index))
    };

    const createGameHandler = () => {
        if(
            size && !isNaN(parseInt(size)) &&
            playersList && playersList.length > 0         
        ) {
            dispatch(setBoardSize({ rows: size, columns: size }));
            dispatch(setPlayers({ players: playersList.map(player => ({ alias: player })) }));
            dispatch(setGameStarted(true));
        }
    }

    return (
        <div className="game-form-wrapper">
            <h1>New Game</h1>
            <div className="game-form">
                <div className="form-controller">
                    <label htmlFor="size">Board Size</label>
                    <input type="text" name="size" id="size" value={size} onChange={sizeChangeHandler} />
                </div>
                <div className="form-controller form-controller__block">
                    <div className="form-controller__header">
                        <h2>Players</h2>
                        <button onClick={playerAddHandler} className={!newPlayer || newPlayer === '' ? 'disabled' : ''}>Add</button>
                    </div>
                    <input type="text" name="new-player" id="new-player" placeholder="New Player Alias" value={newPlayer} onChange={ev => setNewPlayer(ev.target.value)} />
                    <ul className="players-list">
                        {playersList.map((player, index) => 
                        <li key={index}>
                            <span>{player}</span>
                            <button onClick={() => playerRemoveHandler(index)}>Remove</button>
                        </li>)}
                    </ul>
                </div>
            </div>
            <div className="form-footer">
                <button onClick={createGameHandler}>Create Game</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

function GameGuide({ onClose }) {
    return (
        <div className="guide-wrapper">
            <h1>Guide</h1>
            <ul>
                <li>The objective of the game is to capture most tiles on the board.</li>
                <li>A tile is capture when all four of its edges are selected.</li>
                <li>Any number of players can play together in a game.</li>
                <li>Every player in the game gets a turn in round-robin fashion.</li>
                <li>Each player gets to select any one unselected edge on the board.</li>
                <li>On selection, if the selected edge is a part of now captured tile, the player earns one point and one extra move.</li>
                <li>When all tiles are captured, player with the most tiles captured is the winner!</li>
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default CreateGame
