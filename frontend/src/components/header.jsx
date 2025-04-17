import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/notecontext.js";
function Header() {
  const { setuserInfo, userInfo } = useContext(NoteContext);

  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function Logout() {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    });
    setuserInfo(null);
  }

  // const username = userInfo.username;
  return (
    <>
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create New Post</Link>
              <button onClick={Logout}>Logout</button>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
