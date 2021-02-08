import * as React from "react";

export default function Window(props) {
    if (!props.component) {
        return null;
    }
    return (
        <div className="window">
            <div className="window-title">
                <div>{props.component.title()}</div>
                <div></div>
            </div>
            <div className="window-menu">{props.component.menu()}</div>
            <div className="window-content">{props.component.render()}</div>
        </div>
    );
}
