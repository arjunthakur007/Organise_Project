"use client";
import React, { useState } from "react";

const Modal = () => {
  const [card_data, setCard_Data] = useState([]);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const add_data = () => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (!loggedInUser) {
      alert("Please Sign in to add cards.");
      return;
    }

    const newCard = {
      title: title,
      subtitle: subtitle,
      image: image,
      description: description,
      userId: loggedInUser, // Add userId to card
    };

    setCard_Data((prevData) => [...prevData, newCard]);

    // Use user-specific key for localStorage
    const userCardsKey = `cards_${loggedInUser}`;
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

    console.log(newCard);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-[50vw] h-[60vh] border rounded-md p-4 gap-4">
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
