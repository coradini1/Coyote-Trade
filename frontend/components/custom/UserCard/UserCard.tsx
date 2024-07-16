import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoLogOutOutline } from "react-icons/io5";
import Modal from "../Modal/Modal";

function UserCard({ userData, updateCount }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
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

  const handleDeposit = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: depositAmount }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.error("Failed to deposit");
        throw new Error("Deposit failed");
      }
      const updatedUserData = await response.json();
      setSelectedUser(updatedUserData);
      setIsModalOpen(false);
      setDepositAmount(0);
      toast.success("Deposit successful");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };

  const handleLogout = () => {
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
  };

  return (
    <div className="user-card bg-white rounded shadow flex flex-col border-2 border-solid border-lavender p-4 dark:bg-foregroundDark">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {userData?.name} {userData?.surname}
        </h2>
        <button onClick={handleLogout}>
          <IoLogOutOutline size={30} />
        </button>
      </div>
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
        <input
          className="border-2 border-solid border-lavender p-2 rounded"
          type="text"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
        />

        <button
          className="text-white px-4 py-1 rounded"
          style={{ backgroundColor: "#7287FD" }}
          onClick={handleDeposit}
        >
          Deposit
        </button>
        <button
          className="text-white px-4 py-1 rounded"
          style={{ backgroundColor: "#7287FD" }}
        >
          Withdraw
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
