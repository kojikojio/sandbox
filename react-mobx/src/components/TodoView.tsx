import React, { useState } from "react";
import { useObserver } from "mobx-react";
import { useStore } from "../stores/StoreHelper";
import TodoItem from "./TodoItem";
import { List, TextField, Button, FormControl } from "@material-ui/core";

const TodoView = () => {
  const store = useStore();
  const todoStore = store.todoStore;
  const [title, setTitle] = useState("");
  return useObserver(() => (
    <div>
      <FormControl fullWidth>
        <TextField
          label="タイトル"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <Button
          variant="contained"
          color="primary"
          disabled={title.trim() === ""}
          onClick={() => {
            todoStore.addTodo(title);
            setTitle("");
          }}
        >
          追加
        </Button>
      </FormControl>
      <List component="nav" aria-label="secondary mailbox folders">
        {todoStore.unfinishedTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </div>
  ));
};
export default TodoView;
