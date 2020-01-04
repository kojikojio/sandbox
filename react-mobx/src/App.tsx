import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container, Typography } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography component="h1">TODOアプリ</Typography>
      <TodoView />
    </Container>
  );
};

export default App;
