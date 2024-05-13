import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

import { usersTable } from "./db/schema";
import { db } from "./db/db";

const app: Express = express();
const port = 3002;

app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());

app.post("/register", async (req: Request, res: Response) => {
  const {
    name,
    surname,
    birthdate,
    address,
    password,
    email,
  } = req.body;

  if (!name || !surname || !birthdate || !address || !password || !email) {
    return res.status(400).json({
      type: "error",
      message: "Missing required fields",
    });
  }

  // Check if user already exists
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
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.insert(usersTable).values({
      name,
      surname,
      birthdate,
      address,
      password: hashedPassword,
      email,
    })

    res.status(201).json({
      type: "success",
      message: "You have successfully registered your account",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      type: "error",
      message: "User creation failed",
    });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password, persist } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      type: "error",
      message: "Missing required fields",
    });
  }

  const user = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user) {
    return res.status(400).json({
      type: "error",
      message: "User not found",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({
      type: "error",
      message: "Invalid credentials",
    });
  }

  res.status(200).json({
    type: "success",
    message: "You have successfully logged in",
  });
})

app.get("/", async (_, res: Response) => {
  res.status(200).send("Hello World!");

  /* const query = `
    SELECT DATE(dateOfCreation) AS date, COUNT(*) AS users_gain
    FROM users
    WHERE dateOfCreation >= date('now', '-7 days')
    GROUP BY DATE(dateOfCreation)
    ORDER BY DATE(dateOfCreation);
  `; */
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
