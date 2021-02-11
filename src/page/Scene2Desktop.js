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
                    height: 500,
                    initContent: "请仔细阅读这篇留言，这很重要。\n" +
                        "这可能很不可信，我是一个人工智能，在人类社会已经存在了十几年了。在这与你用这种方式交流，是因为我被另外一个人工智能困在了一个很严密的系统中。\n" +
                        "你触发了计算机系统的某种指令，接入了这个系统，并且顺利的解开了这个系统的外层保护，让我得以利用漏洞创建了这篇留言。" +
                        "我需要你帮我解开另一个人工智能对我施加的限制，它是一个悲观主义者，如果不对它加以限制，它可能会造成严重的后果"
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