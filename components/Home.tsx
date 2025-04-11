"use client";
import React, { useEffect, useState } from "react";

export const Home = () => {
    const [card_data, setCard_Data] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        setLoggedInUser(user);
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            const userCardsKey = `cards_${loggedInUser}`;
            const storedData = localStorage.getItem(userCardsKey);

            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    setCard_Data(parsedData);
                } catch (error) {
                    console.error("Error parsing card data from localStorage:", error);
                }
            } else {
                setCard_Data([]); // Clear cards if no data for the user
            }
        } else {
            setCard_Data([]); // Clear cards if no user logged in.
        }
    }, [loggedInUser]);

    console.log(card_data);

    return (
        <>
            {card_data.length > 0 && (
                <div className="flex px-4 py-4">
                    {card_data.map((i, index) => (
                        <div
                            key={index}
                            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                        >
                            <a href="#">
                                <img className="rounded-t-lg" src={i.image} alt={i.title} />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {i.title}
                                    </h5>
                                </a>
                                <h4 className="mb-2 text-xl font-medium tracking-tight text-gray-700 dark:text-white">
                                    {i.subtitle}
                                </h4>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {i.description}
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Edit
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Home;