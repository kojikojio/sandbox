import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
      <Container maxWidth="sm">
        <Switch>
          <Route path="/todos">
            <TodoView />
          </Route>
        </Switch>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </Container>
    </Router>
  );
};

export default App;
