import express from "express"
import { authenticateMobileToken } from "../middleware/mobileTokenMiddleware"
import { assetsController } from "../controllers/assetsController"

const router = express.Router()

router.get("/all", authenticateMobileToken, assetsController)

export default router 
