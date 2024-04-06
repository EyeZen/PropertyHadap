import "./GameControl.css";

function GameControl({ controls }) {

    if(!controls) {
        throw Error("GameControl: controls required!");
    }
    
    return (
    <div className="game-controls" style={{
        gridTemplateColumns: `repeat(${controls.length}, 1fr)`
    }}>
        {
            controls.map(gameControl => 
            <div key={gameControl.label} className={`game-control ${gameControl.danger ? 'danger' : ''}`} onClick={gameControl.action}>
                <i className={gameControl.icon}></i>
                <span>{gameControl.label}</span>
            </div>
            )
        }
    </div>
)
}

export default GameControl
