import { Request, Response } from "express";
import { db } from "../../db/db";
import { sql, count, sum } from "drizzle-orm";
import { usersTable } from "../../db/schema";

export async function getTotalUsersBalanceController(
  req: Request,
  res: Response
) {
  try {
    const result = await db
      .select({
        countUsers: count(usersTable.id),
        sumBalance: sum(usersTable.balance),
      })
      .from(usersTable)
      .execute();

    console.log(result);
    return res.status(200).json({
      message: "Total users and balance",
      data: result[0],
    });
  } catch (error) {
    console.error("Error retrieving total users balance:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
