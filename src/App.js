import { observer } from "mobx-react-lite";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import { useStore } from "./store";

const App = observer(() => {
  const store = useStore();
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          {store.user ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        {/* redirect access if user logged in */}
        <Route path="/register">
          {store.user ? <Redirect to="/dashboard" /> : <Register />}
        </Route>
        {/* redirect access if user logged in, here is the login page */}
        <Route path="/">
          {store.user ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
});

export default App;
