"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getUsers() {
    const session = await auth()
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    try {
        const users = await prisma.user.findMany()
        return { success: true, users }
    } catch (error) {
        console.error("Get Users Error:", error)
        return { success: false, error: "Failed to fetch users" }
    }
}

export async function updateUserRole(userId: string, newRole: string) {
    const session = await auth()
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        })
        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("Update Role Error:", error)
        return { success: false, error: "Failed to update role" }
    }
}
