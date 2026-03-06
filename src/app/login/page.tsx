import Link from "next/link"
import { login } from "../actions/auth"

export default async function LoginPage(props: { searchParams?: Promise<{ message?: string, error?: string }> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">CampusHub</h1>
                    <p className="text-indigo-200">Sign in to your university ecosystem</p>
                </div>

                {searchParams?.message && (
                    <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-200 text-sm">
                        {searchParams.message}
                    </div>
                )}

                {searchParams?.error && (
                    <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">
                        {searchParams.error}
                    </div>
                )}

                <form action={login} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="student@university.edu"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-100 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                    >
                        Sign In
                    </button>
                    <p className="mt-4 text-center text-indigo-200 text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">Create one</Link>
                    </p>
                </form>

                <div className="mt-8 text-center text-[10px] text-indigo-200/40 space-y-1">
                    <p>Student: student@gmail.com / password123</p>
                    <p>Manager: manager@gmail.com / password123</p>
                    <p>Club: club@gmail.com / password123</p>
                    <p>Admin: admin@gmail.com / password123</p>
                </div>
            </div>
        </div>
    )
}
