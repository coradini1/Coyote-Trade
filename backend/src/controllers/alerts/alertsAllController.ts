import { Request, Response } from "express";
import { db } from "../../db/db";
import { sql } from "drizzle-orm";

export async function alertsAllController(req: Request, res: Response) {
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

  const alerts = await db
    .select({
      id: sql`alerts.id`,
      asset_symbol: sql`alerts.asset_symbol`,
      target_price: sql`alerts.target_price`,
      lower_threshold: sql`alerts.lower_threshold`,
      companyName: sql`assets.asset_name`,
      quantity: sql`assets.quantity`,
      currentPrice: sql`assets.avg_price`,
    })
    .from(sql`alerts`)
    .innerJoin(sql`assets`, sql`alerts.asset_id = assets.id`)
    .where(sql`alerts.user_id = ${user.id}`)
    .execute();

  return res.status(200).json({
    message: "Alerts fetched successfully",
    data: alerts,
  });
}
