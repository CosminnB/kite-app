import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useStore } from "./store";
import "./Login.css";
import { Button, InputLabel, TextField } from "@material-ui/core";

function Login() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const store = useStore();

  const verifyLogin = (e) => {
    e.preventDefault();

    const body = { user, password };
    fetch(`${store.url}/login`, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/dashboard");
        store.setUser(data.userId);
        localStorage.setItem("user", data.userId);
      })
      .catch((err) => console.log("Error trying login", err));
  };
  return (
    <div className="login">
      <h1 className="login__logo">Kite</h1>
      <form className="login__form" onSubmit={(e) => verifyLogin(e)}>
        <div className="login__input">
          <InputLabel>Username</InputLabel>
          <TextField
            variant="outlined"
            required
            type="text"
            className="login__user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="login__input">
          <InputLabel>Password</InputLabel>
          <TextField
            variant="outlined"
            required
            type="password"
            className="login__password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="login__submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
      <Link to="/register">
        <p>No account? Register here.</p>
      </Link>
    </div>
  );
}

export default Login;
