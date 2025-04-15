"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Signin from "./Signin";

const Sidebar = () => {
  const router = useRouter();
  const [issigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [signedInUser, setsignedInUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setsignedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setsignedInUser(null);
  };

  const sideItems = [
    { tiitle: "Home", icon: "", link: "/" },
    { tiitle: "Add new", icon: "", link: "/create-task" },
  ];

  return (
    <div className="fixed border max-w-[30vw] h-[100vh] px-4">
      {" "}
      {/* Added 'fixed' class */}
      <div className="flex w-full justify-center py-4">
        <h1 className="text-xl font-bold">Organise</h1>
      </div>
      <div>
        {sideItems.map((i) => (
          <div
            key={i.tiitle}
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
