import { Request, Response } from "express";
import { db } from "../../db/db";
import { alertsTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function alertsDeleteController(req: Request, res: Response) {
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

  const alert_id = req.params.assetId;

  const alertId = parseInt(alert_id, 10);

  if (!alertId) {
    return res.status(400).json({
      message: "Alert id is required",
    });
  }

  const alert = await db.query.alertsTable.findFirst({
    where: (alert, { and, eq }) =>
      and(eq(alert.id, alertId), eq(alert.user_id, user.id)),
  });

  if (!alert) {
    return res.status(404).json({
      message: "Alert not found",
    });
  }

  await db
    .delete(alertsTable)
    .where(eq(alertsTable.id, alert.id))
    .execute();

  return res.status(200).json({
    message: "Alert deleted successfully",
  });

  

    
}
