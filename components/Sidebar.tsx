"use client";
import { useRouter } from "next/navigation"; //router 
import React from "react";
import Login from "./Login";

const Sidebar = () => {
  
    const router = useRouter() //var  of use router

  const sideItems = [
    {
      tiitle: "Home",
      icon: "",
      link: "/",
    },
    {
      tiitle: "Tasks",
      icon: "",
      link: "/",
    },
    {
      tiitle: "Add new",
      icon: "",
      link: "/create-task", //link
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
          onClick={()=> router.push(i.link)}
          className="mb-2 flex items-center py-2 rounded-sm hover:bg-neutral-800 transition-colors duration-200">
            <span className="mr-2">{i.icon}</span>
            <span>{i.tiitle}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center mt-[50vh]">
            <button 
            onClick={Login}
            className="border rounded-md px-4 py-2 hover:bg-neutral-800 transition-colors duration-200">
              Log in</button>
      </div>


    </div>

  );
};

export default Sidebar;
