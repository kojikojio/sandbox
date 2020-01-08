import { observable, computed, action } from "mobx";
import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCdJzFhZaJti6jY8FRWoSH5u7iSF9I0qKI",
  authDomain: "sandbox-5d106.firebaseapp.com",
  databaseURL: "https://sandbox-5d106.firebaseio.com",
  projectId: "sandbox-5d106",
  storageBucket: "sandbox-5d106.appspot.com",
  messagingSenderId: "631189054380",
  appId: "1:631189054380:web:35cbc6171d5200fe4dd009"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export class TodoStore {
  @observable todos: Todo[] = [];

  listen() {
    const self = this;
    db.collection("todos").onSnapshot(function(querySnapshot) {
      const cities: Todo[] = [];
      querySnapshot.forEach(function(doc) {
        cities.push(new Todo(doc.id, doc.data().title));
      });
      console.log("Current cities in CA: ", cities.join(", "));
      self.setTodos(cities);
    });
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
