"use client";
import React from "react";
import { useUser } from "@/hooks/useUser";

// components/UserCard/UserCard.tsx

const UserCard: React.FC = () => {
  return (
    <div className="user-card bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Gabriel Coradini</h2>
      <p>Account settings</p>
      <p>Balance: $12,303.43</p>
      <p>Cash Available: $3,103.43</p>
      <div className="flex space-x-2 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
      </div>
    </div>
  );
};

export default UserCard;
