import React from 'react';

const Orders: React.FC = () => {
  return (
    <div className="orders bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NVIDIA</td>
            <td>NVDA</td>
            <td>1.54</td>
            <td>03/04/2024</td>
            <td>BUY</td>
            <td className="text-green-500">OK</td>
          </tr>
          <tr>
            <td>APPLE</td>
            <td>AAPL</td>
            <td>2</td>
            <td>19/03/2024</td>
            <td>SELL</td>
            <td className="text-yellow-500">PENDING</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
