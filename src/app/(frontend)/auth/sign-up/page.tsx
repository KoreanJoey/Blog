"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
      body: JSON.stringify(name),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to sign up");
        }

        return resp.json();
      })
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");

        router.push("/");
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <span>Name</span>
        <input
          type="text"
          className="border-2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
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

        <button type="submit" className="border-2 bg-gray-600 p-2 mt-4">
          Sign Up
        </button>
      </form>
    </>
  );
}
