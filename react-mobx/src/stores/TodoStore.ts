import { observable, computed, action } from "mobx";
import "firebase/firestore";
import { db } from "../firebase";

export class TodoStore {
  uid: string | undefined = undefined;
  unsubscribe: () => void = () => {};
  @observable todos: Todo[] = [];

  listen(uid: string) {
    this.uid = uid;
    this.unsubscribe = db
      .collection("accounts")
      .doc(uid)
      .collection("todos")
      .onSnapshot(querySnapshot => {
        const todos: Todo[] = [];
        querySnapshot.forEach(function(doc) {
          todos.push(new Todo(doc.id, doc.data().title, doc.data().finished));
        });
        this.setTodos(todos);
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
    db.collection("accounts")
      .doc(this.uid)
      .collection("todos")
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
    console.log(this.uid, id, finished);
    db.collection("accounts")
      .doc(this.uid)
      .collection("todos")
      .doc(id)
      .update({ finished })
      .then(() => {
        console.log("Document updated");
      })
      .catch(function(error) {
        console.error("Error update document: ", error);
      });
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

  constructor(id: string, title: string, finished: boolean) {
    this.id = id;
    this.title = title;
    this.finished = finished;
  }
}
