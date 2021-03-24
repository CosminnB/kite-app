import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useStore } from "./store";

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
        console.log(data);
      })
      .catch((err) => console.log("Error trying login", err));
  };
  return (
    <div className="login">
      <form className="login__form">
        <input
          type="text"
          placeholder="Username"
          className="login__user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login__password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login__submit" onClick={verifyLogin}>
          Login
        </button>
      </form>
      <Link to="/register">
        <p>No account? Register here.</p>
      </Link>
    </div>
  );
}

export default Login;
