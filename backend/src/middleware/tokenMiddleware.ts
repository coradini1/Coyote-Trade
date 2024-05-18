import "dotenv/config"
import jwt from "jsonwebtoken"

export function authenticateToken(req: any, res: any, next: any) {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ message: "Access token not found" })
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" })
    }
    req.user = user
    next()
  })
}

export function checkAuthenticated(req:any, res: any, next: any) {
  const token = req.cookies.token
  if (token) {
    return res.json({
      type: "error",
      message: "You are already authenticated"
    })
  }
  next()
} 
