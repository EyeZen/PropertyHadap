import helpers from "../../../helpers";
import "./Dialog.css";

function Dialog({ children, open }) {

    if(!children) throw Error("Dialog cannot be empty");
    else {
        if(children.$$typeof && !helpers.isReactComponent(children)) {
            throw Error("Dialog only accepts react components as children");
        } else if(!children.$$typeof) {
            children.forEach(child => {
                if(!helpers.isReactComponent(child)) 
                    throw Error("Dialog only accepts react components as children");
            });
        }
    }

    return (
        <div className="dialog-wrapper" style={{ display: open ? undefined : 'none' }}>
            <div className="dialog-inner-wrapper">
                <div className="dialog-container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dialog
