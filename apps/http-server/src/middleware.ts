import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // @ts-ignore
  // TODO: fix this
  req.userId = decoded.userId;
  next();
}
