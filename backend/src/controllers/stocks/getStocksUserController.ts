import { Request, Response } from "express";
import { db } from "../../db/db";
import { sql } from "drizzle-orm";

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

    const userAssets = await db.query.assetsTable.findMany({
      where: (asset, { eq }) => eq(asset.user_id, user.id),
    });

    // const averagePrice = await db.query.ordersTable.aggregate({
    //   avg: {
    //     amount: true,
    //   },
    //   where: (order, { eq }) => eq(order.user_id, user.id),
    // });

    return res.status(200).json({
      message: "Assets owned by the user",
      data: userAssets,
    });
  } catch (error) {
    console.error("Error retrieving user assets:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
