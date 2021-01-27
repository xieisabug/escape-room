import * as React from "react";
import { Button, Card, Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default class Scene1Locker extends React.Component {
  render() {
    return (
      <div className="scene-locker">
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
