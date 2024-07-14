import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Ring } from "@uiball/loaders";

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
  const [loading, setLoading] = useState<"buy" | "sell" | null>(null);
  const symbol = stock.symbol;
  const [stockPrices, setStockPrices] = useState<any>();
  const [stockQuantity, setStockQuantity] = useState<number>(1);
  const [inputError, setInputError] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<string>("");

  useEffect(() => {
    if (stockQuantity < 1) {
      setInputError(true);
      setErrorInput("Quantity must be greater than 0");
    } else if (loading === "buy" && stockQuantity * stockPrices > user?.balance) {
      setInputError(true);
      setErrorInput("Insufficient balance");
    } else if (loading === "sell" && stockQuantity > userShares.quantity) {
      setInputError(true);
      setErrorInput("Insufficient shares");
    } else {
      setInputError(false);
    }
  }, [stockQuantity, stockPrices, loading, user, userShares]);

  useEffect(() => {
    if (!isOpen) return;
    async function fetchStockPrice() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/assets/get-stock-price/${symbol}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const stockPrice = await response.json();
      setStockPrices(stockPrice.data);
      console.log(stockPrice);
    }
    fetchStockPrice();
  }, [isOpen]);

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
    setLoading(side);
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
        symbol: symbol,
        qty: quantity,
        side,
        type: "market",
        time_in_force: "day",
      }),
    }).then(async (res) => {
      setLoading(null);
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
          window.location.reload();
        }, 3000);
      }
      if (res.status === 400) {
        const responseData = await res.json();
        const response = responseData.message;
        toast.error(response);
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
          onChange={(e) => setStockQuantity(Number(e.target.value))}
          min={1}
        />
        {inputError && (
          <p className="text-red-500 text-sm mt-1">{errorInput}</p>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setLoading("buy");
              handleOrder("buy");
            }}
            className="flex items-center justify-center text-white p-2 rounded w-full mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#7287FD" }}
            disabled={
              loading === "buy" ||
              inputError ||
              stockQuantity * stockPrices > user?.balance
            }
          >
            {loading === "buy" ? (
              <Ring size={20} lineWeight={5} speed={2} color="white" />
            ) : (
              "Buy"
            )}
          </button>

          {userShares && (
            <button
              onClick={() => {
                setLoading("sell");
                handleOrder("sell");
              }}
              className="flex items-center justify-center p-2 rounded w-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#FF4C4C",
                color: "white",
              }}
              disabled={
                userShares.quantity <= 0 ||
                loading === "sell" ||
                inputError ||
                stockQuantity > userShares.quantity
              }
            >
              {loading === "sell" ? (
                <Ring size={20} lineWeight={5} speed={2} color="white" />
              ) : (
                "Sell"
              )}
            </button>
          )}
        </div>

        <p className="mt-4 text-gray-500 flex gap-1 justify-center">
          <span className="font-bold">{stockQuantity}</span>
          {stockQuantity > 1 ? "shares" : "share"} for{" "}
          <span className="font-bold">
            ${(stockPrices * stockQuantity).toFixed(2)}
          </span>
        </p>
        {userShares && (
          <p className="mt-4 text-gray-500 text-center">
            Your shares: {userShares.quantity}
          </p>
        )}
        <p className="mt-4 text-gray-500 text-center">
          Your balance: <span className="font-bold">${user?.balance}</span>
        </p>
      </div>
    </div>
  );
}

export default StockDetailModal;
