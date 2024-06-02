import { Request, Response } from "express"

import { db } from "../db/db"

export async function userController(req: any, res: Response) {
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
