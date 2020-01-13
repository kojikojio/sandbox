import React, { useState } from "react";
import { useObserver } from "mobx-react";
import { useStore } from "../stores/StoreHelper";
import TodoItem from "./TodoItem";
import { List, TextField, Button, Grid, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const TodoView = () => {
  const store = useStore();
  const todoStore = store.todoStore;
  const [title, setTitle] = useState("");
  function isSubmitEnabled(): boolean {
    return title.trim() !== "";
  }
  function submit(): void {
    if (!isSubmitEnabled()) {
      return;
    }
    todoStore.addTodo(title);
    setTitle("");
  }
  return useObserver(() => (
    <>
      {!store.user ? <Redirect to={"/"} /> : ""}
      <Typography variant="h6" gutterBottom>
        TODO
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Input TODO text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                submit();
              }
            }}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={!isSubmitEnabled()}
            onClick={() => submit()}
            fullWidth
          >
            ADD TODO
          </Button>
        </Grid>
      </Grid>
      <List component="nav" aria-label="secondary mailbox folders">
        {todoStore.unfinishedTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </>
  ));
};
export default TodoView;
