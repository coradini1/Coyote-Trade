import { Request, Response } from "express";
import { db } from "../../db/db";
import { eq, and } from "drizzle-orm";
import { alertsTable } from "../../db/schema";

export async function alertsUpdateController(req: Request, res: Response) {

  const userEmail = req.user?.email;
  const { symbol, target_price, lower_threshold, asset_id } = req.body;

  if (!userEmail) {
    return res.status(400).json({
      message: "User email is missing",
    });
  }

  if (!symbol || !target_price || !asset_id) {
    return res.status(400).json({
      message: "Asset symbol, target price and asset id are required",
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
    const alertTest = await db.query.alertsTable.findMany({});

    const alert = await db.query.alertsTable.findFirst({
      where: (alert, { and, eq }) =>
        and(
          eq(alert.asset_symbol, symbol),
          eq(alert.user_id, user.id),
          eq(alert.asset_id, asset_id)
        ),
    });

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    await db
      .update(alertsTable)
      .set({ 
        target_price: target_price,
        lower_threshold: lower_threshold 
      })
      .where(eq(alertsTable.id, alert.id))
      .execute();

    return res.status(200).json({
      message: "Alert updated successfully",      
    });
  } catch (error) {
    console.error("Error updating alert:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
