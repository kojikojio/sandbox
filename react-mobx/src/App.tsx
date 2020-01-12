import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import MyAppBar from "./components/MyAppBar";

const App: React.FC = () => {
  return (
    <Router>
      <MyAppBar></MyAppBar>
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
