import express from "express"
import jwt from "jsonwebtoken"

import { userController } from "../controllers/userController"
import { userDeleteController } from "../controllers/userDeleteController"
import { authenticateToken } from "../middleware/tokenMiddleware"

const router = express.Router()

router.get("/", authenticateToken, userController)
router.delete("/delete", authenticateToken, userDeleteController)
router.get("/logout", authenticateToken, (req: any, res) => {
  const user = req.user.email
  jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: 0 })

  res.clearCookie("token", {
    httpOnly: true,
    secure: true
  })
  res.status(200).send("Logged out")
})
export default router
