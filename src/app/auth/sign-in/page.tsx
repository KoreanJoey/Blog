"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to sign in");
        }

        console.log(resp);

        return resp.json();
      })
      .then((data) => {
        console.log("data: ", data);

        setEmail("");
        setPassword("");
        if (data.message === "login success") {
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(`Error in sign in: ${error}`);
      });
  };

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span>Email</span>
          <input
            type="text"
            className="border-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <span>Password</span>
          <input
            type="text"
            className="border-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <button type="submit" className="border-2 bg-gray-600 p-2 mt-4">
          Sign In
        </button>
      </form>
    </>
  );
}
