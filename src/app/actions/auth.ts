"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function login(formData: FormData): Promise<void> {
    try {
        await signIn("credentials", Object.fromEntries(formData))
    } catch (error: any) {
        // Next.js throws NEXT_REDIRECT on successful navigation. 
        // We must re-throw it so the user actually gets redirected to the dashboard.
        if (error?.message === "NEXT_REDIRECT" || error?.digest?.includes("NEXT_REDIRECT")) {
            throw error;
        }

        // For any other error (AuthError, CredentialsSignin, etc), redirect to login with error parameter
        redirect("/login?error=Invalid email or password")
    }
}
