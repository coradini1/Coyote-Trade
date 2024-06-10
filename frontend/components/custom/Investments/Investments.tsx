import React from 'react';

const Investments: React.FC = () => {
  return (
    <div className="investments bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Investments</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NVIDIA</td>
            <td>NVDA</td>
            <td>1.54</td>
            <td>$950.84</td>
            <td className="text-green-500">+$399.09 ($72.33)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Investments;
