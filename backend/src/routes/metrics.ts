import express from "express"
import { metricsController } from "../controllers/metricsController"
import { usersController } from "../controllers/usersControllers"
import { authenticateToken } from "../middleware/tokenMiddleware"

const router = express.Router()

router.get("/trends", authenticateToken, metricsController)
router.get("/users", authenticateToken, usersController)

export default router
