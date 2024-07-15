import { Response } from "express";
import { eq } from "drizzle-orm";

import { usersTable } from "../db/schema";
import { db } from "../db/db";

export async function userUpdateController(req: any, res: Response) {
  const {
    role,
    email,
    address,
    name,
    surname,
    birthdate,
    logged_user_role,
    default_email,
  } = req.body.user;

  if (email && email !== default_email) {
    const emailCheck = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (emailCheck) {
      return res.status(404).json({
        message: "Email already exists",
      });
    }
  }

  try {
    if (name) {
      await db
        .update(usersTable)
        .set({ name })
        .where(eq(usersTable.email, default_email));
    }
    if (surname) {
      await db
        .update(usersTable)
        .set({ surname })
        .where(eq(usersTable.email, default_email));
    }
    if (email && email !== default_email) {
      await db
        .update(usersTable)
        .set({ email })
        .where(eq(usersTable.email, default_email));
    }
    if (address) {
      await db
        .update(usersTable)
        .set({ address })
        .where(eq(usersTable.email, default_email));
    }
    if (birthdate) {
      await db
        .update(usersTable)
        .set({ birthdate })
        .where(eq(usersTable.email, default_email));
    }
    if (logged_user_role === "admin" && role) {
      await db
        .update(usersTable)
        .set({ role })
        .where(eq(usersTable.email, default_email));
    }
  } catch (e) {
    return res.status(500).json({ message: "Error updating user" });
  }

  res.clearCookie("token", {
    httpOnly: true,
  });

  return res.status(200).json({ message: "User updated" });
}
