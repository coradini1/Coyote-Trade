import express from "express"
import { adminDashboardController } from "../controllers/adminDashboardController"
import { authenticateToken } from "../middleware/tokenMiddleware"

const router = express.Router()

router.get("/", authenticateToken, adminDashboardController)

export default router
