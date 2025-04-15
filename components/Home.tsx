"use client";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const [card_data, setCard_Data] = useState([]);
  const [signedInUser, setsignedInUser] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setsignedInUser(user);
  }, []);

  useEffect(() => {
    if (signedInUser) {
      const userCardsKey = `cards_${signedInUser}`;
      const storedData = localStorage.getItem(userCardsKey);

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setCard_Data(parsedData);
        } catch (error) {
          console.error("Error parsing card data from localStorage:", error);
        }
      } else {
        setCard_Data([]);
      }
    } else {
      setCard_Data([]);
    }
  }, [signedInUser]);

  const deleteCard = (id) => {
    const updatedCards = card_data.filter((card) => card.id !== id);
    setCard_Data(updatedCards);
    localStorage.setItem(`cards_${signedInUser}`, JSON.stringify(updatedCards));
  };

  const handleEdit = (card) => {
    setEditingCardId(card.id);
    setEditedData({ ...card });
  };

  const handleSave = (id) => {
    const updatedCards = card_data.map((card) =>
      card.id === id ? { ...editedData } : card
    );
    setCard_Data(updatedCards);
    localStorage.setItem(`cards_${signedInUser}`, JSON.stringify(updatedCards));
    setEditingCardId(null);
  };

  const handleCancel = () => {
    setEditingCardId(null);
  };

  return (
    <>
      {card_data.length > 0 && (
        <div className="w-[80vw] p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {card_data.map((card) => (
            <div
              key={card.id}
              className="flex mr-4 min-w-[20vw] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              {editingCardId === card.id ? (
                <div className="p-5 overflow-y-auto min-h-[200px]">
                  <input
                    value={editedData.title}
                    onChange={(e) =>
                      setEditedData({ ...editedData, title: e.target.value })
                    }
                    className="w-full mb-2 border rounded p-1"
                  />
                  <input
                    value={editedData.subtitle}
                    onChange={(e) =>
                      setEditedData({ ...editedData, subtitle: e.target.value })
                    }
                    className="w-full mb-2 border rounded p-1"
                  />
                  <textarea
                    value={editedData.description}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        description: e.target.value,
                      })
                    }
                    className="flex w-full mb-2 border rounded p-1"
                  />
                  <input
                    value={editedData.image}
                    onChange={(e) =>
                      setEditedData({ ...editedData, image: e.target.value })
                    }
                    className="w-full mb-2 border rounded p-1"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleSave(card.id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 overflow-y-auto min-h-[200px]">
                  <a href="#">
                    <img
                      className="rounded-t-lg w-full"
                      src={card.image}
                      alt={card.title}
                    />
                  </a>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words">
                      {card.title}
                    </h5>
                  </a>
                  <h4 className="mb-2 text-xl font-medium tracking-tight text-gray-700 dark:text-white break-words">
                    {card.subtitle}
                  </h4>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
                    {card.description}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(card)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
