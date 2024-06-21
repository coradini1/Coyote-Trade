import React from "react";

function Investments({ userData }: any) {
  const investmentData = [
    {
      name: "NVIDIA",
      symbol: "NVDA",
      quantity: 1.54,
      value: "$950.84",
      change: "+$399.09 ($72.33)",
    },
    {
      name: "Apple Inc.",
      symbol: "AAPL",
      quantity: 2.34,
      value: "$1870.45",
      change: "-$123.67 (-$18.12)",
    },
    {
      name: "Amazon.com Inc.",
      symbol: "AMZN",
      quantity: 0.75,
      value: "$3321.67",
      change: "+$567.89 (+$98.76)",
    },
    {
      name: "Microsoft",
      symbol: "MSFT",
      quantity: 3.21,
      value: "$1598.32",
      change: "+$231.45 (+$54.21)",
    },
    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },
    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },

    {
      name: "Tesla",
      symbol: "TSLA",
      quantity: 1.1,
      value: "$1200.50",
      change: "-$89.76 (-$12.34)",
    },
  ];

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
          {investmentData.map((asset, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{asset.name}</td>
              <td className="px-4 py-2">{asset.symbol}</td>
              <td className="px-4 py-2">{asset.quantity}</td>
              <td className="px-4 py-2">{asset.value}</td>
              <td
                className={`px-4 py-2 ${
                  asset.change.includes("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Investments;
