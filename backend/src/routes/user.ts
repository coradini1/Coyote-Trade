import express from "express"
import { userController } from "../controllers/userController"
import { userDeleteController } from "../controllers/userDeleteController"
import { authenticateToken } from "../middleware/tokenMiddleware"

const router = express.Router()

router.get("/", authenticateToken, userController)
router.delete("/delete", authenticateToken, userDeleteController)

export default router
