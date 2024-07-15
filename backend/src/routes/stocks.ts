import express from "express";
import { searchStockController } from "../controllers/stocks/searchStockController";
import { orderStockController } from "../controllers/stocks/orderStockController";
import { allStocksController } from "../controllers/stocks/allStocksController";
import { authenticateToken } from "../middleware/tokenMiddleware";

const router = express.Router();

router.get("/search/:stock", authenticateToken, searchStockController);
router.get("/all", authenticateToken, allStocksController);
router.post("/order", authenticateToken, orderStockController);

export default router;
