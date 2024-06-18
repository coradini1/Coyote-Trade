import "dotenv/config"
import express, { Express } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import Stripe from "stripe"

import login from "./routes/login"
import register from "./routes/register"
import user from "./routes/user"
import metrics from "./routes/metrics"


// Server
const app: Express = express()
const port = 3002




// Middlewares
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}))
app.use(cookieParser())
app.use(bodyParser.json())


// Stripe
const stripe_secret = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2024-04-10',
})
app.get("/api/stripe", async (req, res) => {
  try {
    res.send({
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
  }
});
// Routes
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/user", user)
app.use("/api/metrics", metrics)


app.listen(port, () => {
  console.log(`CoyoteTrade-API running at http://localhost:${port}`)
})
