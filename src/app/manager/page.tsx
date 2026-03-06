"use client"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { getEvents } from "@/app/actions/events"
import { CreateEventForm } from "@/components/CreateEventForm"
import { useSession } from "next-auth/react"
import { DashboardHeader } from "@/components/DashboardHeader"

export default function ManagerDashboard() {
    const { data: session, status } = useSession()
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [mounted, setMounted] = useState(false)

    const fetchEvents = async () => {
        if (!session?.user?.id) return
        const res = await getEvents(session.user.id)
        if (res.success) {
            setEvents(res.events || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        setMounted(true)
        if (status === "unauthenticated") redirect("/login")
        if (session && session.user?.role !== "EVENT_MANAGER" && session.user?.role !== "ADMIN") {
            redirect("/dashboard")
        }
        if (session) fetchEvents()
    }, [session, status])

    if (status === "loading" || loading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <DashboardHeader
                portalName="Manager Portal"
                role={session?.user?.role || "MANAGER"}
                userName={session?.user?.name || "Manager"}
            />
            <div className="max-w-7xl mx-auto">
                <div className="bg-amber-500/5 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-amber-400 mb-2">
                                Event Management
                            </h1>
                            <p className="text-amber-200/70">Create and manage major university events</p>
                        </div>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-200"
                        >
                            {showForm ? "Close Form" : "+ Post New Event"}
                        </button>
                    </div>

                    {showForm && (
                        <div className="mb-12 max-w-2xl">
                            <h2 className="text-xl font-bold text-white mb-4">Create New Event</h2>
                            <CreateEventForm onSuccess={() => {
                                setShowForm(false)
                                fetchEvents()
                            }} />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-black/40 rounded-xl p-6 border border-amber-500/10">
                            <h3 className="text-sm font-medium text-amber-200 mb-2">Active Events</h3>
                            <p className="text-3xl font-bold text-white">{events.length}</p>
                        </div>
                        <div className="bg-black/40 rounded-xl p-6 border border-amber-500/10">
                            <h3 className="text-sm font-medium text-amber-200 mb-2">Total RSVPs</h3>
                            <p className="text-3xl font-bold text-white">1,240</p>
                        </div>
                        <div className="bg-black/40 rounded-xl p-6 border border-amber-500/10">
                            <h3 className="text-sm font-medium text-amber-200 mb-2">Revenue (Fees)</h3>
                            <p className="text-3xl font-bold text-white">₹{events.reduce((acc, e) => acc + (e.fees || 0), 0) * 10}</p>
                        </div>
                    </div>

                    <div className="bg-black/40 rounded-xl overflow-hidden border border-white/5">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-amber-200 text-sm">
                                <tr>
                                    <th className="px-6 py-4">Event Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Fees</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                {events.map(evt => (
                                    <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium">{evt.title}</td>
                                        <td className="px-6 py-4">{evt.category}</td>
                                        <td className="px-6 py-4">{mounted ? new Date(evt.date).toLocaleDateString() : '...'}</td>
                                        <td className="px-6 py-4">₹{evt.fees}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Active</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
