import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import NoteContext from "../context/notecontext.js";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setuserInfo, userInfo } = useContext(NoteContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setuserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong Credentials");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <>
        <form className="Login">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button onClick={login}>Login</button>
        </form>
      </>
    );
  }
}

export default LoginPage;
