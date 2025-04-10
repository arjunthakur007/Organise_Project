"use client";
import React, { useState } from "react";

const Login = () => {

    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Track login/register mode
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", username);
      return true;
    }
    return false;
  };

  const registerUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.username === username)) {
      return false; // Username already exists
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const handleLoginOrRegister = () => {
    if (isRegistering) {
      if (registerUser(username, password)) {
        setErrorMessage("Registration successful!");
        setIsRegistering(false); // Switch to login mode after registration
      } else {
        setErrorMessage("Registration failed. Username already exists.");
      }
    } else {
      if (loginUser(username, password)) {
        setErrorMessage("Login successful!");
        // Redirect or perform other actions after login
      } else {
        setErrorMessage("Login failed. Incorrect username or password.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <div className="mb-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <button
          onClick={handleLoginOrRegister}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-2 text-sm text-blue-500"
        >
          {isRegistering ? "Switch to Login" : "Switch to Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;
