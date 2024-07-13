import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface StockDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: {
    name: string;
    symbol: string;
    price: number;
    change: number;
    marketCap: string;
    revenue: string;
    volume: string;
    founded: number;
    industry: string;
  };
  userShares: any;
  closeSearchModal: () => void;
  user: any;
  setUser: (user: any) => void;
}

function StockDetailModal({
  isOpen,
  onClose,
  stock,
  userShares,
  closeSearchModal,
  user,
  setUser,
}: StockDetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const userData = await response.json();

      if (
        (userData?.user?.role !== "admin" && userData?.user?.role !== "user") ||
        !userData
      ) {
        return (window.location.href = "/login");
      }
      setUser(userData.user);
    }

    fetchData();
  }, [isOpen]);

  const handleOrder = (side: "buy" | "sell") => {
    const token = Cookies.get("token");
    const quantity = Number(
      (document.querySelector("input[type=number]") as HTMLInputElement).value
    );

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        symbol: stock.symbol,
        qty: quantity,
        side,
        type: "market",
        time_in_force: "day",
      }),
    }).then(async (res) => {
      if (res.ok) {
        const updatedUserResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const updatedUserData = await updatedUserResponse.json();
        setUser(updatedUserData.user);

        toast.success("Order placed successfully");
        setTimeout(() => {
          closeSearchModal();
          onClose();
        }, 3000);
      }
      if(res.status === 400) {
        toast.error("Insufficient balance");
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{stock.name}</h2>
          <button onClick={onClose} className="text-red-500">
            <AiOutlineClose />
          </button>
        </div>
        <p className="text-gray-500">{stock.symbol}</p>
        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded mt-4"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleOrder("buy")}
            className="text-white p-2 rounded w-full mr-2"
            style={{ backgroundColor: "#7287FD" }}
          >
            Buy
          </button>

          {userShares && (
            <button
              onClick={() => handleOrder("sell")}
              className="p-2 rounded w-full ml-2"
              style={{
                backgroundColor: "#FF4C4C",
                color: "white",
                cursor: userShares.quantity > 0 ? "pointer" : "not-allowed",
              }}
              disabled={userShares.quantity <= 0}
            >
              Sell
            </button>
          )}
        </div>
        {userShares && (
          <p className="mt-4 text-gray-500 text-center">
            Your shares: {userShares.quantity}
          </p>
        )}
        <p className="mt-4 text-gray-500 text-center">
          Your balance: ${user?.balance}
        </p>
      </div>
    </div>
  );
}

export default StockDetailModal;
