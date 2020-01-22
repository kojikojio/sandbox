import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Store } from "./stores/Store";
import { StoreProvider } from "./stores/StoreHelper";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

const store = new Store();
ReactDOM.render(
  <StoreProvider value={store}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);
(document as any).store = store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
