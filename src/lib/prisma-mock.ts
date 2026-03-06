// Bulletproof Mock Prisma Client with In-Memory Storage
class MockPrisma {
    users: any[] = [
        {
            id: 'usr_student',
            email: 'student@gmail.com',
            name: 'Student User',
            password: '$2b$10$K.DpfsSMiGdDuyXuk93Ql3rsLjPaByWvS5M4jRGIr9',
            role: 'STUDENT',
            interests: '["Coding", "Technology"]',
            phone: '1234567890',
            college: 'CampusHub University'
        },
        {
            id: 'usr_manager',
            email: 'manager@gmail.com',
            name: 'Event Manager',
            password: '$2b$10$K.DpfsSMiGdDuyXuk93Ql3rsLjPaByWvS5M4jRGIr9',
            role: 'EVENT_MANAGER',
            interests: '[]',
            phone: '0987654321',
            college: 'CampusHub University'
        },
        {
            id: 'usr_club',
            email: 'club@gmail.com',
            name: 'Club Leader',
            password: '$2b$10$K.DpfsSMiGdDuyXuk93Ql3rsLjPaByWvS5M4jRGIr9',
            role: 'CLUB',
            interests: '[]',
            phone: '5551234567',
            college: 'CampusHub University'
        },
        {
            id: 'usr_admin',
            email: 'admin@gmail.com',
            name: 'System Admin',
            password: '$2b$10$K.DpfsSMiGdDuyXuk93Ql3rsLjPaByWvS5M4jRGIr9',
            role: 'ADMIN',
            interests: '[]',
            phone: '9998887777',
            college: 'CampusHub University'
        }
    ];

    events: any[] = [
        { id: 'evt_1', title: "Tech Symposium 2026", category: "Technology", fees: 15, date: new Date('2026-10-12'), time: "10:00 AM", locationLink: "https://meet.google.com/abc", isHackathon: false, description: "Annual tech conference", creatorId: 'usr_manager' },
        { id: 'evt_2', title: "Annual Cultural Fest", category: "Cultural", fees: 0, date: new Date('2026-11-05'), time: "6:00 PM", locationLink: "Auditorium", isHackathon: false, description: "Unity and culture celebration", creatorId: 'usr_manager' },
        { id: 'evt_3', title: "Inter-College Hackathon", category: "Coding", fees: 50, date: new Date('2026-12-01'), time: "9:00 AM", locationLink: "https://hackathon.io/campus", isHackathon: true, description: "24-hour coding challenge", creatorId: 'usr_manager' },
    ];

    clubs: any[] = [
        { id: 'club_1', name: "Coding Club", description: "The best club for devs", activities: "Weekly hack nights", ownerId: 'usr_club' }
    ];

    clubFollows: any[] = [];
    rsvps: any[] = [];

    user = {
        findUnique: async ({ where }: any) => {
            return this.users.find(u => u.email === where.email || u.id === where.id) || null;
        },
        findMany: async () => this.users,
        create: async ({ data }: any) => {
            const newUser = {
                id: `usr_${Math.random().toString(36).substr(2, 9)}`,
                ...data,
                interests: data.interests || '[]',
                phone: data.phone || null,
                college: data.college || null
            };
            this.users.push(newUser);
            return newUser;
        },
        update: async ({ where, data }: any) => {
            const idx = this.users.findIndex(u => u.id === where.id || u.email === where.email);
            if (idx === -1) throw new Error("User not found");
            this.users[idx] = { ...this.users[idx], ...data };
            return this.users[idx];
        }
    };

    event = {
        findMany: async (args?: any) => {
            let filtered = this.events;
            if (args?.where?.creatorId) {
                filtered = filtered.filter(e => e.creatorId === args.where.creatorId);
            }
            return filtered;
        },
        findUnique: async ({ where }: any) => {
            return this.events.find(e => e.id === where.id) || null;
        },
        create: async ({ data }: any) => {
            const newEvent = {
                id: `evt_${Math.random().toString(36).substr(2, 9)}`,
                ...data,
                date: data.date instanceof Date ? data.date : new Date(data.date)
            };
            this.events.push(newEvent);
            return newEvent;
        }
    };

    club = {
        findMany: async () => this.clubs,
        findUnique: async ({ where }: any) => this.clubs.find(c => c.id === where.id || c.ownerId === where.ownerId) || null,
        create: async ({ data }: any) => {
            const newClub = { id: `club_${Math.random().toString(36).substr(2, 9)}`, ...data };
            this.clubs.push(newClub);
            return newClub;
        }
    };

    clubFollow = {
        create: async ({ data }: any) => {
            const follow = { ...data };
            this.clubFollows.push(follow);
            return follow;
        },
        findMany: async ({ where }: any) => this.clubFollows.filter(f => f.userId === where.userId),
        delete: async ({ where }: any) => {
            this.clubFollows = this.clubFollows.filter(f => !(f.userId === where.userId_clubId.userId && f.clubId === where.userId_clubId.clubId));
            return { success: true };
        }
    };

    rSVP = {
        create: async ({ data }: any) => {
            const newRsvp = {
                id: `rsvp_${Math.random().toString(36).substr(2, 9)}`,
                ...data,
                timestamp: new Date(),
                event: this.events.find(e => e.id === data.eventId) || { title: "Unknown Event" }
            };
            this.rsvps.push(newRsvp);
            return newRsvp;
        },
        findUnique: async ({ where }: any) => {
            return this.rsvps.find(r => r.userId === where.userId_eventId?.userId && r.eventId === where.userId_eventId?.eventId) || null;
        }
    };

    rsvp = this.rSVP;

    constructor() {
    }


    $connect = async () => { };
    $disconnect = async () => { };
}

const prismaInstance = new MockPrisma();
export { prismaInstance as prisma };
export default prismaInstance;
