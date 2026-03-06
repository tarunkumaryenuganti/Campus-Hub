import NextAuth, { type DefaultSession } from "next-auth"
import type { DefaultUser } from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            role: string
            interests: string[]
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        role: string
        interests: string[]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string
        id: string
    }
}
