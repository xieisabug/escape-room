import * as React from "react";
import Desktop from "../components/Desktop";
import Window from "../components/Window";

export default class Scene2Desktop extends React.Component {
  render() {
    return <div className="scene-desktop1">
      <Desktop />
      <Window />
    </div>
  }
}