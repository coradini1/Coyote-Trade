import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
function Orders({ userData }: any) {
  const [orderData, setOrderData] = useState([{}] as any);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

 async function fetchOrders() {
    const token = Cookie.get("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/get`, {
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data.data);
      });
  }

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
          {orderData.map((order: any, index: number) => (
            <tr key={index}>
              <td className="px-4 py-2">{order.asset?.asset_name}</td>
              <td className="px-4 py-2">{order.asset?.asset_symbol}</td>
              <td className="px-4 py-2">{order.quantity}</td>
              <td className="px-4 py-2">{order.createdAt}</td>
              <td className="px-4 py-2">{order.type}</td>
              <td
                className={`px-4 py-2 ${
                  order.status === "filled" ? "text-green-500" : "text-yellow-500"
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
