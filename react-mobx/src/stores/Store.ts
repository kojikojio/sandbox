import { observable, configure, action } from "mobx";
import { TodoStore } from "./TodoStore";
import firebase from "../firebase";

configure({
  enforceActions: "always"
});
export class Store {
  @observable isInitializing: boolean = true;
  @observable user: firebase.User | null = null;
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
      this.setInitializing(false);
    });
  }
  logout() {
    this.setInitializing(true);
    document.location.pathname = "/login";
    firebase.auth().signOut();
  }

  @action.bound
  private setInitializing(isInitializing: boolean) {
    this.isInitializing = isInitializing;
  }

  @action.bound
  private setUser(user: firebase.User | null) {
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
