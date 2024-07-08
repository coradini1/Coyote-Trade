import { Request, Response } from "express";
import { db } from "../../db/db";
import { eq, and } from "drizzle-orm";
import { alertsTable, assetsTable } from "../../db/schema";

export async function alertsCreateController(req: Request, res: Response) {
  const userEmail = req.user?.email;

  if (!userEmail) {
    return res.status(400).json({
      message: "User email is missing",
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

  console.log(req.body);
  const { assetSymbol, targetPrice, lowerThreshold, assetId } = req.body;

  if (!assetSymbol || !targetPrice || !assetId) {
    return res.status(400).json({
      message: "Asset symbol, target price, and asset id are required",
    });
  }

  const asset = await db.query.assetsTable.findFirst({
    where: (asset, { eq }) => eq(asset.id, assetId),
  });

  if (!asset) {
    return res.status(404).json({
      message: "Asset not found",
    });
  }

  const existingAlert = await db.query.alertsTable.findFirst({
    where: (alert, { and, eq }) =>
      and(
        eq(alert.asset_symbol, assetSymbol),
        eq(alert.user_id, user.id),
        eq(alert.asset_id, assetId)
      ),
  });

  if (existingAlert) {
    return res.status(400).json({
      message: "Alert already exists",
    });
  }

  try {
    const newAlert = await db
      .insert(alertsTable)
      .values({
        asset_symbol: asset.asset_symbol,
        user_id: user.id,
        asset_id: asset.id,
        target_price: targetPrice,
        lower_threshold: lowerThreshold, 
      })
      .execute();

    return res.status(200).json({
      message: "Alert created",
      data: newAlert,
    });
  } catch (error) {
    console.error("Error creating alert:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
