import { Request, Response } from "express"
import { alpaca } from "../../client/alpaca"

export async function searchStocksController(req: Request, res: Response) {
  const query = req.params.stock

  let stockData = {}

  const stocks = await alpaca.getAssets({
    status: "active",
    asset_class: "us_equity"
  })

  if (query) {
    stockData = {
      ...stockData,
      data: stocks.find((stock: any) => stock.name.includes(query) || stock.symbol.includes(query))
    }
  }

  if (!stockData) {
    return res.status(404).json({
      message: "Stock not found"
    })
  }

  res.status(200).json({
    stock: stockData
  })
}
