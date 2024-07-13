import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Asset {
  asset_name: string;
  asset_symbol: string;
  quantity: number;
  buy_price: number;
  change: string;
}

interface InvestmentsProps {
  updateCount: number;
}

function Investments({ updateCount }: InvestmentsProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, [updateCount]);

  function fetchAssets() {
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
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
      });
  }

  return (
    <div className="investments bg-white p-4 rounded shadow max-h-96 overflow-y-auto">
      <h2 className="text-lg font-bold">Investments</h2>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Value</th>
            <th className="px-4 py-2 text-left">Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {assets.map((asset, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{asset.asset_name}</td>
              <td className="px-4 py-2">{asset.asset_symbol}</td>
              <td className="px-4 py-2">{asset.quantity}</td>
              <td className="px-4 py-2">${asset.buy_price * asset.quantity}</td>
              <td>{asset.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Investments;
