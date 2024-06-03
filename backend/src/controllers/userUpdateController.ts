import { Response } from "express"
import { eq } from "drizzle-orm"

import { usersTable } from "../db/schema"
import { db } from "../db/db"

export async function userUpdateController(req: any, res: Response) {
  const { role, email } = req.body.user

  try {
    await db.update(usersTable).set({ role: role }).where(eq(usersTable.email, email))
  } catch (e) {
    res.status(500).json({ message: "Error updating user" })
  }  
  return res.status(200).json({ message: "User updated" })
}
