import { sql } from "drizzle-orm"
import { Request, Response } from "express"

import { db } from "../db/db"

export async function assetsController(_: Request, res: Response) {

  const data = await db.query.assetsTable.findMany()
  
  
  if (!data) {
    return res.status(400).json({
      type: "error",
      message: "No data found",
    })
  }

  return res.status(200).json(data)
}
