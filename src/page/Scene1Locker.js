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

  // 画笔宽度
  LINE_WIDTH = 10;
  // 一笔的长度
  WIDTH = window.innerHeight / 2;

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
    console.log(numberArray);

    let transformNumberArray = this.trasformNumberArray(
      numberArray.map((i) => numberShapeArray[i])
    );

    transformNumberArray.forEach((i, index) => {
      this.drawNumber(context, i, index);
    });
  }

  /**
   * 数字移位
   */
  trasformNumberArray(numberShapeArray) {
    // 数字的5个部分，分开移位
    for (let i = 0; i < 5; i++) {
      // 移动多少次，没必要超过5次，超过5次之会增加效率开销
      let n = Math.floor(Math.random() * 5);
      while (n--) {
        // 循环移位
        let temp = numberShapeArray[i][0];
        for (let j = 0; j < numberShapeArray[i].length; j++) {
          if (j !== numberShapeArray[i].length - 1) {
            numberShapeArray[i][j] = numberShapeArray[i][j + 1];
          } else {
            numberShapeArray[i][j] = temp;
          }
        }
      }
    }
    return numberShapeArray;
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
    let offsetWidth = index * this.WIDTH + index * (this.LINE_WIDTH + 50);
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

            <Input placeholder="请输入6位密码" />
            <div className="login-button">
              <Button type="primary">登录</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
