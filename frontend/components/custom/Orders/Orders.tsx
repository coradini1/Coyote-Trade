import React from "react";

function Orders({ userData }: any) {
  const orderData = [
    {
      name: "NVIDIA",
      symbol: "NVDA",
      quantity: 1.54,
      date: "03/04/2024",
      type: "BUY",
      status: "OK",
    },
    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },
    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },

    {
      name: "APPLE",
      symbol: "AAPL",
      quantity: 2,
      date: "19/03/2024",
      type: "SELL",
      status: "PENDING",
    },
  ];

  return (
    <div className="orders bg-white p-4 rounded shadow max-h-96 overflow-y-auto">
      <h2 className="text-lg font-bold">Orders</h2>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orderData.map((order, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{order.name}</td>
              <td className="px-4 py-2">{order.symbol}</td>
              <td className="px-4 py-2">{order.quantity}</td>
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2">{order.type}</td>
              <td
                className={`px-4 py-2 ${
                  order.status === "OK" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
