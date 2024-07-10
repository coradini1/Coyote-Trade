"use client";
import React, { useState, useEffect } from "react";
import UserCard from "@/components/custom/UserCard/UserCard";
import Orders from "@/components/custom/Orders/Orders";
import Portfolio from "@/components/custom/Portfolio/Portfolio";
import Investments from "@/components/custom/Investments/Investments";
import SearchBar from "@/components/custom/SearchBar/SearchBar";
import ModalSearchBar from "@/components/custom/ModalSearchBar/ModalSearchBar";
import StockList from "@/components/custom/StockList/StockList";
import StockDetailModal from "@/components/custom/StockDetailModal/StockDetailModal";
import Cookies from "js-cookie";

export default function Page() {
  const [user, setUser] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocks, setStocks] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  useEffect(() => {
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
  }, []);

  const handleSearch = async (query: string) => {
    const token = Cookies.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stocks/search/${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    const data = await response.json();

    setStocks(data.stocks);
    setIsModalOpen(true);
  };

  const handleStockClick = (stock: any) => {
    setSelectedStock(stock);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Portfolio />
        </div>
        <div className="md:col-span-1 space-y-4">
          <UserCard userData={user} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <Investments />
        </div>
        <div className="space-y-4">
          <Orders />
        </div>
      </div>
      <ModalSearchBar
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <StockList stocks={stocks} onStockClick={handleStockClick} />
      </ModalSearchBar>
      {selectedStock && (
        <StockDetailModal
          isOpen={Boolean(selectedStock)}
          onClose={() => setSelectedStock(null)}
          stock={selectedStock}
        />
      )}
    </div>
  );
}