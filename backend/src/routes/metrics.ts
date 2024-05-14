import express from "express";
import { metricsController } from "../controllers/metricsController";

const router = express.Router();

router.get("/", metricsController);

export default router;
