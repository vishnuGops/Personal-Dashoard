"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function signupUser(formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const validatedData = signupSchema.parse(rawData);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            if (existingUser.password) {
                return { error: "An account with this email already exists and has a password. Please sign in." };
            }

            // User exists from OAuth but has no password -> Link accounts by adding password
            const hashedPassword = await bcrypt.hash(validatedData.password, 10);

            await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    password: hashedPassword,
                    name: existingUser.name || validatedData.name, // Keep existing name if present
                },
            });

            return { success: true, linked: true };
        }

        // Completely new user
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
            },
        });

        return { success: true };

    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.issues[0].message };
        }
        console.error("Signup error:", error);
        return { error: "Something went wrong during sign up. Please try again." };
    }
}
