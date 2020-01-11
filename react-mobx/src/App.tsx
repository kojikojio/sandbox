import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
      <Container maxWidth="sm">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/todos">
            <TodoView />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
