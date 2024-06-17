import express from "express"
import { loginController } from "../controllers/loginController" 
import { loginMobileController } from "../controllers/loginMobileController"

const router = express.Router()

router.post("/mobile", loginMobileController)
router.post("/", loginController)


export default router
