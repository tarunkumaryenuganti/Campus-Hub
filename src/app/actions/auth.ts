"use server"

import { signIn, signOut } from "@/auth"
import { redirect } from "next/navigation"

export async function login(formData: FormData): Promise<void> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Login attempt for:", email);

    try {
        await signIn("credentials", { email, password, redirectTo: "/dashboard" })
        console.log("Login successful for:", email);
    } catch (error: any) {
        // Next.js throws NEXT_REDIRECT on successful navigation. 
        if (error?.message === "NEXT_REDIRECT" || error?.digest?.includes("NEXT_REDIRECT")) {
            console.log("Redirecting user to dashboard...");
            throw error;
        }

        console.error("Login Action Error:", error.message || error);

        // redirect() is better for manual failure redirects
        redirect("/login?error=Invalid email or password")
    }
}

export async function logout(): Promise<void> {
    await signOut({ redirectTo: "/login?message=Successfully signed out" })
}

