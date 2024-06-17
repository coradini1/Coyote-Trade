import { Response } from "express"
import { eq } from "drizzle-orm"

import { usersTable } from "../db/schema"
import { db } from "../db/db"

export async function userUpdateController(req: any, res: Response) {
  const { role, email, address, name, surname } = req.body.user

  try {
    if(name) await db.update(usersTable).set({ name: name }).where(eq(usersTable.email, email))
    if(surname) await db.update(usersTable).set({ surname: surname }).where(eq(usersTable.email, email))
    if(address) await db.update(usersTable).set({ address: address }).where(eq(usersTable.email, email))
    if(role) await db.update(usersTable).set({ role: role }).where(eq(usersTable.email, email))
    
  } catch (e) {
    res.status(500).json({ message: "Error updating user" })
  }  
  return res.status(200).json({ message: "User updated" })
}
