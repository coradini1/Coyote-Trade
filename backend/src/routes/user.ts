import express from "express"

import { userController } from "../controllers/userController"
import { userDeleteController } from "../controllers/userDeleteController"
import { userLogoutController } from "../controllers/userLogoutController"
import { userUpdateController } from "../controllers/userUpdateController"
import { authenticateToken } from "../middleware/tokenMiddleware"

const router = express.Router()

router.get("/", authenticateToken, userController)
router.delete("/delete", authenticateToken, userDeleteController)
router.patch("/update", authenticateToken, userUpdateController)
router.get("/logout", authenticateToken, userLogoutController)

export default router
