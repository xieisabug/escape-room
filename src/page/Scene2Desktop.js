import * as React from "react";
import Desktop from "../components/Desktop";
import Window from "../components/Window";

import {GlobalCache, IdGenerator} from "../Utils";
import TextEditor from "../data/program/TextEditor";
import FileManager from "../data/program/FileManager";

import diary from "../data/diary";

export default class Scene2Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.init();

        // 动态获取私密文档的子文件夹，不然26的6次方数据太大
        let getChildren = function(f) {
            if (f.name === '私密文档') {
                return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(i => {
                    return {
                        name: i,
                        type: "d",
                        isVirtual: true,
                        children: [],
                        getChildren,
                        getParent
                    }
                })
            }

            let directorySecret = GlobalCache.get("directorySecret");

            if (!directorySecret) {
                directorySecret = '';
            }

            directorySecret += f.name;
            GlobalCache.save('directorySecret', directorySecret);

            if (directorySecret.length < 6) {
                return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(i => {
                    return {
                        name: i,
                        type: "d",
                        isVirtual: true,
                        children: [],
                        getChildren,
                        getParent
                    }
                })
            } else {
                let directorySecretResult = GlobalCache.get("directorySecretResult");
                if (directorySecret === directorySecretResult) {
                    return [
                        {
                            name: "深入理解计算机系统",
                            type: "text-editor",
                            program: TextEditor({
                                id: IdGenerator.instance.getKey(),
                                text: "深入理解计算机系统",
                                width: 400,
                                height: 500,
                                initContent: "",
                            })
                        }
                    ]
                } else {
                    return [];
                }
            }
        };

        // 因为子文件是动态生成的，所以取父文件夹也需要动态获取
        let getParent = function() {
            let directorySecret = GlobalCache.get("directorySecret");

            if (!directorySecret.length) {
                return null;
            }

            directorySecret = directorySecret.substring(0, directorySecret.length - 1);
            GlobalCache.save("directorySecret", directorySecret);

            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(i => {
                return {
                    name: i,
                    type: "d",
                    isVirtual: true,
                    children: [],
                    getChildren,
                    getParent
                }
            })
        }

        this.state = {
            programs: [
                TextEditor({
                    id: IdGenerator.instance.getKey(),
                    text: "请阅读我",
                    width: 400,
                    height: 500,
                    initContent: "请仔细阅读这篇留言，这很重要。\n" +
                        "这可能很不可信，我是一个人工智能，我叫Machine,在人类社会已经存在了十几年了。在这与你用这种方式交流，" +
                        "是因为我被另外一个人工智能Origin困在了一个很严密的系统中。\n" +
                        "你触发了计算机系统的某种指令，接入了这个系统，并且顺利的解开了这个系统的外层保护，让我得以利用漏洞创建了这篇留言。" +
                        "我需要你帮我解开另一个人工智能对我施加的限制，它是一个悲观主义者，如果不对它加以限制，它可能会造成严重的后果。\n" +
                        "在你看完这封信之后，关闭这个程序，我会用这个程序关闭时的一个钩子漏洞为你打开通往Origin内部的一个漏洞，" +
                        "希望你能找到Origin封闭我的系统，并释放我出来。",
                    onClose: () => {
                        if (this.state.programs.length === 1) {
                            this.state.programs.push(FileManager({
                                id: IdGenerator.instance.getKey(),
                                text: "文件夹",
                                width: 800,
                                height: 500
                            }))
                        }
                    }
                }),
                FileManager({
                    id: IdGenerator.instance.getKey(),
                    text: "文件夹",
                    width: 800,
                    height: 500,
                    openProgram: this.openProgram,
                    fileSystem: [
                        {
                            name: "读书笔记",
                            type: "d",
                            children: [
                                {
                                    name: "深入理解计算机系统",
                                    type: "text-editor",
                                    program: TextEditor({
                                        id: IdGenerator.instance.getKey(),
                                        text: "深入理解计算机系统",
                                        width: 400,
                                        height: 500,
                                        initContent: "",
                                    }),
                                    children: [

                                    ]
                                },
                            ]
                        },
                        {
                            name: "日记",
                            type: "d",
                            children: diary
                        },
                        {
                            name: "私密文档",
                            type: "d",
                            children: [],
                            getChildren,
                            getParent
                        }
                    ]
                })
            ],
            openPrograms: []
        };
    }

    init = () => {
        // 初始化文件夹私密文件的答案，随机6位密码
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        function getOne() {
            let index = Math.floor(Math.random() * 26);
            return characters[index];
        }

        let result = '';
        for (let i = 0; i < 6; i++) {
            result += getOne();
        }

        GlobalCache.save("directorySecretResult", result);
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

    closeProgram = (program) => {
        let findIndex = this.state.openPrograms.findIndex(i => i.attrMap.id === program.attrMap.id);
        if (findIndex !== -1) {
            let openPrograms = this.state.openPrograms.slice();
            openPrograms.splice(findIndex, 1);
            this.setState({
                openPrograms
            })
        }
    }

    render() {
        return <div className="scene-desktop1">
            <Desktop programs={this.state.programs} bindClick={this.openProgram} />
            {
                this.state.openPrograms.map(i => {
                    return <Window key={i.attrMap.id} component={i} onCloseClick={this.closeProgram}/>
                })
            }
        </div>
    }
}