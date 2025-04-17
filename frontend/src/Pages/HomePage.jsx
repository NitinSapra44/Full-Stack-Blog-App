import React from "react";
import Post from "../components/post";
import { useState } from "react";
import { useEffect } from "react";

function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
// {posts.map((post) => <Post key={post._id} {...post} />)}
export default HomePage;
