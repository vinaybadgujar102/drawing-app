import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET, PORT } from "@repo/backend-common/config";
// do zod validation later

const app = express();

app.post("/signup", (req, res) => {
  // db call

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
