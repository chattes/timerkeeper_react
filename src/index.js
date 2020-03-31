import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import { TaskStore } from "./Store/GlobalStore";
import { Provider } from "mobx-react";
import "./fonts/digital-7.ttf";

ReactDOM.render(
  <Provider taskStore={TaskStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
