import "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(email: string, persist?: boolean): string {
  return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: persist ? "1y" : "15m" })
}

export function userContext(user: any) {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    address: user.address,
    birthdate: user.birthdate,
    balance: user.balance,
  }
}

export function verifyToken(token: string): Promise<string | object> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return reject(err)
      }

      resolve(decoded!)
    })
  })
}
