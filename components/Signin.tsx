"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //getting the alreday exisiting username & password if both matches
    //if user is found then "currentuser" is set in the localstorage and returns ture
    const signinUser = (username, password) => {
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

    //finding if i.e a similar username & password
    // & if it doent exist then creating a new one
    const registerUser = (username, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find((u) => u.username === username)) {
            return false;
        }
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    };

    //when signin/register button is clicked
    //if signin is successfull - onclose() is called , user is directed to home
    const handleSigninOrRegister = () => {
        if (isRegistering) {
            if (registerUser(username, password)) {
                setErrorMessage("Registration successful!");
                setIsRegistering(false);
            } else {
                setErrorMessage("Registration failed. Username already exists.");
            }
        } else {
            if (signinUser(username, password)) {
                setErrorMessage("signin successful!");
                onClose();
                router.push("/Home");
            } else {      
                setErrorMessage("signin failed. Incorrect username or password.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser"); //for clearing the cards from the screen
        onClose();
        router.push("/Home");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center py-2 px-4">
            <div className="bg-neutral-700 border p-4 rounded-md relative text-white">
                <h1 className="text-xl">{isRegistering ? "Register" : "Signin"}</h1>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-200"
                >
                    X
                </button>
                {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
                <div className="flex flex-col gap-4 my-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-neutral-800 p-2 rounded text-white"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-neutral-800 p-2 rounded text-white"
                    />
                </div>
                <button
                    onClick={handleSigninOrRegister}
                    className="bg-blue-500 text-white p-2 rounded-md w-full"
                >
                    {isRegistering ? "Register" : "Sign in"}
                </button>
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="mt-2 text-sm text-blue-500"
                >
                    {isRegistering ? "Switch to Signin" : "Switch to Register"}
                </button>
                {localStorage.getItem("currentUser") && (
                    <button
                        onClick={handleLogout}
                        className="mt-2 text-sm text-red-500"
                    >
                        Sign out
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;