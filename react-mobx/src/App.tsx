import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import MyAppBar from "./components/MyAppBar";
import { useStore } from "./stores/StoreHelper";
import TopPage from "./components/TopPage";
import TopWithoutLogin from "./components/TopWithoutLogin";
import Loading from "./components/Loading";
import { useObserver } from "mobx-react";

const Top: React.FC = () => {
  const store = useStore();
  return useObserver(() => (
    <>{store.isLogin ? <TopPage /> : <TopWithoutLogin />}</>
  ));
};

const App: React.FC = () => {
  const store = useStore();
  return useObserver(() => (
    <>
      {store.isInitialized ? (
        <Router>
          <MyAppBar></MyAppBar>
          <Container maxWidth="sm">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/todos">
                <TodoView />
              </Route>
              <Route path="/">
                <Top />
              </Route>
            </Switch>
          </Container>
        </Router>
      ) : (
        <Loading />
      )}
    </>
  ));
};

export default App;
