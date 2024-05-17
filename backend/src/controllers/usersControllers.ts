import { Request, Response } from "express"

import { db } from "../db/db"

export async function usersController(req: Request, res: Response) {
  const data: any = await db.query.usersTable.findMany()
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const resultUsers = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / limit);

  if (!data) {
    return res.status(400).json({
      type: "error",
      message: "No data found",
    })
  }

  // make pagination for every 10 users

  return res.status(200).json({
    page,
    limit,
    totalPages,
    data: resultUsers,
  })
}
