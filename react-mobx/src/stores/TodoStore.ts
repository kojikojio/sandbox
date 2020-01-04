import { observable, computed, action } from "mobx";

export class TodoStore {
  @observable todos: Todo[] = [];

  @action.bound
  addTodo(title: string) {
    this.todos.push(new Todo(title));
  }
  @action.bound
  setFinished(id: number, finished: boolean) {
    this.todos
      .filter(todo => todo.id === id)
      .forEach(todo => (todo.finished = finished));
  }

  @computed
  get unfinishedTodos() {
    return this.todos.filter(todo => !todo.finished);
  }
  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}
export class Todo {
  id = Math.random();
  @observable title = "";
  @observable finished = false;

  constructor(title: string) {
    this.title = title;
  }
}
