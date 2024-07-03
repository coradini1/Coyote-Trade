import { Request, Response } from "express"
import { alpaca } from "../../client/alpaca"
import { db } from "../../db/db"
import { ordersTable } from "../../db/schema"

type OrderStockRequest = {
  symbol: string
  qty: string
  side: "buy" | "sell"
  type: "market" | "limit" | "stop" | "stop_limit" | "trailing_stop"
  time_in_force: string
}

export async function orderStockController(req: Request, res: Response) {
  const {
    symbol,
    qty,
    side,
    type,
    time_in_force
  } = req.body as OrderStockRequest

  console.log(req.body)

  if (!symbol || !qty || !side || !type || !time_in_force) {
    return res.status(400).json({
      message: "Missing required fields"
    })
  }

  let qtyConverted
  if (typeof qty !== "string") {
    qtyConverted = String(qty)
  }

  try {
    const order = await alpaca.createOrder({
      symbol,
      qty: typeof qty !== "string" ? qtyConverted : qty,
      side,
      type,
      time_in_force
    })
       
        // const userId = req.user.id; 
        // const assetId = 1; 
    
        // const newOrder: InsertOrder = {
        //   user_id: userId,
        //   asset_id: assetId,
        //   quantity: parseInt(qty),
        //   type,
        //   amount: order.filled_avg_price * qty, 
        //   settle_date: order.settlement_date, 
        //   status: order.status,
        //   createdAt: new Date().toISOString()
        // };
    
        // await db.insert(ordersTable).values(newOrder);


    res.status(200).json({
      order
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}