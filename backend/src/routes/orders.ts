import express from "express";
import { authenticateToken } from "../middleware/tokenMiddleware";
// import { ordersAllController } from "../controllers/orders/ordersAllController";
import {ordersReadController} from "../controllers/orders/ordersReadController";


const router = express.Router();

// router.get("/all", authenticateMobileToken, ordersAllController);
router.get("/get", authenticateToken, ordersReadController);

export default router;