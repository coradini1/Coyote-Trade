import { Request, Response } from "express";
import { db } from "../../db/db";
import { sql } from "drizzle-orm";

export async function ordersReadController(req: Request, res: Response) {
  const userEmail = req.user?.email;

  if (!userEmail) {
    return res.status(400).json({
      message: "User email is missing",
    });
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

    const userOrders = await db.query.ordersTable.findMany({
      where: (order, { eq }) => eq(order.user_id, user.id),
    });

    const userOrdersWithAssets = await Promise.all(
      userOrders.map(async (order) => {
        if (order.asset_id === null) {
          return { ...order, asset: null };
        }

        const asset = await db.query.assetsTable.findFirst({
          where: (asset, { eq }) => eq(asset.id, order.asset_id as number),
        });
        return { ...order, asset };
      })
    );

    return res.status(200).json({
      message: "Orders placed by the user",
      data: userOrdersWithAssets,
    });
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
