const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    // Create mock users for each role
    const admin = await prisma.user.upsert({
        where: { email: 'admin@campushub.edu' },
        update: {},
        create: {
            email: 'admin@campushub.edu',
            name: 'Admin User',
            password,
            role: 'ADMIN',
        },
    })

    const manager = await prisma.user.upsert({
        where: { email: 'manager@campushub.edu' },
        update: {},
        create: {
            email: 'manager@campushub.edu',
            name: 'Event Manager',
            password,
            role: 'EVENT_MANAGER',
        },
    })

    const student = await prisma.user.upsert({
        where: { email: 'student@campushub.edu' },
        update: {},
        create: {
            email: 'student@campushub.edu',
            name: 'Student User',
            password,
            role: 'STUDENT',
            interests: 'Coding, Technology',
        },
    })

    // Create initial events
    const events = [
        { title: "Tech Symposium 2026", category: "Technology", fees: 15, date: new RegExp('2026-10-12').source, creatorId: manager.id, description: "Deep dive into future tech." },
        { title: "Annual Cultural Fest", category: "Cultural", fees: 0, date: new RegExp('2026-11-05').source, creatorId: manager.id, description: "Music, dance, and arts." },
        { title: "Inter-College Hackathon", category: "Coding", fees: 50, date: new RegExp('2026-12-01').source, creatorId: manager.id, description: "24 hours of coding." },
    ]

    for (const event of events) {
        await prisma.event.create({
            data: {
                title: event.title,
                category: event.category,
                fees: event.fees,
                date: new Date(event.date),
                creatorId: event.creatorId,
                description: event.description,
            }
        })
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
