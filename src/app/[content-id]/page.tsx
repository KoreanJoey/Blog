"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContentDetailView() {
  const title = "Internship log";
  const content = "Today was so fun!";

  interface Post {
    id: string;
    title: string;
    content: string;
  }

  const params = useParams();
  const postId = params["content-id"];
  const [post, setPost] = useState<Post>({id: "", title: "", content: ""});
  

  useEffect(() => {
    fetch(`/api/${postId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("error!!!");
        }
        console.log("res", resp);

        return resp.json();
      })
      .then((data) => {
        setPost(data.data);
        console.log("Get Post with Id", post);
  
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>
        <Link href={"/"}>Go back</Link>
      </div>
    </>
  );
}
