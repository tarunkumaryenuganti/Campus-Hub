"use client"

import { useState } from "react"
import { createEvent } from "@/app/actions/events"

export function CreateEventForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "Technology",
        fees: 0,
        description: "",
        date: "",
        time: "10:00 AM",
        locationLink: "",
        isHackathon: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await createEvent({
                ...formData,
                date: new Date(formData.date)
            })
            if (res.success) {
                alert("Event created successfully!")
                setFormData({ title: "", category: "Technology", fees: 0, description: "", date: "", time: "10:00 AM", locationLink: "", isHackathon: false })
                onSuccess()
            } else {
                alert(res.error)
            }
        } catch (err: any) {
            alert(err.message)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Event Details</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isHackathon}
                        onChange={(e) => setFormData({ ...formData, isHackathon: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm font-medium text-amber-400">Is Hackathon?</span>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-indigo-300 mb-1">Event Title</label>
                <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Hackathon 2026"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-1">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                        <option>Technology</option>
                        <option>Cultural</option>
                        <option>Coding</option>
                        <option>Design</option>
                        <option>Gaming</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-1">Fees (₹)</label>
                    <input
                        type="number"
                        value={formData.fees}
                        onChange={(e) => setFormData({ ...formData, fees: parseInt(e.target.value) })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-1">Date</label>
                    <input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-1">Time</label>
                    <input
                        type="text"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="e.g. 10:00 AM"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-indigo-300 mb-1">Location / Join Link</label>
                <input
                    type="text"
                    value={formData.locationLink}
                    onChange={(e) => setFormData({ ...formData, locationLink: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Auditorium or https://zoom.us/..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-indigo-300 mb-1">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 h-24"
                    placeholder="Briefly describe the event..."
                />
            </div>
            <button
                disabled={loading}
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
                {loading ? "Creating..." : "Post Event"}
            </button>
        </form>
    )
}
