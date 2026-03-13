"use client"

import { useState, useEffect } from "react"
import { getUserProfile, updateProfile } from "../actions/userActions"
import { DashboardHeader } from "@/components/DashboardHeader"

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        college: "",
        interests: ""
    })
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getUserProfile()
            if (res.success && res.user) {
                setProfile(res.user)
                setFormData({
                    name: res.user.name || "",
                    phone: res.user.phone || "",
                    college: res.user.college || "",
                    interests: res.user.interests || ""
                })
            } else {
                setError(res.error || "Failed to load profile.")
            }
            setLoading(false)
        }
        fetchProfile()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        const res = await updateProfile(formData)
        if (res.success) {
            setIsEditing(false)
            // Re-fetch to seamlessly update view
            const updated = await getUserProfile()
            if (updated.success) setProfile(updated.user)
        } else {
            setError(res.error || "Failed to update profile.")
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen p-8 text-center text-red-600 font-bold">
                {error || "Could not load profile."}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-sans">
            <DashboardHeader portalName="My Profile" role={profile.role} userName={profile.name || profile.email} />

            <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Profile Details Card */}
                <div className="md:col-span-1 border border-slate-300 shadow-xl rounded-2xl p-6 bg-white/95 backdrop-blur-3xl transition-all h-fit">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                        <h2 className="text-2xl font-bold text-slate-900 font-medium">Personal Details</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-indigo-200 transition-colors"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">College/University</label>
                                <input
                                    type="text"
                                    value={formData.college}
                                    onChange={e => setFormData({ ...formData, college: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Interests (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.interests}
                                    onChange={e => setFormData({ ...formData, interests: e.target.value })}
                                    placeholder="e.g. Coding, Music, Sports"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors mt-4"
                            >
                                Save Changes
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email</p>
                                <p className="text-slate-900 font-medium">{profile.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Name</p>
                                <p className="text-slate-900 font-medium">{profile.name || "Not set"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Phone</p>
                                <p className="text-slate-900 font-medium">{profile.phone || "Not set"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">College</p>
                                <p className="text-slate-900 font-medium">{profile.college || "Not set"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Role</p>
                                <p className="text-indigo-700 font-bold">{profile.role}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Interests</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {profile.interests ? profile.interests.split(',').map((i: string, idx: number) => (
                                        <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 text-xs px-2 py-1 rounded">
                                            {i.trim()}
                                        </span>
                                    )) : (
                                        <p className="text-slate-900 font-medium text-sm">Not set</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RSVP History Card */}
                <div className="md:col-span-2 border border-slate-300 shadow-xl rounded-2xl p-6 bg-white/95 backdrop-blur-3xl h-fit">
                    <h2 className="text-2xl font-bold text-slate-900 font-medium mb-6 border-b border-slate-200 pb-4">My Events & RSVPs</h2>

                    {profile.rsvps && profile.rsvps.length > 0 ? (
                        <div className="space-y-4">
                            {profile.rsvps.map((rsvp: any) => (
                                <div key={rsvp.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-colors gap-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{rsvp.event.title}</h3>
                                        <p className="text-sm text-slate-600">Category: <span className="text-indigo-600 font-semibold">{rsvp.event.category}</span></p>
                                        <p className="text-sm text-slate-600">Event Date: {new Date(rsvp.event.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs text-slate-500 font-medium">RSVP'd on</p>
                                        <p className="text-sm text-slate-800 font-semibold">{new Date(rsvp.timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <span className="text-4xl block mb-4">🎫</span>
                            <p className="text-lg">You haven't RSVP'd to any events yet.</p>
                            <a href="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm mt-2 inline-block">Explore Events &rarr;</a>
                        </div>
                    )}
                </div>

            </main>
        </div>
    )
}
