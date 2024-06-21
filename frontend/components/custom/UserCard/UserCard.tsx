"use client";
import React, { useEffect, useState } from "react";
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
      <h2 className="text-2xl font-bold">
        {userData?.name} {userData?.surname}
      </h2>

      <button
        className="text-white px-4 py-1 rounded mt-2"
        style={{ backgroundColor: "#7287FD" }}
        onClick={() => openModal(userData)}
      >
        Account settings
      </button>
      <hr
        style={{
          border: 0,
          height: 2,
          backgroundColor: "#9399B2",
          marginTop: 10,
        }}
      />
      <div className="mt-2" style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ color: "#A6ADC8" }} className="mr-1 text-2xl">
          Balance:
        </p>
        <p className="mr-1 text-xl font-bold mt-1">${userData?.balance}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ color: "#A6ADC8" }}>Cash Available:</p>
        <p style={{ marginLeft: 5, color: "#585B70" }}>${userData?.balance}</p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          className=" text-white px-4 py-1 rounded"
          style={{ backgroundColor: "#7287FD" }}
          onClick={fetchStripePublic}
        >
          Deposit
        </button>
        <button
          className="text-white px-4 py-1 rounded"
          style={{ backgroundColor: "#7287FD" }}
        >
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
