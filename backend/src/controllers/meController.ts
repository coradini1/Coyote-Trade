import { Request, Response } from "express"

import { db } from "../db/db"

<<<<<<<< HEAD:backend/src/controllers/userController.ts
export async function userController(req: any, res: Response) {
========
export async function meController(req: any, res: Response) {
>>>>>>>> 47086b14a1c7ace25fd7123779f59ea43d692a88:backend/src/controllers/meController.ts
  const userData = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.email, req.user.email),
  })

  if (!userData) {
    return res.status(400).json({
      type: "error",
      message: "User not found",
    })
  }

  const {
    email,
    name,
    surname,
    birthdate,
    address,
    role,
    createdAt,
  } = userData

  res.status(200).json({
    type: "success",
    user: {
      email,
      name,
      surname,
      birthdate,
      address,
      role,
      createdAt,
    },
  })
}
