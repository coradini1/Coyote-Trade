"use client";
import React, { use, useEffect, useState } from "react";
import Modal from "../Modal/Modal";

function UserCard({ userData }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {}, [userData]);

  const fetchStripePublic = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stripe`
    );
    const data = await response.json();
    console.log(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const openModal = (userData: any) => {
    console.log(userData);
    setSelectedUser(userData);
    setIsModalOpen(true);
  };

  return (
    <div className="user-card bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">
        {userData?.name} {userData?.surname}
      </h2>

      <button
        className="bg-purple-500 text-white px-2 py-1 rounded"
        onClick={() => openModal(userData)}
      >
        Account settings
      </button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ marginRight: 5}}>Balance :</p>
        <p className="text-lg font-bold">${userData?.balance}</p>
      </div>
      <p>Cash Available: ${userData?.balance}</p>
      <div className="flex space-x-2 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchStripePublic}
        >
          Deposit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Withdraw
        </button>
        <h1
          onClick={() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }).then(() => {
              window.location.href = "/login";
            });
          }}
          className="cursor-pointer rounded-md border-2 border-solid border-red-700 px-6 py-3 font-medium text-red-700 transition-all duration-200 ease-out hover:bg-red-700 hover:text-white dark:text-textBaseDark"
        >
          Log out
        </h1>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            userData={selectedUser}
          />
        )}
      </div>
    </div>
  );
}

export default UserCard;
