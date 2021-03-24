import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import { KiteStore, StoreProvider } from "./store";

function App() {
  const store = new KiteStore();
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        {/* redirect access if user logged in */}
        <Route path="/register">
          <Register />
        </Route>
        {/* redirect access if user logged in, here is the login page */}
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
