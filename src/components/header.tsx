"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [title, setTitle] = useState("Blog");
  const [author, setAuthor] = useState("Joey");

  return (
    <>
      <div className="flex flex-row gap-4 my-10 mx-4 bg-gray-700 justify-between p-2">
        <div className="flex flex-row gap-2">
          <h1>{title}</h1>
          <h2>{author}</h2>
        </div>

        <div>
          <Link href={"/auth/sign-in"}>Sign In</Link> / <Link href={"/auth/sign-up"}>Sign Up</Link>
        </div>
      </div>
    </>
  );
}
