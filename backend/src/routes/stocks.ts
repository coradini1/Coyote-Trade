import express from "express";
import { searchStocksController } from "../controllers/stocks/searchStocksController";
import { orderStockController } from "../controllers/stocks/orderStockController";
import { allStocksController } from "../controllers/stocks/allStocksController";
import { authenticateToken } from "../middleware/tokenMiddleware";

const router = express.Router();

router.get("/search/:stock", authenticateToken, searchStocksController);
router.get("/all", authenticateToken, allStocksController);
router.post("/order", authenticateToken, orderStockController);

export default router;
