import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

function Portfolio({ updateCount }: any) {
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    fetchAssets();
  }, [updateCount]);


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
        let totalValue = 0;
        data.data.forEach((asset: any) => {
          totalValue += asset.buy_price * asset.quantity;
        });
        setPortfolioValue(totalValue);
      });
  }

  return (
    <div className="portfolio bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Portfolio</h2>
      <p>${portfolioValue}</p>
      <p className="text-green-500">$0 (0%) last week</p>
    </div>
  );
}

export default Portfolio;
