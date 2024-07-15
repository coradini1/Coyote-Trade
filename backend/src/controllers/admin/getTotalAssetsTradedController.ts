import { Request, Response } from "express";
import { db } from "../../db/db";
import { sql, count, sum } from "drizzle-orm";
import { ordersTable } from "../../db/schema";

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

    console.log(result);
    return res.status(200).json({
      message: "Total orders and quantity",
      data: result[0],
      orders: orders,
    });
  } catch (error) {
    console.error("Error retrieving total assets traded:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
