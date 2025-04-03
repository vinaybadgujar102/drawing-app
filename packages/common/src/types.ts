import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
});

export const SignInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(1),
});
