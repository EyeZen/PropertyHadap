class BoardState {
    constructor(rows, columns, tilemap, players, turn, gameOver)
    {
        if (!rows || rows <= 0) throw Error("Invalid rows value!");
        this.rows = rows;

        if (!columns || columns <= 0) throw Error("Invalid columns value!");
        this.columns = columns;

        this.tilemap = tilemap ?? this._generateTilemap();

        if (!players || players.length <= 1) throw Error("Players list invalid");
        this.players = players;

        this.turn = turn ?? 0;

        this.gameOver = Boolean(gameOver);
    }

    toObject() {
        return {
            rows: this.rows,
            columns: this.columns,
            tilemap: [...this.tilemap.map(boardRow => [...boardRow])],
            turn: this.turn,
            gaveOver: this.gameOver,
            players: [...this.players]
        };
    }

    _generateTilemap() {
        if(!this.rows || this.rows <= 0 || !this.columns || this.columns <= 0) {
            throw new Error("Invalid rows or columns!");
        }
        const _tilemap = [];
        for(let rowCounter = 0; rowCounter < this.rows; rowCounter++) {
          const boardRow = [];
          for(let tileCounter = 0; tileCounter < this.columns; tileCounter++) {
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
        return _tilemap;
    }
}