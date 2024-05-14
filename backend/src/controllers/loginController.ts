import { Request, Response } from "express"

import { db } from "../db/db"

import { LoginBody } from "../types"
import { comparePasswords, generateToken } from "../utils/utils"

export async function loginController(req: Request, res: Response) {
  const {
    email,
    password,
    persist
  } = req.body as LoginBody

  if (!email || !password) {
    return res.status(400).json({
      type: "error",
      message: "Missing required fields",
    })
  }

  const user = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  })

  if (!user) {
    return res.status(400).json({
      type: "error",
      message: "User not found",
    })
  }

  const passwordMatch = await comparePasswords(password, user.password)

  if (!passwordMatch) {
    return res.status(400).json({
      type: "error",
      message: "Invalid credentials",
    })
  }

  const token = generateToken(email, persist)

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  })
  res.status(200).json({
    type: "success",
    message: "You have successfully logged in",
  })
}
