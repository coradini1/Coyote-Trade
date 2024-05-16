import { sql, gte } from "drizzle-orm"
import { Request, Response } from "express"

import { usersTable } from "../db/schema"
import { db } from "../db/db"


export async function metricsController(_: Request, res: Response) {
  const data: any = await db.select({
    users_gain: sql`COUNT(*)`,
    date: sql`DATE(created_at)`,
  })
    .from(usersTable)
    .where(gte(sql`DATE(created_at)`, sql`date("now", "-7 days")`))
    .groupBy(sql`DATE(created_at)`)
    .orderBy(sql`DATE(created_at)`)

  if (!data) {
    return res.status(400).json({
      type: "error",
      message: "No data found",
    })
  }

  return res.status(200).json(data)
}
