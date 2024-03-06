import React, { useEffect } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  useEffect(() => {
    const response = fetch("/post").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
      });
    });
  },[]);
  return (
    <>
      <Post />
      <Post />
      <Post />
    </>
  );
};

export default IndexPage;
