import { Request, Response } from "express";
import { alpaca } from "../../client/alpaca";
import { db } from "../../db/db";
import { ordersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { assetsTable } from "../../db/schema";

type OrderStockRequest = {
  symbol: string;
  qty: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit" | "trailing_stop";
  time_in_force: string;
};

export async function orderStockController(req: Request, res: Response) {
  const { symbol, qty, side, type, time_in_force } =
    req.body as OrderStockRequest;

  const userEmail = req.user?.email;

  if (!userEmail) {
    return res.status(400).json({
      message: "User email is missing",
    });
  }

  if (!symbol || !qty || !side || !type || !time_in_force) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  let qtyConverted;
  if (typeof qty !== "string") {
    qtyConverted = String(qty);
  }

  try {
    const user = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.email, userEmail),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let asset = await db.query.assetsTable.findFirst({
      where: (asset, { eq }) => eq(asset.asset_symbol, symbol),
    });

    if (!asset) {
      const newAsset = {
        asset_name: symbol,
        asset_symbol: symbol,
        buy_price: 0,
        quantity: 0,
      };
      const insertedAssets = await db
        .insert(assetsTable)
        .values(newAsset)
        .returning();
      asset = insertedAssets[0];
    }

    const order = await alpaca.createOrder({
      symbol,
      qty: typeof qty !== "string" ? qtyConverted : qty,
      side,
      type,
      time_in_force,
    });

    await db.insert(ordersTable).values({
      user_id: user.id,
      asset_id: asset.id,
      quantity: parseInt(order.qty, 10),
      type: order.side,
      amount: parseInt(order.qty, 10) * (order.filled_avg_price || 0),
      settle_date: order.settled_at || new Date().toISOString(),
      status: order.status,
    });

    res.status(200).json({
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}
