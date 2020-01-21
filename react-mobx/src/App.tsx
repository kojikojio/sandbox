import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./components/Login";
import MyAppBar from "./components/MyAppBar";
import { useStore } from "./stores/StoreHelper";
import TopPage from "./components/TopPage";
import TopWithoutLogin from "./components/TopWithoutLogin";
import Loading from "./components/Loading";
import { useObserver } from "mobx-react";
import Profile from "./components/Profile";

const Top: React.FC = () => {
  const store = useStore();
  return useObserver(() => (
    <>{store.user ? <TopPage /> : <TopWithoutLogin />}</>
  ));
};

const Loaded = () => (
  <Router>
    <MyAppBar></MyAppBar>
    <Container maxWidth="sm">
      <Switch>
        <Route path="/login">
          <Redirect to={"/"} />
        </Route>
        <Route path="/todos">
          <TodoView />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Top />
        </Route>
      </Switch>
    </Container>
  </Router>
);

const App: React.FC = props => {
  const store = useStore();
  return useObserver(() => {
    // 認証状態の取得が終わるまではLOADINGを表示する
    if (!store.isInitialized) {
      return <Loading />;
    }
    // 未ログインの場合は、ログイン画面にリダイレクトする
    if (!store.user) {
      const next = encodeURIComponent(document.location.pathname);
      console.log(document.location.pathname);
      return (
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Redirect to={"/login"} />
            </Route>
            <Route path="/">
              <Redirect to={"/login?n=" + next} />
            </Route>
          </Switch>
        </Router>
      );
    }
    // ログイン済みの場合
    return <Loaded />;
  });
};

export default App;
