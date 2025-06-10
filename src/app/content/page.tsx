'use client'

import Link from "next/link";
import { useState } from "react";

export default function CreateContent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleTitle = ({e}: any) => {
      setTitle(e.target.value)
  }
  const handleContent = ({e}: any) => {
    setContent(e.target.value)
}

  return (
    <>
      <form action="" className="p-4">
        <div className="flex flex-col gap-2">
          <span>Title</span>
          <input type="text" className="w-44 border-2" onChange={handleTitle} value={title}/>
          <span>Content</span>
          <textarea name="" id="" className="w-128 border-2" onChange={handleContent} value={content} ></textarea>
          <div className="flex flex-row gap-2 items-center">
            <Link href={"/"} className="w-20 bg-gray-600 rounded-sm">
              Cancel
            </Link>
            <Link href={"/"} className="w-20 bg-gray-600 rounded-sm">Save</Link>
          </div>
        </div>
      </form>
    </>
  );
}
