import * as React from "react";
import classnames from "classnames";

export default function Program(props) {
    if (!props.data) {
        return null;
    }

    let container = classnames({
        "program": true
    });

    function bindClick() {
        props.onClick(props.data)
    }

    return <div className={container} onClick={bindClick}>
        {props.data.icon()}
    </div>;
}