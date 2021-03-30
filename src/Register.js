import { Button, InputLabel, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useStore } from "./store";
import "./Register.css";
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
      <h1 className="register__logo">Kite</h1>
      <form className="register__form" onSubmit={(e) => register(e)}>
        <div className="register__input">
          <InputLabel>Username</InputLabel>
          <TextField
            variant="outlined"
            required
            type="text"
            className="register__user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          ></TextField>
        </div>
        <div className="register__input">
          <InputLabel>Email</InputLabel>
          <TextField
            variant="outlined"
            required
            type="email"
            className="register__email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </div>
        <div className="register__input">
          <InputLabel>Password</InputLabel>
          <TextField
            variant="outlined"
            required
            type="password"
            className="register__password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </div>
        <Button
          type="submit"
          className="register__submit"
          color="primary"
          variant="contained"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
