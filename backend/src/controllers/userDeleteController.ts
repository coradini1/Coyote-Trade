import { Request, Response } from "express"
import { eq } from "drizzle-orm"

import { usersTable } from "../db/schema"
import { db } from "../db/db"

export async function userDeleteController(req: Request, res: Response) {
  const userData = await db.delete(usersTable).where(
    eq(usersTable.email, req.body.user.email)
  )

  if (!userData) {
    return res.status(400).json({
      type: "error",
      message: "User not found",
    })
  }

  res.status(200).json({
    type: "success",
    message: "User deleted",
  })
}
