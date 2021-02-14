import React, { useEffect, useRef } from "react";
import {
    CloseOutlined
} from "@ant-design/icons";

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

    containerStyle.left = '200px';
    containerStyle.top  = '200px';

    function onCloseClick() {
        props.onCloseClick(props.component);

        if (props.component.attrMap && props.component.attrMap.onClose) {
            props.component.attrMap.onClose();
        }
    }

    return (
        <div className="window" ref={container} style={containerStyle}>
            <div className="window-title" onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseOut={mouseOut}>
                <div>{props.component.title()}</div>
                <div>
                    <div onClick={onCloseClick}>
                        <CloseOutlined />
                    </div>
                </div>
            </div>
            <div className="window-menu">{props.component.menu()}</div>
            <div className="window-content">{props.component.render()}</div>
        </div>
    );
}
