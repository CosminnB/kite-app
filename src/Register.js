import React, { useState } from "react";
import { useHistory } from "react-router";
import { useStore } from "./store";

function Register() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const store = useStore();
  const history = useHistory();

  const register = (e) => {
    e.preventDefault();

    const body = {
      name: user,
      email: email,
      password: password,
    };
    fetch(`${store.url}/user`, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        store.setUser(parseInt(data.id));
        localStorage.setItem("user", parseInt(data.id));
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register">
      <form className="register__form">
        <input
          type="text"
          placeholder="Username"
          className="register__user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="register__email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="register__password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="register__submit" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
