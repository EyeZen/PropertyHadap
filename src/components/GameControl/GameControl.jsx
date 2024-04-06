import "./GameControl.css";
import Orientation from "../../../helpers/Orientation";
import GameComponentType, { GameComponentTypeSymbol } from "../../../helpers/GameComponentType";

function GameControl({ controls, orientation=Orientation.HORIZONTAL }) {
    if(!controls) {
        throw Error("GameControl: controls required!");
    }

    const styles = orientation === Orientation.HORIZONTAL ? {
        gridTemplateColumns: `repeat(${controls.length}, 1fr)`
    } : {
        gridTemplateRows: `repeat(${controls.length}, 1fr)`
    }
    
    return (
        <div className="game-controls" style={styles}>
            {
                controls.map(gameControl => 
                <div key={gameControl.label} 
                    className={`game-control ${gameControl.danger ? 'danger' : ''} ${gameControl.disabled ? 'disabled' : ''}`} 
                    onClick={() => !gameControl.disabled && gameControl.action?.call()}
                >
                    <i className={gameControl.icon}></i>
                    <span>{gameControl.label}</span>
                </div>
                )
            }
        </div>
    )
}

GameControl[GameComponentTypeSymbol] = GameComponentType.CONTROL;

export default GameControl
