"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/DashboardHeader"

export default function ClubDashboard() {
    const { data: session, status } = useSession()
    const [clubInfo, setClubInfo] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") redirect("/login")
        if (session && session.user?.role !== "CLUB" && session.user?.role !== "ADMIN") {
            redirect("/dashboard")
        }

        // Mock fetch club info
        if (session?.user?.id) {
            setClubInfo({
                name: "Robotics Club",
                description: "Exploring the future of automation",
                activities: "Weekly workshop on Arduino",
                followers: 124
            })
            setLoading(false)
        }
    }, [session, status])

    if (status === "loading" || loading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Club Portal...</div>
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white font-sans">
            <div className="max-w-7xl mx-auto text-white">
                <DashboardHeader
                    portalName="Club Portal"
                    role="CLUB LEADER"
                    userName={session?.user?.name || "Leader"}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold mb-4 text-purple-400">{clubInfo?.name}</h2>
                            <p className="text-indigo-100/60 mb-6">{clubInfo?.description}</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                    <p className="text-xs text-indigo-300 uppercase tracking-wider mb-1">Followers</p>
                                    <p className="text-2xl font-bold">{clubInfo?.followers}</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                    <p className="text-xs text-indigo-300 uppercase tracking-wider mb-1">Activity Level</p>
                                    <p className="text-2xl font-bold text-green-400">High</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6 flex justify-between items-center">
                                Recent Activities
                                <button className="text-sm px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">Post Update</button>
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                                    <p className="font-medium">Arduino Workshop - Part 2</p>
                                    <p className="text-sm text-indigo-100/40">Posted 2 days ago</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                                    <p className="font-medium">Project Expo Registration Open</p>
                                    <p className="text-sm text-indigo-100/40">Posted 1 week ago</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-8">
                            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3">
                                    <span>📢</span> Create Announcement
                                </button>
                                <button className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3">
                                    <span>🗓️</span> Schedule Meeting
                                </button>
                                <button className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3">
                                    <span>👥</span> Export Member List
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
