import { Request, Response } from "express"
import { alpaca } from "../../client/alpaca"

export async function searchStocksController(req: Request, res: Response) {
  const query = req.params.stock.charAt(0).toUpperCase() + req.params.stock.slice(1)  

  let stockData = []

  const stocks = await alpaca.getAssets({
    status: "active",
    asset_class: "us_equity"
  })

  if (query) {
    stockData = stocks.filter((stock: any) => stock.name.includes(query) || stock.symbol.includes(query))
  }

  if (stockData.length === 0) {
    return res.status(404).json({
      message: "Stock not found"
    })
  }

  res.status(200).json({
    stocks: stockData
  })
}
