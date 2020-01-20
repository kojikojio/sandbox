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
          <Login />
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
    if (!store.isInitialized) {
      return <Loading />;
    }
    if (!store.user) {
      const next = encodeURIComponent(document.location.pathname);
      return (
        <Router>
          <Route path="/login">
            <Login />
          </Route>
          <Redirect to={"/login?n=" + next} />
        </Router>
      );
    }
    return <Loaded />;
  });
};

export default App;
