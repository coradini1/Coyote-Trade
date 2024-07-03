import { Request, Response } from "express"
import { alpaca } from "../../client/alpaca"

export async function allStocksController(_: Request, res: Response) {
  const stocks = await alpaca.getAssets({
    status: "active",
    asset_class: "us_equity"
  })

  res.status(200).json({
    stock: stocks
  })
}