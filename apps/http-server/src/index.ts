import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET, PORT } from "@repo/backend-common/config";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";

import bcrypt from "bcrypt";

import { prisma } from "@repo/db/client";
// do zod validation later

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({ error: parsedData.error });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });

    res.json({
      userId: newUser.id,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ error: parsedData.error });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }
});

app.post("/room", middleware, async (req, res) => {
  try {
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({ error: parsedData.error });
      return;
    }

    // @ts-ignore
    const userId = req.userId;

    const room = await prisma.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    // db call
    res.json({
      roomId: room.id,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to create room" });
  }
});

app.get("/chats/:roomId", middleware, async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);

    const messages = await prisma.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });

    res.json({ messages });
  } catch (error) {
    res.status(400).json({ error: "Failed to get chats" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
