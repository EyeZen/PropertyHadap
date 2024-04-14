import { useState } from "react";
import "./CreateGame.css";
import { useDispatch } from "react-redux";
import { gameBoardActions } from "../../store/slices/gameBoardSlice";

function CreateGame() {
    const [createGameFlag, setCreateGameFlag] = useState(false);
    const [playersList, setPlayersList] = useState([]);
    const [size, setSize] = useState({ rows: 0, columns: 0 });
    const [newPlayer, setNewPlayer] = useState('');
    const dispatch = useDispatch();
    const { setBoardSize, setPlayers, setGameStarted } = gameBoardActions;

    const rowsChangeHandler = (ev) => {
        const value = ev.target.value;
        // if(value && !isNaN(parseInt(value))) {
            setSize(_size => ({ ..._size, rows: value }))
        // }
    };
    
    const columnsChangeHandler = (ev) => {
        const value = ev.target.value;
        // if(value && !isNaN(parseInt(value))) {
            setSize(_size => ({ ..._size, columns: value }))
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
            size.rows && !isNaN(parseInt(size.rows)) &&
            size.columns && !isNaN(parseInt(size.columns)) &&
            playersList && playersList.length > 0         
        ) {
            dispatch(setBoardSize(size));
            dispatch(setPlayers({ players: playersList.map(player => ({ alias: player })) }));
            dispatch(setGameStarted(true));
        }
    }

    return (
        <div className="create-game">
            <button onClick={() => setCreateGameFlag(flag => !flag)}>Create Game</button>

            <div className="game-form-wrapper" style={{ display: createGameFlag ? undefined : 'none' }}>
                <h1>New Game</h1>
                <div className="game-form">
                    <div className="form-controller">
                        <label htmlFor="rows">Rows</label>
                        <input type="text" name="rows" id="rows" value={size.rows} onChange={rowsChangeHandler} />
                    </div>
                    <div className="form-controller">
                        <label htmlFor="columns">Columns</label>
                        <input type="text" name="columns" id="columns" value={size.columns} onChange={columnsChangeHandler}  />
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
                    <button onClick={() => setCreateGameFlag(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGame
