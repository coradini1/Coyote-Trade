import { Request, Response } from "express";
import { db } from "../db/db";

export async function assetsController(req: Request, res: Response) {
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

    if (!userOrders || userOrders.length === 0) {
      return res.status(200).json({
        message: "User has not placed any orders",
        data: [],
      });
    }

    const userAssets = await Promise.all(
      userOrders.map(async (order) => {
        const asset = await db.query.assetsTable.findFirst({
          where: (asset, { eq }) => eq(asset.id, order.asset_id as number),
        });
        return asset;
      })
    );
    const filteredAssets = userAssets.filter((asset) => asset !== null);

    return res.status(200).json({
      message: "Assets bought by the user",
      data: filteredAssets,
    });
  } catch (error) {
    console.error("Error retrieving user assets:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
