import { Request, Response } from "express";

export function validateUserEmail(
  req: Request,
  res: Response
): string | undefined {
  const userEmail = req.user?.email;
  if (!userEmail) {
    res.status(400).json({ message: "User email is missing" });
    return undefined;
  }
  return userEmail;
}
