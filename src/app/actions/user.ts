"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function signup(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const college = formData.get("college") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string
    const clubName = formData.get("clubName") as string

    if (!email || !password || !role || !phone || !college) {
        return { error: "Missing required fields" }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                college,
                password: hashedPassword,
                role
            }
        })

        if (role === 'CLUB' && clubName) {
            await prisma.club.create({
                data: {
                    name: clubName,
                    description: `Official club for ${clubName}`,
                    ownerId: user.id
                }
            })
        }

        revalidatePath("/admin")
        return { success: true }
    } catch (error: any) {
        console.error("Signup Error:", error)
        return { error: error.message || "Failed to create account" }
    }
}
