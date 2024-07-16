import { Request, Response } from "express";
import { usersTable } from "../../db/schema";
import { db } from "../../db/db";
import { sql, eq } from "drizzle-orm";

export async function userWithdrawController(req: Request, res: Response) {
  const { amount } = req.body;
  const userEmail = req.user?.email;

  if (!userEmail) {
    return res.status(400).json({
      message: "User email is missing",
    });
  }

  if (!amount) {
    return res.status(400).json({
      message: "Amount is missing",
    });
  }

  try {
    const user = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.email, userEmail),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const updatedBalance = user.balance - amount;
    const updatedUser = await db
      .update(usersTable)
      .set({ balance: updatedBalance })
      .where(eq(usersTable.email, userEmail));

    return res.status(200).json({
      message: "User balance updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user balance:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
