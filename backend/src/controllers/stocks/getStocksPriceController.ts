import { Request, Response } from "express";

export async function getAssetsPriceController(req: Request, res: Response) {
  const symbol = req.params.symbol;
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "APCA-API-KEY-ID": `${process.env.API_KEY_ID}`,
        "APCA-API-SECRET-KEY": `${process.env.API_SECRET_KEY}`,
      },
    };
    const dataStockPrices = fetch(
      `https://data.alpaca.markets/v2/stocks/quotes/latest?symbols=${symbol}&feed=iex`,
      options
    )
      .then((response) => response.json())
      .then((data) => data);
    const stockPrices = await dataStockPrices;

    if (!stockPrices.quotes[symbol]?.ap && !stockPrices.quotes[symbol]?.bp) {
      return res.status(400).json({
        message: "Failed to retrieve asset buy price",
      });
    }
    const averagePrice = (stockPrices.quotes[symbol]?.ap + stockPrices.quotes[symbol]?.bp) / 2;
    return res.status(200).json({
      message: "Asset price retrieved successfully",
      data: averagePrice,
    });
  } catch (error) {
    console.error("Error retrieving assets price:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
