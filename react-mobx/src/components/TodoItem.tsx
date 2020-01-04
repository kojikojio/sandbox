import React from "react";
import { Todo } from "../stores/TodoStore";
import { useObserver } from "mobx-react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStore } from "../stores/StoreHelper";

type Props = {
  todo: Todo;
};
const TodoItem: React.FC<Props> = (props: Props) => {
  const todo = props.todo;
  const todoStore = useStore().todoStore;
  return useObserver(() => (
    <ListItem>
      <ListItemText primary={todo.title} />
      <ListItemSecondaryAction>
        <IconButton
          disabled={todo.finished}
          edge="end"
          aria-label="delete"
          onClick={() => todoStore.setFinished(todo.id, true)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
};
export default TodoItem;
