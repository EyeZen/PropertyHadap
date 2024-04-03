import React, { useState } from 'react'
import GameBoard from './components/GameBoard/GameBoard'

function App() {
    const [players, setPlayers] = useState([
        {
            alias: "Shivam"
        },
        {
            alias: "Raanu"
        }
    ]);

    const nextTurnProvider = (prevTurn, tileState) => {
        if(tileState.acquired) {
            return prevTurn;
        }
        return (prevTurn + 1) % players.length;
    }

    return (
        <div className="container">
            <div></div>
            <GameBoard rows={3} columns={3}
                playersState={players}
                nextTurn={nextTurnProvider}
            />
        </div>
    )
}

export default App
