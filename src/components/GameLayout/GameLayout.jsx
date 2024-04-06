import helpers from "../../../helpers";
import GameComponentType from "../../../helpers/GameComponentType";
import "./GameLayout.css";

function GameLayout({ children }) {

    children.forEach(child => {
        if(!child.$$typeof || child.$$typeof !== Symbol.for("react.element")) {
            throw Error("GameLayout can only contain react components as children!");
        }
    });
    
    return (
        <div className="layout-default">
            <div className="layout-status-wrapper">
                {children.filter(child => helpers.isGameComponentOfType(child, GameComponentType.STATUS))}
            </div>
            <div className="layout-control-wrapper">
                {children.filter(child => helpers.isGameComponentOfType(child, GameComponentType.CONTROL))}
            </div>
            <div className="layout-board-wrapper">
                {children.filter(child => helpers.isGameComponentOfType(child, GameComponentType.BOARD))}
            </div>
        </div>
    )
}

export default GameLayout
