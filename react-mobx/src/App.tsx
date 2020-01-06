import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <TodoView />
    </Container>
  );
};

export default App;
