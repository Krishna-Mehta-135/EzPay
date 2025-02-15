import {z} from "zod";

export const registerUserSchema = z.object({
    username: z
    .string()
    .min(3,"Min 3 letters are needed to create a username")
    .max(20,"Max 20 characters are allowed")
    .trim(),
    email: z.string().email("Invalid email format").trim(),
    fullName: z.string().min(1, "Full name is required").trim(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})