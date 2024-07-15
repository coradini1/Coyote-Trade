import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

function Portfolio({ updateCount }: { updateCount: number }) {
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Portfolio Value",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    fetchAssets();
  }, [updateCount]);

  function formatNumber(value: number) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        let totalValue = 0;
        let chartLabels: string[] = [];
        let chartDataPoints: number[] = [];
        
        data.data.forEach((asset: any) => {
          totalValue += asset.buy_price * asset.quantity;
          chartLabels.push(asset.asset_symbol);
          chartDataPoints.push(asset.buy_price * asset.quantity);
        });

        setPortfolioValue(totalValue);
        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Portfolio Value",
              data: chartDataPoints,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        });
      });
  }

  return (
    <div className="portfolio bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Portfolio</h2>
      <p>${formatNumber(portfolioValue)}</p>
      <div>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default Portfolio;
