import React, { useEffect } from 'react'
import GameBoard from './components/GameBoard/GameBoard'
import { gameBoardActions } from './store/slices/gameBoardSlice';
import { useDispatch } from 'react-redux';
import helpers from '../helpers';

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
        // dispatch(setTilemap({ tilemap: helpers.generateTilemap(3, 3)}));
    }

    return (
        <div className="container">
            <div><button onClick={initialize}>Initialize</button></div>
            <GameBoard rows={3} columns={3} />
        </div>
    )
}

export default App
