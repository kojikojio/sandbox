import { observable, configure, action } from "mobx";
import { TodoStore } from "./TodoStore";
import firebase from "../firebase";
import { User } from "firebase";

configure({
  enforceActions: "always"
});
export class Store {
  // Firebase auth に接続したら true になる。それ以降はずっと true
  @observable isInitialized: boolean = false;
  @observable user: User | null = null;
  @observable todoStore: TodoStore = new TodoStore();

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.todoStore.listen(user.uid);
      } else {
        this.todoStore.detach();
      }
      this.setUser(user);
      this.setInitialized(true);
    });
  }
  logout() {
    firebase.auth().signOut();
  }

  @action.bound
  private setInitialized(isInitialized: boolean) {
    this.isInitialized = isInitialized;
  }

  @action.bound
  private setUser(user: User | null) {
    this.user = user;
  }
}
/*
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
*/
