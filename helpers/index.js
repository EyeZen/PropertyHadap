
const helpers = {};

helpers.generateTilemap = (rows, columns) => {
    const _tilemap = [];
    for(let rowCounter = 0; rowCounter < rows; rowCounter++) {
      const boardRow = [];
      for(let tileCounter = 0; tileCounter < columns; tileCounter++) {
        const tile = { 
          position: { row: rowCounter, col: tileCounter },
          selected: [], 
          acquired: false, 
          acquiredBy: null,
          neighbors: {},
        };
        tile.neighbors.top = rowCounter > 0 ? _tilemap[rowCounter - 1][tileCounter].position : null;
        tile.neighbors.left = tileCounter > 0 ? boardRow[tileCounter - 1].position : null;
        tile.neighbors.right = tile.neighbors.bottom = null;
    
        if(tile.neighbors.left) {
          const leftNeighbor = boardRow[tile.neighbors.left.col];
          leftNeighbor.neighbors.right = tile.position;
        }
        if(tile.neighbors.top) {
          const topNeighbor = _tilemap[tile.neighbors.top.row][tile.neighbors.top.col];
          topNeighbor.neighbors.bottom = tile.position;
        }
    
        boardRow.push(tile);
      }
      _tilemap.push(boardRow);
    }
    return _tilemap;
};

helpers.checkTileAcquired = (tile) => {
    return (
        tile.selected.length === 4 || 
        (
          tile.selected.length === 3 && 
          !tile.selected.some(edgeType => edgeType === selectedEdge.type)
        )
    );
}

export default helpers;