import { sql } from "drizzle-orm"
import { Request, Response } from "express"

import { db } from "../db/db"

export async function metricsController(_: Request, res: Response) {

  const data = await db.all(sql`
    WITH RECURSIVE DateSeries AS (
    SELECT DATE('now', '-6 days') AS DATE
    UNION ALL
    SELECT DATE(DATE, '+1 day')
    FROM DateSeries
    WHERE DATE < DATE('now')
    ),
    UserCounts AS (
    SELECT
    DATE(created_at) AS DATE,
    COUNT(*) AS users_gain
    FROM
    users
    WHERE
    created_at >= DATE('now', '-7 days')
    GROUP BY
    DATE(created_at)
    )
    SELECT
    ds.DATE,
    COALESCE(uc.users_gain, 0) AS users_gain
    FROM
    DateSeries ds
    LEFT JOIN UserCounts uc ON ds.DATE = uc.DATE
    ORDER BY
    ds.DATE;`
  )
  
  if (!data) {
    return res.status(400).json({
      type: "error",
      message: "No data found",
    })
  }

  return res.status(200).json(data)
}
