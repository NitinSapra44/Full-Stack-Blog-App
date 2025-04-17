import "./App.css";
import Post from "./components/post.jsx";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import NoteState from "./context/notestate.js";

import Createpost from "./Pages/createPost.jsx";
import PostPage from "./Pages/PostPage.jsx";

const App = () => {
  return (
    <NoteState>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/create"} element={<Createpost />} />
          <Route path={"/post/:id"} element={<PostPage />}></Route>
        </Route>
      </Routes>
    </NoteState>
  );
};

export default App;
