import { Request, Response } from "express"

export async function allAlertsController(req: Request, res: Response) {
  
    return res.status(200).json({
        message: "All alerts",
        data: []
    })
}