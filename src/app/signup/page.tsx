"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup } from "../actions/user"
import Link from "next/link"

export default function SignupPage() {
    const [role, setRole] = useState("STUDENT")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError("")
        const res = await signup(formData)
        if (res.success) {
            router.push("/login?message=Account created! Please sign in.")
        } else {
            setError(res.error || "Signup failed")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Join CampusHub</h1>
                    <p className="text-indigo-200/60">Create your account to get started</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-2">Full Name</label>
                        <input
                            name="name"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="Alex Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-indigo-100 mb-2">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="alex@university.edu"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-indigo-100 mb-2">Phone Number</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-2">College / University</label>
                        <input
                            name="college"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="CampusHub University"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-2">I am a...</label>
                        <select
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option value="STUDENT" className="bg-slate-900">Student</option>
                            <option value="EVENT_MANAGER" className="bg-slate-900">Event Manager</option>
                            <option value="CLUB" className="bg-slate-900">Club Leader</option>
                        </select>
                    </div>

                    {role === 'CLUB' && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-sm font-medium text-indigo-100 mb-2">Club Name</label>
                            <input
                                name="clubName"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500/50 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="e.g. Robotics Club"
                            />
                        </div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-indigo-200/50 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign In</Link>
                </p>
            </div>
        </div>
    )
}
