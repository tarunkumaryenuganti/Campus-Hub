import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    // Example RBAC logic
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")
    const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/manager")

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/dashboard", req.nextUrl))
        }
        return null
    }

    if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL("/login", req.nextUrl))
    }

    // Role Based Checks
    if (isLoggedIn) {
        const role = req.auth?.user?.role as string
        if (pathname.startsWith("/admin") && role !== "ADMIN") {
            return Response.redirect(new URL("/dashboard", req.nextUrl))
        }
        if (pathname.startsWith("/manager") && role !== "EVENT_MANAGER" && role !== "ADMIN") {
            return Response.redirect(new URL("/dashboard", req.nextUrl))
        }
    }

    return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
