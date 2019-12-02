import React from "react";
import Workouts from "./pages/Workouts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Workouts} />
          <Route exact path="/workouts/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;