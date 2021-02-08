import * as React from "react";
import classnames from "classnames";
import {Button, Card, Input, Avatar, notification} from "antd";
import {
    UserOutlined,
    SmileOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";

export default class Scene1Locker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasWidth: (this.WIDTH + this.LINE_WIDTH + 50) * 6,
            canvasHeight: window.innerHeight,
            isSuccess: false
        };
    }

    // 画笔宽度
    LINE_WIDTH = 10;
    // 一笔的长度
    WIDTH = window.innerHeight / 2 - this.LINE_WIDTH;

    canvas = null;

    componentDidMount() {
        /**
         * 背景思路
         * 把数字拆分成为5个部分，因为谜题是想要将数字重组，将数字转化为电子计时器8类型的数字写法，
         * 那么每个数字都可以分为最上面的-，上部的两个|，中间的-，下部的两个|，最下面的-
         * 然后每个数字都可以用数组有没有对应的部分来表示
         *
         * 将数组生成后，按顺序循环替换对应的部分，然后循环滚动播放图像
         * 完成谜题
         */
        let numberShapeArray = [
            [[true], [true, true], [false], [true, true], [true]], // 0
            [[false], [false, true], [false], [false, true], [false]], // 1
            [[true], [false, true], [true], [true, false], [true]], // 2
            [[true], [false, true], [true], [false, true], [true]], // 3
            [[false], [true, true], [true], [false, true], [false]], // 4
            [[true], [true, false], [true], [false, true], [true]], // 5
            [[true], [true, false], [true], [true, true], [true]], // 6
            [[true], [false, true], [false], [false, true], [false]], // 7
            [[true], [true, true], [true], [true, true], [true]], // 8
            [[true], [true, true], [true], [false, true], [true]] // 9
        ];

        let context = document.getElementById("background").getContext("2d");
        context.lineWidth = this.LINE_WIDTH;

        let numberArray = this.getRandomNumberArray();
        this.setState({
            currentPassword: numberArray.join("")
        });
        console.log(numberArray);

        let transformNumberArray = this.transformNumberArray(
            numberArray.map((i) => numberShapeArray[i]),
            true
        );

        transformNumberArray.forEach((i, index) => {
            this.drawNumber(context, i, index);
        });
    }

    /**
     * 数字移位
     */
    transformNumberArray(transformNumberShapeArray, easy) {
        if (easy) {
            // 简单难度最多只移动3步
            // 数字的2个部分，分开移位
            let l = Math.floor(Math.random() * 3);
            while (l === 0) {
                // 保证肯定被移动
                l = Math.floor(Math.random() * 3);
            }

            // 遍历位置，因为是简单难度，所以只移动上面的三个位置，并且上面的三个位置移动相同的偏移量
            for (let s = 0; s < 3; s++) {
                // 遍历数字
                let n = l;
                while (n--) {
                    let temp = transformNumberShapeArray[0][s];
                    for (let i = 0; i < 6; i++) {
                        // 循环移位
                        if (i !== 5) {
                            transformNumberShapeArray[i][s] =
                                transformNumberShapeArray[i + 1][s];
                        } else {
                            transformNumberShapeArray[5][s] = temp;
                        }
                    }
                }
            }

            return transformNumberShapeArray;
        } else {
            // 遍历位置，5个位置都移动
            for (let s = 0; s < 5; s++) {
                // 遍历数字
                let n = Math.floor(Math.random() * 5);
                while (n === 0) {
                    // 保证肯定被移动
                    n = Math.floor(Math.random() * 5);
                }
                while (n--) {
                    let temp = transformNumberShapeArray[0][s];
                    for (let i = 0; i < 6; i++) {
                        // 循环移位
                        if (i !== 5) {
                            transformNumberShapeArray[i][s] =
                                transformNumberShapeArray[i + 1][s];
                        } else {
                            transformNumberShapeArray[5][s] = temp;
                        }
                    }
                }
            }

            return transformNumberShapeArray;
        }
    }

    /**
     * 获取6位随机数字
     */
    getRandomNumberArray() {
        let arr = [];
        for (let i = 0; i < 6; i++) {
            let n = Math.floor(10 * Math.random());
            arr.push(n);
        }
        return arr;
    }

    drawNumber(context, number, index) {
        context.beginPath();
        // 每个字在canvas的偏移量
        let offsetWidth = index * (this.WIDTH + this.LINE_WIDTH + 50);

        if (number[0][0]) {
            context.moveTo(offsetWidth, 0);
            context.lineTo(offsetWidth + this.WIDTH, 0);
        }
        if (number[1][0]) {
            context.moveTo(offsetWidth, 0);
            context.lineTo(offsetWidth, this.WIDTH);
        }
        if (number[1][1]) {
            context.moveTo(offsetWidth + this.WIDTH, 0);
            context.lineTo(offsetWidth + this.WIDTH, this.WIDTH);
        }
        if (number[2][0]) {
            context.moveTo(offsetWidth, this.WIDTH);
            context.lineTo(offsetWidth + this.WIDTH, this.WIDTH);
        }
        if (number[3][0]) {
            context.moveTo(offsetWidth, this.WIDTH);
            context.lineTo(offsetWidth, 2 * this.WIDTH);
        }
        if (number[3][1]) {
            context.moveTo(offsetWidth + this.WIDTH, this.WIDTH);
            context.lineTo(offsetWidth + this.WIDTH, 2 * this.WIDTH);
        }
        if (number[4][0]) {
            context.moveTo(offsetWidth, 2 * this.WIDTH);
            context.lineTo(offsetWidth + this.WIDTH, 2 * this.WIDTH);
        }

        context.stroke();
    }

    passwordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    login = () => {
        if ("" + this.state.password === this.state.currentPassword) {
            notification.open({
                message: "登录成功",
                description: "恭喜您登录成功，即将进入系统，请稍等",
                icon: <SmileOutlined style={{color: "#108ee9"}}/>
            });
            this.setState({
                isSuccess: true
            })
        } else {
            notification.open({
                message: "登录失败",
                description: "密码错误，请重试",
                icon: <ExclamationCircleOutlined style={{color: "#ff0000"}}/>
            });
        }
    };

    render() {
        let loginWindow = classnames({
            "login-window": true,
            "hidden": this.state.isSuccess
        })
        return (
            <div className="scene-locker">
                <canvas
                    id="background"
                    width={this.state.canvasWidth}
                    height={this.state.canvasHeight}
                />
                <div className={loginWindow}>
                    <Card>
                        <div style={{marginBottom: "20px", textAlign: "center"}}>
                            <Avatar size={64} icon={<UserOutlined/>}/>
                        </div>

                        <Input
                            placeholder="请输入6位密码"
                            value={this.state.password}
                            onChange={this.passwordChange}
                        />
                        <div className="login-button">
                            <Button type="primary" onClick={this.login}>
                                登录
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
