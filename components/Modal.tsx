"use client";
import React, { useState } from "react";

const Modal = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const add_data = () => {
    const signedInUser = localStorage.getItem("currentUser");
    if (!signedInUser) {
      alert("Please Sign in to add cards.");
      return;
    }

    const newCard = {
      id: Date.now(),
      title: title,
      subtitle: subtitle,
      image: image,
      description: description,
      userId: signedInUser,
    };

    const userCardsKey = `cards_${signedInUser}`;
    const existingCards = JSON.parse(
      localStorage.getItem(userCardsKey) || "[]"
    );
    localStorage.setItem(
      userCardsKey,
      JSON.stringify([...existingCards, newCard])
    );

    setTitle("");
    setSubtitle("");
    setDescription("");
    setImage("");
  };

  return (
    <div className=" w-screen p-4 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full border flex flex-col rounded-md p-4 gap-4">
        {/* Input fields... */}
        <div className="border rounded-md p-2">
          <input
            value={image}
            type="text"
            placeholder="Image URL"
            className="w-full"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="border rounded-md p-2">
          <input
            value={title}
            type="text"
            placeholder="Title"
            className="w-full"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="border rounded-md p-2">
          <input
            value={subtitle}
            type="text"
            placeholder="Subtitle"
            className="w-full"
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="h-full border rounded-md p-2">
          <textarea
            value={description}
            placeholder="Description"
            className="h-full w-full"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={add_data}
          className="border rounded-md p-2 bg-neutral-900 hover:bg-neutral-700 transition-colors duration-150"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Modal;