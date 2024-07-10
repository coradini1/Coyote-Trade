import React from "react";

interface StockListProps {
  stocks: { name: string; symbol: string; price: number; change: number }[];
  onStockClick: (stock: any) => void;
}

function StockList({ stocks, onStockClick }: StockListProps) {
  return (
    <div>
      <ul>
        {stocks.map((stock, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border-b cursor-pointer"
            onClick={() => onStockClick(stock)}
          >
            <div className="flex items-center">
              <span className="font-bold">{stock.name}</span> ({stock.symbol})
            </div>
            <div className="flex items-center">
              {/* <span>${stock.price.toFixed(2)}</span>
              <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                {stock.change >= 0 ? `+${stock.change.toFixed(2)}` : stock.change.toFixed(2)}%
              </span> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;
