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

export async function getUserProfile() {
    const session = await auth()
    if (!session || !session.user?.email) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                rsvps: {
                    include: {
                        event: true
                    },
                    orderBy: {
                        timestamp: 'desc'
                    }
                }
            }
        })

        if (!user) return { success: false, error: "User not found" }

        // Remove password before sending to client
        const { password, ...safeUser } = user
        return { success: true, user: safeUser }
    } catch (error) {
        console.error("Get Profile Error:", error)
        return { success: false, error: "Failed to fetch profile" }
    }
}

export async function updateProfile(data: { name?: string, phone?: string, college?: string, interests?: string }) {
    const session = await auth()
    if (!session || !session.user?.email) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: data.name,
                phone: data.phone,
                college: data.college,
                // If interests comes in as a comma separated string, save it directly (or parse if needed)
                interests: data.interests
            }
        })
        revalidatePath("/profile")
        return { success: true }
    } catch (error) {
        console.error("Update Profile Error:", error)
        return { success: false, error: "Failed to update profile" }
    }
}

export async function getClubs() {
    try {
        const clubs = await prisma.club.findMany()
        return { success: true, clubs }
    } catch (error) {
        console.error("Get Clubs Error:", error)
        return { success: false, error: "Failed to fetch clubs" }
    }
}

export async function getClubByEmail(email: string) {
    try {
        const club = await prisma.user.findUnique({
            where: { email },
            include: {
                eventsCreated: true
            }
        })
        return { success: true, club }
    } catch (error) {
        return { success: false, error: "Failed to fetch club" }
    }
}

export async function getClubDetails(id: string) {
    try {
        const club = await prisma.club.findUnique({
            where: { id },
            include: {
                followers: true
            }
        })
        return { success: true, club }
    } catch (error) {
        console.error("Get Club Details Error:", error)
        return { success: false, error: "Failed to fetch club details" }
    }
}
