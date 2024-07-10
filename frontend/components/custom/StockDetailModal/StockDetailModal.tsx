import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
}

function StockDetailModal({ isOpen, onClose, stock }: StockDetailModalProps) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (!isOpen) return; 

    async function fetchData() {
      try {
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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, [isOpen]);

  const handleBuy = () => {
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
        side: "buy",
        type: "market",
        time_in_force: "day",
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Order placed successfully");
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{stock.name}</h2>
          <button onClick={onClose} className="text-red-500">
            X
          </button>
        </div>
        <p className="text-gray-500">{stock.symbol}</p>
        {/* <p className="text-gray-500">${stock.price.toFixed(2)}</p> */}
        {/* <p className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
          {stock.change >= 0
            ? `+${stock.change.toFixed(2)}`
            : stock.change.toFixed(2)}
          %
        </p> */}
        {/* <p className="text-gray-500">Market Cap: {stock.marketCap}</p>
        <p className="text-gray-500">Revenue: {stock.revenue}</p>
        <p className="text-gray-500">Volume: {stock.volume}</p>
        <p className="text-gray-500">Founded: {stock.founded}</p>
        <p className="text-gray-500">Industry: {stock.industry}</p> */}
        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded mt-4"
        />
        <button
          onClick={handleBuy}
          className="bg-blue-500 text-white p-2 rounded w-full mt-4"
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default StockDetailModal;
