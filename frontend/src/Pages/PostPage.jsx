import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        console.log(postInfo.cover);
      });
    });
  }, []);

  // function info() {
  //   console.log(postInfo.cover);
  // }

  if (!postInfo) return <div>loading...</div>;

  return (
    <div>
      <img src={`http://localhost:5000/${postInfo.cover}`} alt="..." />
      <h1>{postInfo.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
    </div>
  );
}

export default PostPage;
