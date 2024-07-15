import { Request, Response } from "express";
import { alpaca } from "../../client/alpaca";
import { db } from "../../db/db";
import { ordersTable, assetsTable, usersTable } from "../../db/schema";
import { sql } from "drizzle-orm";

type OrderStockRequest = {
  symbol: string;
  qty: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit" | "trailing_stop";
  time_in_force: string;
  stock: JSON;
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

    const user = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.email, userEmail),
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const balance = user.balance;
    const quantityPrice =
      ((stockPrices.quotes[symbol]?.ap + stockPrices.quotes[symbol]?.bp) / 2) *
      parseInt(qty, 10);

    if (side === "buy" && quantityPrice > balance) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    let asset = await db.query.assetsTable.findFirst({
      where: (asset, { and, eq }) =>
        and(eq(asset.asset_symbol, symbol), eq(asset.user_id, user.id)),
    });

    if (asset) {
      if (side === "buy") {
        const newAvgPrice =
          (asset.avg_price * asset.quantity + quantityPrice) /
          (asset.quantity + parseInt(qty, 10));
        await db
          .update(assetsTable)
          .set({
            quantity: asset.quantity + parseInt(qty, 10),
            avg_price: newAvgPrice,
          })
          .where(sql`id = ${asset.id}`)
          .execute();
        await db
          .update(usersTable)
          .set({ balance: balance - quantityPrice })
          .where(sql`id = ${user.id}`)
          .execute();
      } else if (side === "sell" && parseInt(qty, 10) <= asset.quantity) {
        const newQuantity = asset.quantity - parseInt(qty, 10);
        await db
          .update(assetsTable)
          .set({ quantity: newQuantity })
          .where(sql`id = ${asset.id}`)
          .execute();

        if (newQuantity === 0) {
          await db
            .update(assetsTable)
            .set({ avg_price: undefined })
            .where(sql`id = ${asset.id}`)
            .execute();
        }

        await db
          .update(usersTable)
          .set({ balance: balance + quantityPrice })
          .where(sql`id = ${user.id}`)
          .execute();
        await db.insert(ordersTable).values({
          user_id: user.id,
          asset_id: asset.id,
          quantity: parseInt(qty, 10),
          type: side,
          amount: quantityPrice,
          settle_date: new Date().toISOString(),
          status: "filled",
        });
        return res.status(200).json({
          message: "Asset sold successfully",
        });
      } else {
        return res.status(400).json({
          message: "Insufficient asset quantity",
        });
      }
    } else if (side === "buy") {
      const averagePrice =
        (stockPrices.quotes[symbol]?.ap + stockPrices.quotes[symbol]?.bp) / 2;
      const newAsset = {
        user_id: user.id,
        asset_name: symbol,
        asset_symbol: symbol,
        avg_price: averagePrice,
        quantity: parseInt(qty, 10),
      };
      const insertedAssets = await db
        .insert(assetsTable)
        .values(newAsset)
        .returning();
      asset = insertedAssets[0];

      await db
        .update(usersTable)
        .set({ balance: balance - quantityPrice })
        .where(sql`id = ${user.id}`)
        .execute();
    } else {
      return res.status(400).json({
        message: "No assets to sell",
      });
    }

    const order = await alpaca.createOrder({
      symbol,
      qty: typeof qty !== "string" ? qty : parseInt(qty, 10),
      side,
      type,
      time_in_force,
    });

    await db.insert(ordersTable).values({
      user_id: user.id,
      asset_id: asset.id,
      quantity: parseInt(order.qty, 10),
      type: order.side,
      amount: quantityPrice,
      settle_date: order.settled_at || new Date().toISOString(),
      status: order.status,
    });

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
