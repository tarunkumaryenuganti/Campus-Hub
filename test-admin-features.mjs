import { prisma } from './src/lib/prisma-mock.ts';

async function testHackathonFeatures() {
    console.log("--- Testing Hackathon Features (Mock) ---");
    console.log("Prisma keys:", Object.keys(prisma));
    console.log("Prisma event:", prisma.event);

    // 1. Test Event Creation with new fields
    console.log("\nCreating hackathon event...");
    const newEvent = await prisma.event.create({
        data: {
            title: "Global AI Hackathon",
            category: "Coding",
            fees: 0,
            description: "World class hackathon",
            date: new Date(),
            time: "09:00 AM",
            locationLink: "https://hack.ai",
            isHackathon: true,
            creatorId: 'usr_manager'
        }
    });
    console.log(`✅ Success: Created "${newEvent.title}" with time: ${newEvent.time} and Hackathon status: ${newEvent.isHackathon}`);

    // 2. Test Club Creation
    console.log("\nCreating a new club...");
    const newClub = await prisma.club.create({
        data: {
            name: "Dev Wizards",
            description: "Magic with code",
            activities: "Weekly spells",
            ownerId: 'usr_club'
        }
    });
    console.log(`✅ Success: Created club "${newClub.name}" (ID: ${newClub.id})`);

    // 3. Test Following a club
    console.log("\nTesting following mechanic...");
    await prisma.clubFollow.create({
        data: {
            userId: 'usr_student',
            clubId: newClub.id
        }
    });
    const studentFollows = await prisma.clubFollow.findMany({
        where: { userId: 'usr_student' }
    });
    console.log(`Student now follows ${studentFollows.length} clubs.`);
    if (studentFollows.some(f => f.clubId === newClub.id)) {
        console.log("✅ Success: Follow relationship persisted.");
    } else {
        console.log("❌ Error: Follow relationship NOT found.");
    }

    // 4. Test User Interests & Personas
    console.log("\nVerifying personas...");
    const users = await prisma.user.findMany();
    const clubLeader = users.find(u => u.role === 'CLUB');
    console.log(`Club Leader count: ${users.filter(u => u.role === 'CLUB').length}`);
    if (clubLeader) {
        console.log(`✅ Success: "CLUB" persona exists in mock database.`);
    } else {
        console.log(`❌ Error: "CLUB" persona missing.`);
    }

    // 5. Cleanup / Final Check
    const events = await prisma.event.findMany({ where: { isHackathon: true } });
    console.log(`\nTotal hackathons in system: ${events.length}`);
}

testHackathonFeatures().catch(error => {
    console.error("Test failed:", error);
    process.exit(1);
});
