import { createSlice } from "@reduxjs/toolkit";
import helpers from "../../../helpers";
import { EdgeType } from "../../components/GameBoard/Tile/Tile";

const defaultState = {
    rows: 0,
    columns: 0,
    tilemap: [],
    turn: 0,
    gameOver: false,
    players: []
};

const processTileSelectedEdge = (tile, selectedEdgeType, currentPlayer) => {
    if(!tile.selected.some(edgeType => edgeType === selectedEdgeType))
        tile.selected.push(selectedEdgeType);
    if(tile.selected.length === 4) {
        tile.acquired = true;
        tile.acquiredBy = currentPlayer;
    }
    return tile;
};

const checkGameOver = (tilemap) => {
    const totalTilesCount = tilemap.flatMap(tilesRow => tilesRow).length;
    const acquiredTilesCount = tilemap.flatMap(tilesRow => tilesRow.filter(tile => tile.acquired)).length;

    if(acquiredTilesCount === totalTilesCount) {
      return true;
    }

    return false;
}

const gameBoard = createSlice({
    name: "game-board",
    initialState: { ...defaultState },
    reducers: {
        // game-board
        setGameBoard(state, { payload }) {
            return payload;
        },
        resetGameBoard() {
            return { ...defaultState };
        },
        // Setters
        // rows, columns
        setBoardSize(state, { payload }) {
            const { rows, columns } = payload;
            state.rows = rows;
            state.columns = columns;
        },
        // tilemap
        setTilemap(state, { payload }) {
            state.tilemap = payload.tilemap;
        },
        // turn
        setTurn(state, { payload }) {
            state.turn = payload;
        },
        // gameOver
        setGameOver(state, { payload }) {
            state.gameOver = payload;
        },
        // players
        setPlayers(state, { payload }) {
            const { players } = payload;
            state.players = [...players].map( player => ({
                ...player,
                acquiredCount: state.tilemap.flatMap(
                    boardRow => boardRow.filter(
                        tile => tile.acquired && tile.acquiredBy === player.alias
                        )).length
            }) );
        },

        // actions
        generateTilemap(state, { payload }) {
            state.tilemap = helpers.generateTilemap(state.rows, state.columns);
        },
        addPlayer(state, { payload }) {
            const { player } = payload;
            state.players = [...state.players, player];
        },
        removePlayer(state, { payload }) {
            const { player, playerComparator } = payload;
            state.players = state.players.filter(_player => playerComparator(_player, player));
        },
        selectEdge(state, { payload }) {
            const { tilePosition, selectedEdge } = payload;
            const tile = state.tilemap[tilePosition.row][tilePosition.col];
            const isEdgeSelected = tile.selected.some(edge => edge === selectedEdge.type);
            if(isEdgeSelected) return state;

            const acquiredPreProcess = tile.acquired;
            if(acquiredPreProcess) return state;

            state.tilemap[tilePosition.row][tilePosition.col] = processTileSelectedEdge(tile, selectedEdge.type, state.players[state.turn]);
            const acquiredPostProcess = state.tilemap[tilePosition.row][tilePosition.col].acquired;
            // update turn
            if(!acquiredPostProcess) {
                state.turn = (state.turn + 1) % state.players.length;
            }

            // update neighbour-tile's common edge
            switch(selectedEdge.type) {
                case EdgeType.LEFT:
                    if(tile.neighbors.left) {
                        const position = tile.neighbors.left;
                        state.tilemap[position.row][position.col] = processTileSelectedEdge(state.tilemap[position.row][position.col], EdgeType.RIGHT, state.players[state.turn]);
                    } 
                    break;
                case EdgeType.TOP:
                    if(tile.neighbors.top) {
                        const position = tile.neighbors.top;
                        state.tilemap[position.row][position.col] = processTileSelectedEdge(state.tilemap[position.row][position.col], EdgeType.BOTTOM, state.players[state.turn]);
                    }
                    break;
                case EdgeType.RIGHT:
                    if(tile.neighbors.right) {
                        const position = tile.neighbors.right;
                        state.tilemap[position.row][position.col] = processTileSelectedEdge(state.tilemap[position.row][position.col], EdgeType.LEFT, state.players[state.turn]);
                    }
                    break;
                case EdgeType.BOTTOM:
                    if(tile.neighbors.bottom) {
                        const position = tile.neighbors.bottom;
                        state.tilemap[position.row][position.col] = processTileSelectedEdge(state.tilemap[position.row][position.col], EdgeType.TOP, state.players[state.turn]);
                    }
                    break;
            }

            state.gameOver = checkGameOver(state.tilemap);
        },
    }
});

export const gameBoardActions = gameBoard.actions;
export const gameBoardReducers = gameBoard.reducer;