'use client'

import { useState } from "react";

export default function Header() {
    const [title, setTitle] = useState("Blog")
    const [author, setAuthor] = useState("Joey")

    return (<>
    <div className="flex flex-row gap-4 w-full my-10 mx-4 bg-gray-700">
       <h1>{title}</h1>
       <h2>{author}</h2>
    </div>
    </>);
};
