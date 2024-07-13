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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [user, setUser] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocks, setStocks] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<any[]>([]);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    fetchAssets();
    fetchData();
  }, []);

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

  async function fetchAssets() {
    const token = Cookies.get("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/allWeb`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAssets(data.data);
      });
  }

  const handleSearch = async (query: string) => {
    setLoading(true);
    const token = Cookies.get("token");
    try {
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

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      setStocks(data.stocks);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStockClick = (stock: any) => {
    setSelectedStock(stock);
    filterAssetsByStockSymbol(stock.symbol);
  };

  const filterAssetsByStockSymbol = (symbol: string) => {
    const filteredAssets = assets.filter(
      (asset: any) => asset?.asset_symbol === symbol
    );
    setFilteredAssets(filteredAssets);
  };

  const closeSearchModal = () => {
    setIsModalOpen(false);
    setUpdateCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="flex justify-center mb-4">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Portfolio key={updateCount} />
        </div>
        <div className="md:col-span-1 space-y-4">
          <UserCard userData={user} key={updateCount} updateCount={0} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <Investments key={updateCount} updateCount={0} />
        </div>
        <div className="space-y-4">
          <Orders key={updateCount} />
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
          userShares={filteredAssets[0]}
          closeSearchModal={closeSearchModal}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
}
