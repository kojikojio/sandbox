import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Store } from "./stores/Store";
import { StoreProvider } from "./stores/StoreHelper";
import { CssBaseline } from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/firestore";
const firebaseui = require("firebaseui");
const firebaseConfig = {
  apiKey: "AIzaSyCdJzFhZaJti6jY8FRWoSH5u7iSF9I0qKI",
  authDomain: "sandbox-5d106.firebaseapp.com",
  databaseURL: "https://sandbox-5d106.firebaseio.com",
  projectId: "sandbox-5d106",
  storageBucket: "sandbox-5d106.appspot.com",
  messagingSenderId: "631189054380",
  appId: "1:631189054380:web:35cbc6171d5200fe4dd009"
};
export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", {
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID]
});

const store = new Store();
ReactDOM.render(
  <StoreProvider value={store}>
    <CssBaseline />
    <App />
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </StoreProvider>,
  document.getElementById("root")
);
(document as any).store = store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
