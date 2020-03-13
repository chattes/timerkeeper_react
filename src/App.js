import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Summary from "./Components/Summary/Summary";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/summary">
          <Summary />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
}

export default App;
