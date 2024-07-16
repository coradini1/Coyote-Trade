import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  BarElement,
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
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
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
        backgroundColor: "hsl(231 97% 72% / 0.2)",
        borderColor: "hsl(231 97% 72% / 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchAssets();
  }, [updateCount]);

  function formatNumber(value: number) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  async function fetchAssets() {
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
        let totalValue = 0;
        let chartLabels: string[] = [];
        let chartDataPoints: number[] = [];

        data.data.forEach((asset: any) => {
          totalValue += asset.avg_price * asset.quantity;
          chartLabels.push(asset.asset_symbol);
          chartDataPoints.push(asset.avg_price * asset.quantity);
        });

        setPortfolioValue(totalValue);
        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Portfolio Value",
              data: chartDataPoints,
              backgroundColor: "hsl(231 97% 72% / 0.2)",
              borderColor: "hsl(231 97% 72% / 1)",
              borderWidth: 1,
            },
          ],
        });
      });
  }

  return (
    <div className="portfolio bg-white p-4 rounded shadow flex flex-col border-2 border-solid border-lavender dark:bg-foregroundDark">
      <h2 className="text-lg font-bold">Portfolio</h2>
      <p className="text-2xl font-bold mt-2">${formatNumber(portfolioValue)}</p>
      <div className="mt-4 items-center">
        <Bar data={chartData} /> 
      </div>
    </div>
  );
}

export default Portfolio;
