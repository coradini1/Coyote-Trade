import React from 'react';

function Portfolio({userData}: any) {
  return (
    <div className="portfolio bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Portfolio</h2>
      <p>$9,103.43</p>
      <p className="text-green-500">+$258.61 (2.92%) last week</p>
    </div>
  );
};

export default Portfolio;
