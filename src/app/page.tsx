"use client";

import Link from "next/link";
import Header from "../components/header";
import { useEffect, useState } from "react";

export default function Home() {
  interface Post {
    id: string;
    title: string;
    content: string;
  }

  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        console.log("res", res);

        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setPostList(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Header />

      <ul>
        {postList.map((post) => (
          <div className="m-2 p-4 bg-gray-800" key={post.id}>
            <Link href={`/content/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </ul>
      <div className="bg-gray-800 w-48 border-2 rounded-2xl">
        <Link className="p-6" href={"/content"}>
          Add Content
        </Link>
      </div>
    </>
  );
}
