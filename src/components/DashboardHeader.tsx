"use client"

import Link from "next/link"
import { logout } from "@/app/actions/auth"
import { Sparkles, User, LogOut, Home as HomeIcon, LayoutGrid } from "lucide-react"

interface DashboardHeaderProps {
    portalName: string;
    role: string;
    userName?: string;
}

export function DashboardHeader({ portalName, role, userName }: DashboardHeaderProps) {
    return (
        <nav className="flex justify-between items-center max-w-7xl mx-auto mb-12 px-6 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] sticky top-6 z-50 shadow-2xl overflow-hidden">
            {/* Background blur highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-6 relative z-10">
                <Link href="/">
                    <div className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
                            CampusHub
                        </h1>
                    </div>
                </Link>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-400 leading-none mb-1">{portalName}</span>
                    <span className="text-sm font-bold text-white/80">{userName}</span>
                </div>
            </div>

            <div className="flex items-center gap-8 relative z-10">
                <div className="hidden lg:flex items-center gap-6">
                    <Link href="/clubs" className="text-sm font-black text-white/40 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4" /> Clubs
                    </Link>
                    <Link href="/" className="text-sm font-black text-white/40 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2">
                        <HomeIcon className="w-4 h-4" /> Home
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/profile"
                        className="px-5 py-2.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 uppercase tracking-widest flex items-center gap-2"
                    >
                        <User className="w-4 h-4" /> Profile
                    </Link>
                    
                    <form action={logout}>
                        <button
                            type="submit"
                            className="p-2.5 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white/40 hover:text-white rounded-xl transition-all border border-white/10 group"
                        >
                            <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
