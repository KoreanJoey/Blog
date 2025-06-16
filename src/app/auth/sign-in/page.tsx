"use client"

import { useRouter } from "next/navigation";

export default function SignIn() {

    const router = useRouter();

    return (<>
    <h1>Sign In</h1>
    <div className="flex flex-col">
        <span>Email</span>
        <input type="text" className="border-2"></input>
        <span>Password</span>
        <input type="text" className="border-2"></input>
    </div>

    <button onClick={() => {router.push("/")}} className="border-2 bg-gray-600 p-2 mt-4">
        Sign In
    </button>
    </>);
};
