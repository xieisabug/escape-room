import * as React from "react";
import Desktop from "../components/Desktop";
import Window from "../components/Window";

import TextEditor from "../data/program/TextEditor";
import {IdGenerator} from "../Utils";

export default class Scene2Desktop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            programs: [
                TextEditor({
                    id: IdGenerator.instance.getKey(),
                    text: "请阅读我",
                    width: 400,
                    height: 500
                })
            ],
            openPrograms: []
        };
    }

    openProgram = (program) => {
        if (this.state.openPrograms.findIndex(i => i.attrMap.id === program.attrMap.id) === -1) {
            let openPrograms = this.state.openPrograms.slice();
            openPrograms.push(program);
            this.setState({
                openPrograms
            })
        } else {
            // TODO 把窗口置顶
        }
    }

    render() {
        return <div className="scene-desktop1">
            <Desktop programs={this.state.programs} bindClick={this.openProgram} />
            {
                this.state.openPrograms.map(i => {
                    return <Window key={i.attrMap.id} component={i}/>
                })
            }
        </div>
    }
}