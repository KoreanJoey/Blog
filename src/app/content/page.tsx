"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateContent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const disableSaveButton = () => {
    if (!title.trim() || !content.trim()) {
      return true;
    } else return false;
  };

  const cancelAndBackHome = () => {
    setTitle("");
    setContent("");
    router.push("/");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const post = {
      title,
      content,
    };

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-type": "applicaiton/json",
      },
      body: JSON.stringify(post),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("error!!!");
        }
        console.log("res", resp);

        return resp.json();
      })
      .then((data) => {
        console.log("DEBUG: ", data);

        console.log("SUCCESS");
        setTitle("");
        setContent("");
        router.push("/");
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-col gap-2">
          <span>Title</span>
          <input
            type="text"
            className="w-44 border-2"
            onChange={handleTitle}
            value={title}
          />
          <span>Content</span>
          <textarea
            name=""
            id=""
            className="w-128 border-2"
            onChange={handleContent}
            value={content}
          ></textarea>
          <div className="flex flex-row gap-2 items-center">
            <button
              className="w-20 bg-gray-600 rounded-sm"
              onClick={() => {
                cancelAndBackHome();
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-20 ${
                disableSaveButton()
                  ? "bg-red-300"
                  : "bg-gray-600 cursor-pointer"
              } rounded-sm`}
              disabled={disableSaveButton()}
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
