import express from "express";
import { authenticateToken } from "../middleware/tokenMiddleware";
import { checkoutStripe } from "../controllers/stripe/stripeCheckoutController";

const router = express.Router();

router.post("/checkout", authenticateToken, checkoutStripe);

export default router;
