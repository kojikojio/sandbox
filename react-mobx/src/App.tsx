import React from "react";
import "./App.css";
import TodoView from "./components/TodoView";
import { Container } from "@material-ui/core";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
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
  <>
    <MyAppBar></MyAppBar>
    <Container maxWidth="sm">
      <Switch>
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
  </>
);

const App: React.FC = props => {
  const store = useStore();
  const location = useLocation();
  return useObserver(() => {
    // 認証状態の取得が終わるまではLOADINGを表示する
    if (!store.isInitialized) {
      return <Loading />;
    }
    // URLがログイン画面の場合はログイン画面を表示する
    console.log(location);
    const pathname = location.pathname;
    if (pathname.startsWith("/login")) {
      return <Login />;
    }
    // 未ログインの場合は、ログイン画面にリダイレクトする
    if (!store.user) {
      return (
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/">
            <Redirect push to={"/login?n=" + encodeURIComponent(pathname)} />
          </Route>
        </Switch>
      );
    }
    // ログイン済みの場合
    return <Loaded />;
  });
};

export default App;
