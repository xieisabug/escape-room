import * as React from "react";
import { Button, Card, Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default class Scene1Locker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight
    };
  }

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

    const LINE_WIDTH = 10;
    const WIDTH = window.innerHeight / 2 - LINE_WIDTH / 2;

    let context = document.getElementById("background").getContext("2d");
    context.lineWidth = LINE_WIDTH;

    let number = numberShapeArray[2];

    context.beginPath();
    if (number[0][0]) {
      context.moveTo(0, 0);
      context.lineTo(WIDTH, 0);
    }
    if (number[1][0]) {
      context.moveTo(0, 0);
      context.lineTo(0, WIDTH);
    }
    if (number[1][1]) {
      context.moveTo(WIDTH, 0);
      context.lineTo(WIDTH, WIDTH);
    }
    if (number[2][0]) {
      context.moveTo(0, WIDTH);
      context.lineTo(WIDTH, WIDTH);
    }
    if (number[3][0]) {
      context.moveTo(0, WIDTH);
      context.lineTo(0, 2 * WIDTH);
    }
    if (number[3][1]) {
      context.moveTo(WIDTH, WIDTH);
      context.lineTo(WIDTH, 2 * WIDTH);
    }
    if (number[4][0]) {
      context.moveTo(0, 2 * WIDTH);
      context.lineTo(WIDTH, 2 * WIDTH);
    }

    context.stroke();
  }

  render() {
    return (
      <div className="scene-locker">
        <canvas
          id="background"
          width={this.state.canvasWidth}
          height={this.state.canvasHeight}
        />
        <div className="login-window">
          <Card>
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>

            <Input placeholder="请输入密码" />
            <div className="login-button">
              <Button type="primary">登录</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
