import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    session: { strategy: "jwt" },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as any
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
    },
    trustHost: true
} satisfies NextAuthConfig
