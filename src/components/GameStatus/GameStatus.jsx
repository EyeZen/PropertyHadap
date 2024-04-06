import { useSelector } from "react-redux";
import "./GameStatus.css";
import helpers from "../../../helpers";
import GameComponentType, { GameComponentTypeSymbol } from "../../../helpers/GameComponentType";

function GameStatus() {
    const tilemap = useSelector(state => state.gameboard.tilemap);
    const players = useSelector(state => state.gameboard.players);
    const turn = useSelector(state => state.gameboard.turn);
    const gameOver = useSelector(state => state.gameboard.gameOver);

    const scoreOf = helpers.getPlayerScore.bind(null, tilemap);
    const isWinner = (player) => gameOver && players.map(_player => ({..._player, score: scoreOf(_player)})).reduce((playerPrev, playerCurr) => playerPrev.score > playerCurr ? playerPrev : playerCurr).alias === player.alias;

    return (
        <div className="game-status">
            <h1>Status</h1>
            {players && players.length > 0 && (<>
                <div className="game-turn">
                    <h2>Turn</h2>
                    <div className="turn-player">
                        <h3>Player:&nbsp;</h3>
                        <span>{players[turn].alias}</span>
                    </div>
                </div>
                <div className="game-scoreboard">
                    <h1>Score Board</h1>
                    <ul className="game-scores">
                        {/* ordered from highest to lowest */}
                        {
                            players.slice()
                                .sort((player1, player2) => scoreOf(player2) - scoreOf(player1))
                                .map((player, playerIndex) => 
                                    <li key={playerIndex} className={isWinner(player) ? "player-winner" : players[turn].alias === player.alias ? 'player-turn' : '' }>
                                        <span>{player.alias}</span>
                                        <span>{scoreOf(player)}</span>
                                    </li>
                                )
                        }
                    </ul>
                </div>
                {gameOver && 
                    <div className="game-result-container">
                        <h1>Game Over</h1>
                        <div className="game-result">
                            <span>Winner:</span>
                            <span>{players.filter(player => isWinner(player))[0].alias}</span>
                            
                            <span>Score</span>
                            <span>{scoreOf(players.filter(isWinner)[0])}</span>
                        </div>
                    </div>
                }
            </>)}
        </div>
    )
}

GameStatus[GameComponentTypeSymbol] = GameComponentType.STATUS;

export default GameStatus
