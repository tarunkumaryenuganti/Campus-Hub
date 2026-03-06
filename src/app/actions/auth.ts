"use server"

import { signIn } from "@/auth"

export async function login(formData: FormData): Promise<void> {
    try {
        await signIn("credentials", Object.fromEntries(formData))
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("CredentialsSignin")) {
                throw new Error("Invalid credentials")
            }
        }
        throw error
    }
}
