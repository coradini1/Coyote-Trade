import { Request, Response } from "express";
import { db } from "../../db/db";
import { sql, count, sum } from "drizzle-orm";
import { ordersTable, assetsTable } from "../../db/schema";

export async function getTotalAssetsTradedController(
  req: Request,
  res: Response
) {
  try {
    const result = await db
      .select({
        countOrders: count(ordersTable.id),
        sumQuantity: sum(ordersTable.quantity),
      })
      .from(ordersTable)
      .execute();

    const orders = await db.query.ordersTable.findMany();

    const ordersWithAssets = await Promise.all(
      orders.map(async (order) => {
        const asset = await db
          .select({
            assetName: assetsTable.asset_name,
            assetSymbol: assetsTable.asset_symbol,
          })
          .from(assetsTable)
          .where(sql`id = ${order.asset_id}`)
          .execute();
    
        return {
          ...order,
          asset_name: asset[0]?.assetName || "Unknown",
          asset_symbol: asset[0]?.assetSymbol || "UNK",
        };
      })
    );

    console.log(result);
    return res.status(200).json({
      message: "Total orders and quantity",
      data: result[0],
      orders: ordersWithAssets,
    });
  } catch (error) {
    console.error("Error retrieving total assets traded:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
