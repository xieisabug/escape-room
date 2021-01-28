import "./styles.css";
import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Scene1Locker from "./page/Scene1Locker";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Scene1Locker />
        </Route>
        <Route path="/about">
          <span>1</span>
        </Route>
      </Switch>
    </Router>
  );
}
