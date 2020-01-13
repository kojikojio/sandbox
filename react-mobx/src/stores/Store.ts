import { observable, configure, action } from "mobx";
import { TodoStore } from "./TodoStore";
import firebase from "../firebase";

configure({
  enforceActions: "always"
});
export class Store {
  // Firebase auth に接続したら true になる。それ以降はずっと true
  @observable isInitialized: boolean = false;
  @observable isLogin: boolean = false;
  @observable todoStore: TodoStore = new TodoStore();

  constructor() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      self.setInitialized(true);
      if (user) {
        self.setLogin(true);
      } else {
        self.setLogin(false);
        self.todoStore.detach();
      }
    });

    this.todoStore.listen();
  }
  logout() {
    firebase.auth().signOut();
  }

  @action.bound
  private setInitialized(isInitialized: boolean) {
    this.isInitialized = isInitialized;
  }

  @action.bound
  private setLogin(isLogin: boolean) {
    console.log("SET", isLogin);
    this.isLogin = isLogin;
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
