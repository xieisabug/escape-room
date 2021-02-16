import React, { useState } from "react";

import {ProgramIcon} from "../../components/ProgramIcon";
import {
    FolderOutlined,
    LeftCircleOutlined,
    ContainerOutlined
} from "@ant-design/icons";
import {IdGenerator} from "../../Utils";

function FileManager(props) {
    let fileCache = {};
    initFileSystem(props.fileSystem);

    const [files, setFiles] = useState(props.fileSystem);
    const [currentDirectory, setCurrentDirectory] = useState(null);
    const [fileNavigator, setFileNavigator] = useState([]);

    function getNextLevelFiles(f) {
        let slice = fileNavigator.slice();
        slice.push(f.name);
        setFileNavigator(slice);
        if (f.getChildren) {
            if (!f.isVirtual) {
                setCurrentDirectory(f);
            }
            setFiles(f.getChildren(f));
        } else {
            setCurrentDirectory(f);
            setFiles(f.children);
        }
    }

    function backToParent() {
        if (currentDirectory) {
            if (currentDirectory.parent) {
                let slice = fileNavigator.splice(fileNavigator.length - 1, 1);
                setFileNavigator(slice);
                if (currentDirectory.getParent) {
                    let parent = currentDirectory.getParent();
                    if (parent) {
                        setFiles(parent);
                    } else {
                        setCurrentDirectory(currentDirectory.parent);
                        setFiles(currentDirectory.parent.children);
                    }
                } else {
                    setCurrentDirectory(currentDirectory.parent);
                    setFiles(currentDirectory.parent.children);
                }
            } else {
                if (currentDirectory.getParent) {
                    let parent = currentDirectory.getParent();
                    if (parent) {
                        let slice1 = fileNavigator.slice();
                        slice1.splice(fileNavigator.length - 1, 1);
                        setFileNavigator(slice1);
                        setFiles(parent);
                    } else {
                        setFileNavigator([]);
                        setFiles(props.fileSystem);
                    }
                } else {
                    setFileNavigator([]);
                    setFiles(props.fileSystem);
                }

            }
        }
    }

    function initFileSystem(fileSystem, parent) {
        fileSystem.forEach(f => {
            f.id = IdGenerator.instance.getKey();
            f.parent = parent;
            fileCache[f.id] = f;
            if (f.children) {
                initFileSystem(f.children, f);
            }
        });
    }

    function clickIcon(f) {
        if (f.type === 'd') {
            getNextLevelFiles(f);
        } else {
            props.openProgram(f.program)
        }
    }

    return <div className="file-manager">
        <div className="file-manager-function">
            <div onClick={backToParent}>
                <LeftCircleOutlined />
            </div>
        </div>
        <div className="file-manager-navigator">
            {fileNavigator.map(i => {
                return <span className="file-manager-navigator-item">{i}</span>
            })}
        </div>
        <div className="file-manager-program-list">
            {files.map(f => {
                switch (f.type) {
                    case "d":
                        return <ProgramIcon key={f.id} icon={<FolderOutlined />} text={f.name} onClick={() => clickIcon(f)} />
                    case "text-editor":
                        return <ProgramIcon key={f.id} icon={<ContainerOutlined />} text={f.name} onClick={() => clickIcon(f)} />
                }
            })}
        </div>

    </div>;
}

export default function(attrMap) {
    return {
        name: "FileManager",
        attrMap,
        icon() {
            return <ProgramIcon
                icon={<FolderOutlined />}
                text={attrMap.text ? attrMap.text : this.name}
            />;
        },
        title() {
            return <span>{attrMap.text ? attrMap.text : this.name}</span>
        },
        menu() {
            return null;
        },
        render() {
            return <FileManager fileSystem={attrMap.fileSystem} openProgram={attrMap.openProgram}/>;
        }
    }
}
