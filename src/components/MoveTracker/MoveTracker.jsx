import { useSelector } from "react-redux";
import helpers from "../../../helpers";
import "./MoveTracker.css";
import { useEffect, useRef } from "react";

function MoveTracker() {
    const moves = useSelector(state => state.gameboard.moves);
    const players = useSelector(state => state.gameboard.players);
    const moveTrackerRef = useRef(null);

    useEffect(() => {
        if(moveTrackerRef.current) {
            helpers.makeDraggable(moveTrackerRef.current);
        }
    }, [moveTrackerRef]);

    useEffect(() => {
        console.log(moves);
    }, [moves]);

    return (
        <div className="moves-tracker" ref={moveTrackerRef}>
            <h1>Move Tracker</h1>
            <div className="moves-list-wrapper">
                <ul className="moves-list">
                    {
                        moves.map((move, moveIndex) => 
                            <li key={moveIndex} className={`move ${move.acquired ? 'move__highlited' : ''}`}>
                                <span className="move__turn">{players[move.turn].alias}</span>
                                <span className="move__tile">{`Tile[${move.tile.row}][${move.tile.col}]`}</span>
                                <span className="move__edge">{`${helpers.capitalize(move.edge)}-edge`}</span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default MoveTracker
