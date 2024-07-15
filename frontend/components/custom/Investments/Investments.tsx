"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinner from "@/components/custom/Spinner/Spinner";

interface Asset {
  asset_name: string;
  asset_symbol: string;
  quantity: number;
  avg_price: number;
  change: number;
}

interface InvestmentsProps {
  updateCount: number;
}

function Investments({ updateCount }: InvestmentsProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [combinedData, setCombinedData] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchStockPrices = async () => {
      setLoading(true);
      const promises = assets.map(async (asset) => {
        const stockPrice = await fetchStockPrice(asset.asset_symbol);
        return { ...asset, change: stockPrice };
      });
      const data = await Promise.all(promises);
      setCombinedData(data);
      setLoading(false);
    };

    if (assets?.length > 0) {
      fetchStockPrices();
    }
  }, [assets]);

  function calculatePercentageDifference(oldPrice: number, newPrice: number) {
    if (oldPrice === 0) {
      throw new Error("Old price cannot be zero");
    }
    const difference = newPrice - oldPrice;
    const percentageDifference = (difference / oldPrice) * 100;
    return {
      percentage: percentageDifference.toFixed(2),
      absolute: difference.toFixed(2),
    };
  }

  async function fetchStockPrice(symbol: string) {
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
    return Number(stockPrice.data);
  }

  useEffect(() => {
    fetchAssets();
  }, [updateCount]);

  function fetchAssets() {
    const token = localStorage.getItem("token");

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
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
      });
  }

  return (
    <div className="investments max-h-96 overflow-y-auto rounded shadow flex flex-col border-2 border-solid border-lavender bg-white p-4 dark:bg-foregroundDark">
      <h2 className="text-lg font-bold">Investments</h2>
      {loading ? (
        <Spinner />
      ) : (
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Avg Price</th>
              <th className="px-4 py-2 text-left">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {combinedData
              .filter((asset) => asset.quantity > 0)
              .map((asset, index) => {
                const { percentage, absolute } = calculatePercentageDifference(
                  asset.avg_price,
                  Number(asset.change)
                );
                const isPositiveChange = Number(percentage) > 0;
                const isZeroChange = Number(percentage) === 0;

                return (
                  <tr key={index}>
                    <td className="px-4 py-2">{asset.asset_name}</td>
                    <td className="px-4 py-2">{asset.asset_symbol}</td>
                    <td className="px-4 py-2">{asset.quantity}</td>
                    <td className="px-4 py-2">
                      ${(asset.avg_price * asset.quantity).toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-2 ${
                        isZeroChange
                          ? ""
                          : isPositiveChange
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {percentage}% ({isPositiveChange ? "+" : ""}${absolute})
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Investments;
