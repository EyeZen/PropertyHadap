import "./GameBoard.css";
import Tile from '../Tile/Tile.jsx';
import { useDispatch, useSelector } from "react-redux";
import { gameBoardActions } from "../../store/slices/gameBoardSlice.js";

function GameBoard() {
  const tilemap = useSelector(state => state.gameboard.tilemap);
  const gameOver = useSelector(state => state.gameboard.gameOver);
  const { selectEdge } = gameBoardActions;
  const dispatch = useDispatch();

  return (
    <div className='game-board'>
      {
        tilemap.map((boardRow, rowIndex) => 
          <div key={rowIndex} className="board-row">
            {boardRow.map((tile, tileIndex) => 
            <Tile key={`${rowIndex}${tileIndex}`} 
                ownerName={tile.acquiredBy?.alias}
                acquired={tile.acquired}
                selected={tile.selected} 
                onEdgeSelect={(selectedEdge) => dispatch(selectEdge({ tilePosition: tile.position, selectedEdge }))}
                disabled={gameOver}
            />)}
          </div>)
      }
    </div>
  )
}

export default GameBoard
