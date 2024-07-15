"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "../Modal/Modal";
import { IoLogOutOutline } from "react-icons/io5";

function UserCard({ userData, updateCount }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const openModal = (userData: any) => {
    setSelectedUser(userData);
    setIsModalOpen(true);
  };

  function formatNumber(value: number) {
    if (isNaN(value)) {
      return "0.00";
    }
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="user-card bg-white rounded shadow flex flex-col border-2 border-solid border-lavender p-4 dark:bg-foregroundDark">
    

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
        <p className="mr-1 text-xl font-bold mt-1">
          ${formatNumber(userData?.balance)}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ color: "#A6ADC8" }}>Cash Available:</p>
        <p style={{ marginLeft: 5, color: "#585B70" }}>
          ${formatNumber(userData?.balance)}
        </p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          className="text-white px-4 py-1 rounded"
          style={{ backgroundColor: "#7287FD" }}
        >
          Deposit
        </button>
        <button
          className="text-white px-4 py-1 rounded"
          style={{ backgroundColor: "#7287FD" }}
        >
          Withdraw
        </button>
        <button
          onClick={() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }).then(() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            });
          }}
        >
          <IoLogOutOutline size={30} />
        </button>
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
