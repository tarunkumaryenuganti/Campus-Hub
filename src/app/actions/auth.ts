"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function login(formData: FormData): Promise<void> {
    try {
        await signIn("credentials", Object.fromEntries(formData))
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    redirect("/login?error=Invalid email or password")
                default:
                    redirect("/login?error=Authentication failed")
            }
        }
        throw error
    }
}
