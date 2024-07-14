import express from "express";
import { authenticateMobileToken } from "../middleware/mobileTokenMiddleware";
import { assetsController } from "../controllers/assetsController";
import { authenticateToken } from "../middleware/tokenMiddleware";
import { getAssetsPriceController } from "../controllers/getAssetsPriceController";

const router = express.Router();

router.get("/all", authenticateMobileToken, assetsController);
router.get("/allWeb", authenticateToken, assetsController);
router.get(
  "/get-stock-price/:symbol",
  authenticateToken,
  getAssetsPriceController
);

export default router;
