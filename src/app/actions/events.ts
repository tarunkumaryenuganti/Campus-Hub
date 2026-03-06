"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { sendRSVPEmail } from "@/lib/nodemailer"
import { revalidatePath } from "next/cache"

export async function getEvents(creatorId?: string) {
    try {
        const events = await prisma.event.findMany({
            where: creatorId ? { creatorId } : {}
        })
        return { success: true, events }
    } catch (error) {
        console.error("Fetch Events Error:", error)
        return { success: false, error: "Failed to fetch events" }
    }
}

export async function createEvent(formData: {
    title: string;
    category: string;
    fees: number;
    description: string;
    date: Date;
    time?: string;
    locationLink?: string;
    isHackathon?: boolean;
}) {
    const session = await auth()
    if (!session || (session.user?.role !== "EVENT_MANAGER" && session.user?.role !== "ADMIN")) {
        throw new Error("Unauthorized to create events")
    }

    try {
        const event = await prisma.event.create({
            data: {
                ...formData,
                creatorId: session.user.id
            }
        })

        // HACKATHON FEATURE: Interest-based simulation
        const users = await prisma.user.findMany()
        const interestedUsers = users.filter((u: any) => {
            const userInterests = typeof u.interests === 'string' ? JSON.parse(u.interests) : u.interests
            return userInterests?.includes(formData.category)
        })

        if (interestedUsers.length > 0) {
            console.log(`[HACKATHON] Notifying ${interestedUsers.length} users interested in ${formData.category}: "${formData.title}"`)
        }

        revalidatePath("/")
        revalidatePath("/manager")
        return { success: true, event }
    } catch (error) {
        console.error("Create Event Error:", error)
        return { success: false, error: "Failed to create event" }
    }
}

export async function rsvpToEvent(eventId: string) {
    const session = await auth()
    if (!session?.user?.id || !session?.user?.email) {
        return { error: "Please sign in to RSVP for events." }
    }

    try {
        // Check if already RSVP'd
        const existing = await prisma.rSVP.findUnique({
            where: {
                userId_eventId: {
                    userId: session.user.id,
                    eventId: eventId
                }
            }
        })

        if (existing) {
            return { error: "You have already RSVP'd for this event" }
        }

        // Create RSVP in database
        const rsvp = await prisma.rSVP.create({
            data: {
                userId: session.user.id,
                eventId: eventId,
            }
        })

        // HACKATHON FEATURE (4.1): Reminder Simulation
        const event = await prisma.event.findUnique({ where: { id: eventId } })
        console.log(`[HACKATHON REMINDER] Sent Gmail reminder to ${session.user.email} for "${event?.title}"`)
        console.log(`[HACKATHON REMINDER] Added "${event?.title}" to Google Calendar for ${session.user.email} (Date: ${event?.date})`)

        revalidatePath("/")
        return { success: true }
    } catch (error: any) {
        console.error("RSVP Error:", error)
        return { error: "Failed to RSVP. Please try again." }
    }
}
