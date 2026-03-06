"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

interface DashboardHeaderProps {
    portalName: string;
    role: string;
    userName?: string;
}

export function DashboardHeader({ portalName, role, userName }: DashboardHeaderProps) {
    return (
        <nav className="flex justify-between items-center max-w-7xl mx-auto mb-8 py-4 border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link href="/">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        CampusHub
                    </h1>
                </Link>
                <div className="h-6 w-px bg-white/10" />
                <span className="text-indigo-200 font-semibold">{portalName}</span>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-white text-sm font-medium">{userName}</span>
                    <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">{role}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm text-indigo-200 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/10"
                    >
                        Home
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 text-white"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    )
}
