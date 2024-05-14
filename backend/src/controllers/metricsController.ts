import { Request, Response } from "express"

export async function metricsController(req: Request, res: Response) {
  /*
    const query = `
      SELECT DATE(dateOfCreation) AS date, COUNT(*) AS users_gain
      FROM users
      WHERE dateOfCreation >= date("now", "-7 days")
      GROUP BY DATE(dateOfCreation)
      ORDER BY DATE(dateOfCreation)
    `
  */
}
