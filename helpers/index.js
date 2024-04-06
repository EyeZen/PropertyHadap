import { GameComponentTypeSymbol } from "./GameComponentType";

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

helpers.getPlayerScore = (tilemap, player) => {
  return tilemap.flatMap(row => row).filter(tile => tile.acquired && tile.acquiredBy && tile.acquiredBy.alias === player.alias).length;
} 

helpers.isGameComponentOfType = (element, componentType) => {
  return element.type && element.type[GameComponentTypeSymbol] && element.type[GameComponentTypeSymbol] === componentType;
}

helpers.capitalize = str => `${str.slice(0,1).toUpperCase()}${str.slice(1).toLowerCase()}`;

helpers.makeDraggable = (element) => {
  element.addEventListener('mousedown', (ev) => {
    let shiftX = ev.clientX - element.getBoundingClientRect().left;
    let shiftY = ev.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(ev.pageX, ev.pageY);

    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    element.addEventListener('mouseup', function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    });
  });
}

export default helpers;