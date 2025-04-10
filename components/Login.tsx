"use client";
import React, { useState } from "react";

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = (username,password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u)=> u.username===username && u.password===password);

    if (user) {
        localStorage.setItem("currentUser",username);
        return true;
    }
    return false;

  }
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
      <div className="flex flex-col gap-4 p-4 relative bg-neutral-500 rounded-md">
        <div>
          <button onClick={onClose} className="absolute top-2 right-4">
            X
          </button>
          <h1 className="text-xl">Sign in</h1>
        </div>
        <div className="flex flex-col gap-2 text-neutral-50">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => e.target.value}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => e.target.value}
          />
        </div>

        <button className="px-3 py-2 bg-neutral-950 rounded-md hover:bg-neutral-900 transition-colors duration-100">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
