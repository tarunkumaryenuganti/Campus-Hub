import Link from "next/link"
import { login } from "../actions/auth"
import { LoginButton } from "@/components/LoginButton"

export default async function LoginPage(props: { searchParams?: Promise<{ message?: string, error?: string }> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent p-4 font-sans text-white relative overflow-hidden">
            {/* Cinematic Background Image */}
            <div className="fixed inset-0 -z-20">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/images/campus-bg.png")' }}
                ></div>
                <div className="absolute inset-0 bg-[#070912]/40"></div>
            </div>

            {/* Background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-indigo-500/20">
                        <span className="text-3xl">🔑</span>
                    </div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-indigo-200/60 font-medium">Elevate your campus experience</p>
                </div>

                {searchParams?.message && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-bold text-sm text-center">
                        {searchParams.message}
                    </div>
                )}

                {searchParams?.error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold text-sm text-center">
                        {searchParams.error}
                    </div>
                )}

                <form action={login} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-2 ml-1">Username / Email</label>
                        <input
                            name="email"
                            type="text"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold placeholder-indigo-200/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all bg-clip-padding"
                            placeholder="e.g. tarun123"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold placeholder-indigo-200/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all bg-clip-padding"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-2">
                        <LoginButton />
                    </div>
                    
                    <p className="mt-8 text-center text-indigo-100/40 text-sm font-medium">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-white hover:text-indigo-400 font-black transition-colors underline decoration-indigo-500/30 underline-offset-4">Create one</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
