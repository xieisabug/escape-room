import * as React from "react";
import classnames from "classnames";
import Program from "./Program";

export default function Desktop(props) {
    let container = classnames({
        "desktop": true
    })
    return <div className={container}>
        {props.programs.map(i => {
            return <Program key={i.name} data={i} onClick={props.bindClick} />
        })}
    </div>;
}