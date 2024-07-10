import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import login from "./routes/login";
import register from "./routes/register";
import user from "./routes/user";
import stocks from "./routes/stocks";
import metrics from "./routes/metrics";
import assets from "./routes/assets";
import alerts from "./routes/alerts";
import orders from "./routes/orders";

// Server
const app: Express = express();
const port = 3002;

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: "https://coyotetrade.com.br",
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stocks", stocks);
app.use("/api/user", user);
app.use("/api/metrics", metrics);
app.use("/api/assets", assets);
app.use("/api/alerts", alerts);
app.use("/api/orders", orders);

app.listen(port, () => {
  console.log(`CoyoteTrade-API running at http://localhost:${port}`);
});
