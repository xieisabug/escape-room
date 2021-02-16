import React, {StrictMode} from "react";
import ReactDOM from "react-dom";
import {IdGenerator} from "./Utils";

IdGenerator.init();

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App/>
    </StrictMode>,
    rootElement
);
