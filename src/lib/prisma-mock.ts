import fs from "fs";
import path from "path";

// Bulletproof Mock Prisma Client with Persistent JSON Storage
class MockPrisma {
    private dbPath = path.join(process.cwd(), "prisma", "mock-db.json");

    users: any[] = [];
    events: any[] = [];
    clubs: any[] = [];
    clubFollows: any[] = [];
    rsvps: any[] = [];

    private loadData() {
        try {
            if (fs.existsSync(this.dbPath)) {
                const data = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
                this.users = data.users || [];
                this.events = data.events || [];
                this.clubs = data.clubs || [];
                this.clubFollows = data.clubFollows || [];
                this.rsvps = data.rsvps || [];
            } else {
                this.resetToDefaults();
            }
        } catch (e) {
            console.error("Failed to load mock DB:", e);
            this.resetToDefaults();
        }
    }

    private saveData() {
        try {
            const dir = path.dirname(this.dbPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            fs.writeFileSync(this.dbPath, JSON.stringify({
                users: this.users,
                events: this.events,
                clubs: this.clubs,
                clubFollows: this.clubFollows,
                rsvps: this.rsvps
            }, null, 2));
        } catch (e) {
            console.error("Failed to save mock DB:", e);
        }
    }

    private resetToDefaults() {
        this.users = [
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
        this.events = [
            { id: 'evt_1', title: "Tech Symposium 2026", category: "Technology", fees: 15, date: '2026-10-12', time: "10:00 AM", locationLink: "https://meet.google.com/abc", isHackathon: false, description: "Annual tech conference", creatorId: 'usr_manager' },
            { id: 'evt_2', title: "Annual Cultural Fest", category: "Cultural", fees: 0, date: '2026-11-05', time: "6:00 PM", locationLink: "Auditorium", isHackathon: false, description: "Unity and culture celebration", creatorId: 'usr_manager' },
            { id: 'evt_3', title: "Inter-College Hackathon", category: "Coding", fees: 50, date: '2026-12-01', time: "9:00 AM", locationLink: "https://hackathon.io/campus", isHackathon: true, description: "24-hour coding challenge", creatorId: 'usr_manager' },
        ];
        this.saveData();
    }
    user = {
        findUnique: async ({ where }: any) => {
            this.loadData();
            return this.users.find(u => u.email === where.email || u.id === where.id) || null;
        },
        findMany: async () => {
            this.loadData();
            return this.users;
        },
        create: async ({ data }: any) => {
            this.loadData();
            const newUser = {
                id: `usr_${Math.random().toString(36).substr(2, 9)}`,
                ...data,
                interests: data.interests || '[]',
                phone: data.phone || null,
                college: data.college || null
            };
            this.users.push(newUser);
            this.saveData();
            return newUser;
        },
        update: async ({ where, data }: any) => {
            this.loadData();
            const idx = this.users.findIndex(u => u.id === where.id || u.email === where.email);
            if (idx === -1) throw new Error("User not found");
            this.users[idx] = { ...this.users[idx], ...data };
            this.saveData();
            return this.users[idx];
        }
    };

    event = {
        findMany: async (args?: any) => {
            this.loadData();
            let filtered = this.events;
            if (args?.where?.creatorId) {
                filtered = filtered.filter(e => e.creatorId === args.where.creatorId);
            }
            return filtered;
        },
        findUnique: async ({ where }: any) => {
            this.loadData();
            return this.events.find(e => e.id === where.id) || null;
        },
        create: async ({ data }: any) => {
            this.loadData();
            const newEvent = {
                id: `evt_${Math.random().toString(36).substr(2, 9)}`,
                ...data,
                date: data.date instanceof Date ? data.date.toISOString() : data.date
            };
            this.events.push(newEvent);
            this.saveData();
            return newEvent;
        }
    };

    club = {
        findMany: async () => {
            this.loadData();
            return this.clubs;
        },
        findUnique: async ({ where }: any) => {
            this.loadData();
            return this.clubs.find(c => c.id === where.id || c.ownerId === where.ownerId) || null;
        },
        create: async ({ data }: any) => {
            this.loadData();
            const newClub = { id: `club_${Math.random().toString(36).substr(2, 9)}`, ...data };
            this.clubs.push(newClub);
            this.saveData();
            return newClub;
        }
    };

    clubFollow = {
        create: async ({ data }: any) => {
            this.loadData();
            const follow = { ...data };
            this.clubFollows.push(follow);
            this.saveData();
            return follow;
        },
        findMany: async ({ where }: any) => {
            this.loadData();
            return this.clubFollows.filter(f => f.userId === where.userId);
        },
        delete: async ({ where }: any) => {
            this.loadData();
            this.clubFollows = this.clubFollows.filter(f => !(f.userId === where.userId_clubId.userId && f.clubId === where.userId_clubId.clubId));
            this.saveData();
            return { success: true };
        }
    };

    rSVP = {
        create: async ({ data }: any) => {
            this.loadData();
            const newRsvp = {
                id: `rsvp_${Math.random().toString(36).substr(2, 9)}`,
                ...data,
                timestamp: new Date().toISOString(),
                event: this.events.find(e => e.id === data.eventId) || { title: "Unknown Event" }
            };
            this.rsvps.push(newRsvp);
            this.saveData();
            return newRsvp;
        },
        findUnique: async ({ where }: any) => {
            this.loadData();
            return this.rsvps.find(r => r.userId === where.userId_eventId?.userId && r.eventId === where.userId_eventId?.eventId) || null;
        }
    };

    rsvp = this.rSVP;

    constructor() {
        this.loadData();
    }


    $connect = async () => { };
    $disconnect = async () => { };
}

const prismaInstance = new MockPrisma();
export { prismaInstance as prisma };
export default prismaInstance;
