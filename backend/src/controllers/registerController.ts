import { Request, Response } from "express";

import { usersTable } from "../db/schema";
import { db } from "../db/db";

import { RegisterBody } from "../types";
import { generateToken, hashPassword } from "../utils/utils";

export async function registerController(req: Request, res: Response) {
  const {
    name,
    surname,
    birthdate,
    address,
    password,
    email,
  } = req.body as RegisterBody

  if (!name || !surname || !birthdate || !address || !password || !email) {
    return res.status(400).json({
      type: "error",
      message: "Missing required fields",
    });
  }

  const userCheck = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  })

  if (userCheck) {
    return res.status(400).json({
      type: "error",
      message: "User already exists",
    });
  }

  try {
    const hashedPassword = await hashPassword(password);

    await db.insert(usersTable).values({
      name,
      surname,
      birthdate,
      address,
      password: hashedPassword,
      email,
    })

    const token = generateToken(email, true);

    res.status(201).json({
      type: "success",
      message: "You have successfully registered your account",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      type: "error",
      message: "User creation failed",
    });
  }
}
