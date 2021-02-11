import React, { useEffect, useRef } from "react";

export default function Window(props) {
    if (!props.component) {
        return null;
    }

    const container = useRef(null);

    let isClick = false;

    function mouseDown() {
        isClick = true;
    }

    function mouseMove(e) {
        e.preventDefault();

        if (isClick && container.current) {
            let deltaX = e.movementX;
            let deltaY = e.movementY;
            let rect = container.current.getBoundingClientRect();
            container.current.style.left = rect.x + deltaX + 'px';
            container.current.style.top  = rect.y + deltaY + 'px';
        }
    }

    function mouseUp() {
        isClick = false;
    }

    function mouseOut() {
        isClick = false;
    }

    const attrMap = props.component.attrMap;

    let containerStyle = attrMap ? {
        width: attrMap.width ? (attrMap.width + "px") : null,
        height: attrMap.height ? (attrMap.height + "px") : null
    } : {};

    useEffect(() => {
        container.current.style.left = '200px';
        container.current.style.top  = '200px';
    }, [container]);

    return (
        <div className="window" ref={container} style={containerStyle}>
            <div className="window-title" onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseOut={mouseOut}>
                <div>{props.component.title()}</div>
                <div>
                </div>
            </div>
            <div className="window-menu">{props.component.menu()}</div>
            <div className="window-content">{props.component.render()}</div>
        </div>
    );
}
