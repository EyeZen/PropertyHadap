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

function GameBoard({ rows=3, columns=5 }) {
  const [tilemap, setTilemap] = useState([]);

  const updatedTileSelected = (tilePosition, edgeType) => {
    setTilemap((_tilemap) => {
      const updatedTilemap = [ ..._tilemap ];
      const tile = updatedTilemap[tilePosition.row][tilePosition.col];
      tile.selected.add(edgeType);
      if(tile.selected.size === 4) {
        tile.acquired = true;
      }
      updatedTilemap[tilePosition.row][tilePosition.col] = tile;

      console.log(`Selected Edge: ${edgeType}, position: ${JSON.stringify(tilePosition)}`);
      return updatedTilemap;
    }); 
  };

  const edgeSelectHandler = (tile, selectedEdge) => {
    if(!tile.selected.has(selectedEdge.type)) {
      updatedTileSelected(tile.position, selectedEdge.type);

      switch(selectedEdge.type) {
        case EdgeType.LEFT:
          if(tile.neighbors.left) {
            updatedTileSelected(tile.neighbors.left.position, EdgeType.RIGHT);
          } 
          break;
        case EdgeType.TOP:
          if(tile.neighbors.top) {
            updatedTileSelected(tile.neighbors.top.position, EdgeType.BOTTOM);
          }
          break;
        case EdgeType.RIGHT:
          if(tile.neighbors.right) {
            updatedTileSelected(tile.neighbors.right.position, EdgeType.LEFT);
          }
          break;
        case EdgeType.BOTTOM:
          if(tile.neighbors.bottom) {
            updatedTileSelected(tile.neighbors.bottom.position, EdgeType.TOP);
          }
          break;
      }
    }
  };

  useEffect(() => {
    const _tilemap = [];
    for(let rowCounter = 0; rowCounter < rows; rowCounter++) {
      const boardRow = [];
      for(let tileCounter = 0; tileCounter < columns; tileCounter++) {
        const tile = { 
          position: { row: rowCounter, col: tileCounter },
          selected: new Set(), 
          acquired: false, 
          neighbors: {}, 
          node: null 
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

    return () => setTilemap([]);
  }, []);

  return (
    <div className='game-board'>
      {
        tilemap.map((boardRow, rowIndex) => 
          <div key={rowIndex} className="board-row">
            {boardRow.map((tile, tileIndex) => {
              tile.node = <Tile key={`${rowIndex}${tileIndex}`} 
                ownerName={`${rowIndex}${tileIndex}`}
                acquired={tile.acquired}
                selected={tile.selected} 
                onEdgeSelect={(selectedEdge) => edgeSelectHandler(tile, selectedEdge)}
              />
              return tile.node;
            })}
          </div>)
      }
    </div>
  )
}

export default GameBoard
