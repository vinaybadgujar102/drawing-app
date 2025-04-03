import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET, PORT } from "@repo/backend-common/config";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";

// do zod validation later

const app = express();

app.post("/signup", (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ error: parsedData.error });
    return;
  }

  res.json({
    userId: 1,
  });
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  // db call

  res.json({
    roomId: 1,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
