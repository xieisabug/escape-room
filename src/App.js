import "./styles/styles.css";
import "./styles/components.css";
import "antd/dist/antd.css";
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Scene1Locker from "./page/Scene1Locker";
import Scene2Desktop from "./page/Scene2Desktop";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Scene1Locker/>
                </Route>
                <Route path="/desktop">
                    <Scene2Desktop/>
                </Route>
            </Switch>
        </Router>
    );
}
