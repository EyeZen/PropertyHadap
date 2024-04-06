import "./GameBoard.css";
import Tile from './Tile/Tile.jsx';
import { useDispatch, useSelector } from "react-redux";
import { gameBoardActions } from "../../store/slices/gameBoardSlice.js";
import GameComponentType, { GameComponentTypeSymbol } from "../../../helpers/GameComponentType.js";

function GameBoard() {
  const boardSize = useSelector(state => state.gameboard.size);
  const tilemap = useSelector(state => state.gameboard.tilemap);
  const gameOver = useSelector(state => state.gameboard.gameOver);
  const { selectEdge } = gameBoardActions;
  const dispatch = useDispatch();

  return (
    <div className='game-board' style={{
      gridTemplateRows: `repeat(${boardSize.columns}, 1fr)`,
      gridTemplateColumns: `repeat(${boardSize.rows}, 1fr)`
    }}>
      {
        tilemap.flatMap(row => row)
          .map((tile, tileIndex) => 
            <Tile key={`${tileIndex}`} 
                ownerName={tile.acquiredBy?.alias}
                acquired={tile.acquired}
                selected={tile.selected} 
                onEdgeSelect={(selectedEdge) => dispatch(selectEdge({ tilePosition: tile.position, selectedEdge }))}
                disabled={gameOver}
            />)
      }
    </div>
  )
}

GameBoard[GameComponentTypeSymbol] = GameComponentType.BOARD;

export default GameBoard
