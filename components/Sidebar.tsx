"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Signin from "./Signin"; // Corrected import path

const Sidebar = () => {
  const router = useRouter();
  const [issigninModalOpen, setIsSigninModalOpen] = useState(false);

  // signin/signout functionality
  const [signedInUser, setsignedInUser] = useState(null);

  useEffect(() => {
    // Check if a user is already signed in on component mount
    const user = localStorage.getItem("currentUser");
    if (user) {
      setsignedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    // Clear signed-in user data and update state
    localStorage.removeItem("currentUser");
    setsignedInUser(null);
  };

  const sideItems = [
    {
      tiitle: "Home",
      icon: "",
      link: "/",
    },
    {
      tiitle: "Add new",
      icon: "",
      link: "/create-task",
    },
  ];

  return (
    <div className="border max-w-[30vw] h-[100vh] px-4">
      <div className="flex w-full justify-center py-4">
        <h1 className="text-xl font-bold">Organise</h1>
      </div>

      <div>
        {sideItems.map((i) => (
          <div
            key={i.tiitle} // Add key prop
            onClick={() => router.push(i.link)}
            className="mb-2 flex items-center py-2 rounded-sm hover:bg-neutral-800 transition-colors duration-200"
          >
            <span className="mr-2">{i.icon}</span>
            <span>{i.tiitle}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center mt-[50vh]">
        {signedInUser ? (
          <button
            onClick={handleLogout}
            className="border rounded-md px-4 py-2 hover:bg-neutral-800 transition-colors duration-200"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setIsSigninModalOpen(true)}
            className="border rounded-md px-4 py-2 hover:bg-neutral-800 transition-colors duration-200"
          >
            Signin
          </button>
        )}
        <Signin
          isOpen={issigninModalOpen}
          onClose={() => setIsSigninModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
