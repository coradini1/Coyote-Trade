import { Response } from "express"
import jwt from "jsonwebtoken"

export async function userLogoutController(req: any, res: Response) {
  const user = req.user.email
  jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: 0 })

  res.clearCookie("token", {
    httpOnly: true,
    secure: true
  })
  return res.status(200).json({ message: "Logged out" })
}
