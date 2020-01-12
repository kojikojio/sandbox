import { observable, computed, action } from "mobx";
import "firebase/firestore";
import { db } from "../firebase";

export class TodoStore {
  unsubscribe: () => void = () => {};
  @observable todos: Todo[] = [];

  listen() {
    const self = this;
    this.unsubscribe = db
      .collection("todos")
      .onSnapshot(function(querySnapshot) {
        const cities: Todo[] = [];
        querySnapshot.forEach(function(doc) {
          cities.push(new Todo(doc.id, doc.data().title));
        });
        console.log("Current cities in CA: ", cities.join(", "));
        self.setTodos(cities);
      });
  }
  detach() {
    this.unsubscribe();
  }

  @action.bound
  setTodos(todos: Todo[]) {
    this.todos = todos;
  }

  addTodo(title: string) {
    db.collection("todos")
      .add({
        title,
        finished: false
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
  @action.bound
  setFinished(id: string, finished: boolean) {
    this.todos
      .filter(todo => todo.id === id)
      .forEach(todo => (todo.finished = finished));
  }

  @computed
  get unfinishedTodos() {
    console.log(this.todos);
    return this.todos.filter(todo => !todo.finished);
  }
  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}
export class Todo {
  id: string = "";
  title = "";
  finished = false;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
