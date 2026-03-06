"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function login(formData: FormData): Promise<void> {
    try {
        await signIn("credentials", Object.fromEntries(formData))
    } catch (error) {
        if (error instanceof Error && error.message.includes("CredentialsSignin")) {
            redirect("/login?error=Invalid email or password")
        }
        throw error
    }
}
