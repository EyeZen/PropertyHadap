import "./GameBoard.css";
import React, { useEffect, useState } from 'react'
import Tile, { EdgeType } from '../Tile/Tile.jsx';

// const tilemap = [ // game-board
//   [ // board-row
//     { // tile
//       position: { row, col }
//       selected: [],
//       acquired: false,
//       neighbors: [],
//     }
//   ]
// ];

// const players = [
//   {
//     alias: "",
//   }
// ];

// TODO: move rows, columns and tilemap into boardState
function GameBoard({ rows, columns, playersState, boardState, onBoardStateChange }) {
  const [tilemap, setTilemap] = useState([]);
  const [turn, setTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState(playersState);

  if(!players || players.length <= 1) return <p>Game cannot be played with a single player!</p>

  const updateTileSelected = (tilePosition, edgeType) => {
    setTilemap((_tilemap) => {
      const updatedTilemap = [ ..._tilemap ];
      const tile = updatedTilemap[tilePosition.row][tilePosition.col];
      tile.selected.add(edgeType);
      if(tile.selected.size === 4) {
        tile.acquired = true;
        tile.acquiredBy = players[turn];
      }
      updatedTilemap[tilePosition.row][tilePosition.col] = tile;

      return updatedTilemap;
    }); 
  };

  const checkTileAcquired = (tile, selectedEdge) => {
    return (
      tile.selected.size === 4 || 
      (
        tile.selected.size === 3 && 
        !tile.selected.has(selectedEdge.type)
      )
    );
  };

  const edgeSelectHandler = (tile, selectedEdge) => {

    if(!tile.selected.has(selectedEdge.type)) {
      updateTileSelected(tile.position, selectedEdge.type);

      // update neighbour-tile's common edge
      switch(selectedEdge.type) {
        case EdgeType.LEFT:
          if(tile.neighbors.left) {
            updateTileSelected(tile.neighbors.left.position, EdgeType.RIGHT);
          } 
          break;
        case EdgeType.TOP:
          if(tile.neighbors.top) {
            updateTileSelected(tile.neighbors.top.position, EdgeType.BOTTOM);
          }
          break;
        case EdgeType.RIGHT:
          if(tile.neighbors.right) {
            updateTileSelected(tile.neighbors.right.position, EdgeType.LEFT);
          }
          break;
        case EdgeType.BOTTOM:
          if(tile.neighbors.bottom) {
            updateTileSelected(tile.neighbors.bottom.position, EdgeType.TOP);
          }
          break;
      }
      
      onBoardStateChange?.call(tilemap, { ...tile.position, selected: selectedEdge.type});
      setTurn(_turn => {
        if(checkTileAcquired(tile, selectedEdge)) {
          return _turn;
        }
        return ((_turn + 1) % players.length);
      });
    }
  };

  // initialize tilemap
  useEffect(() => {
    if(boardState) {
      setTilemap(boardState);
    } else {
      const _tilemap = [];
      for(let rowCounter = 0; rowCounter < rows; rowCounter++) {
        const boardRow = [];
        for(let tileCounter = 0; tileCounter < columns; tileCounter++) {
          const tile = { 
            position: { row: rowCounter, col: tileCounter },
            selected: new Set(), 
            acquired: false, 
            acquiredBy: null,
            neighbors: {},
          };
          tile.neighbors.top = rowCounter > 0 ? _tilemap[rowCounter - 1][tileCounter] : null;
          tile.neighbors.left = tileCounter > 0 ? boardRow[tileCounter - 1] : null;
          tile.neighbors.right = tile.neighbors.bottom = null;
      
          if(tile.neighbors.left) tile.neighbors.left.right = tile;
          if(tile.neighbors.top) tile.neighbors.top.bottom = tile;
      
          boardRow.push(tile);
        }
        _tilemap.push(boardRow);
      }
      setTilemap(_tilemap);
    }

    return () => {
      if(boardState) {
        setTilemap(boardState);
      } else {
        setTilemap([]);
      }
    }
  }, []);

  // check game-over
  // update player-points
  useEffect(() => {
    if(gameOver) return;
    const totalTilesCount = tilemap.flatMap(tilesRow => tilesRow).length;
    const acquiredTilesCount = tilemap.flatMap(tilesRow => tilesRow.filter(tile => tile.acquired)).length;

    if(acquiredTilesCount === totalTilesCount) {
      setGameOver(true);
    }

    setPlayers(_players => _players.map(player => ({
      ...player,
      acquiredCount: tilemap.flatMap(boardRow => boardRow.filter(tile => tile.acquired && tile.acquiredBy === player.alias)).length
    })));

    return () => setGameOver(false);
  }, [tilemap]);

  return (
    <div>
      {gameOver && <span>Game Over</span>}
      <span>{players[turn].alias}</span>
      <div className='game-board'>
        {
          tilemap.map((boardRow, rowIndex) => 
            <div key={rowIndex} className="board-row">
              {boardRow.map((tile, tileIndex) => 
              <Tile key={`${rowIndex}${tileIndex}`} 
                  ownerName={tile.acquiredBy?.alias}
                  acquired={tile.acquired}
                  selected={tile.selected} 
                  onEdgeSelect={(selectedEdge) => edgeSelectHandler(tile, selectedEdge)}
                  disabled={gameOver}
              />)}
            </div>)
        }
      </div>
    </div>
  )
}

export default GameBoard
