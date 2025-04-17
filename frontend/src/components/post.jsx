import React from "react";
import { Link } from "react-router-dom";
function Post({ title, summary, cover, content, createdAt, _id }) {
  const a = createdAt.split(/[TZ]/);
  const b = a[0];
  const c = a[1];
  return (
    <div className="entry">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src="https://i.pinimg.com/736x/a6/d6/f8/a6d6f8e7c4d7142e441ee95dd56cec5c.jpg" />
        </Link>
      </div>
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">david</a>
          <time>
            {b} {c}
          </time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
