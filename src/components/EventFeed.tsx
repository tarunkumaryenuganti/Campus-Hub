"use client"

import { useState, useEffect } from "react"
import { rsvpToEvent, getEvents } from "@/app/actions/events"

const CATEGORIES = ['All', 'Technology', 'Cultural', 'Coding', 'Design', 'Gaming']

export function EventFeed() {
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [selectedEvent, setSelectedEvent] = useState<any>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await getEvents()
            if (res.success) {
                setEvents(res.events || [])
            }
            setLoading(false)
        }
        fetchEvents()
    }, [])

    const filteredEvents = activeCategory === 'All'
        ? events
        : events.filter(e => e.category === activeCategory)

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full border transition-all font-medium ${activeCategory === cat
                            ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            : "bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-white"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(evt => (
                    <div key={evt.id} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                        <div className="h-48 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 w-full flex items-center justify-center">
                            <span className="text-4xl">🎟️</span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                                    {evt.category}
                                </span>
                                <span className="text-sm text-purple-200 font-mono">
                                    {new Date(evt.date).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{evt.title}</h3>
                            <p className="text-sm text-white/50 mb-6">{evt.description || "Join hundreds of students in this amazing event."}</p>

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">{evt.fees === 0 ? "Free" : `₹${evt.fees}`}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedEvent(evt)}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors border border-white/5"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={async () => {
                                            const res = await rsvpToEvent(evt.id)
                                            if (res.success) alert("RSVP Successful! Check your mock email.")
                                            else alert(res.error)
                                        }}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
                                    >
                                        RSVP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredEvents.length === 0 && (
                    <div className="col-span-full py-12 text-center text-white/50">
                        No events found for this category.
                    </div>
                )}
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
                    <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="h-40 bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 w-full flex items-center justify-center relative">
                            <span className="text-6xl">🎟️</span>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors w-8 h-8 flex items-center justify-center font-bold"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                                    {selectedEvent.category}
                                </span>
                                <span className="text-lg font-bold text-green-400">
                                    {selectedEvent.fees === 0 ? "Free" : `₹${selectedEvent.fees}`}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-white">{selectedEvent.title}</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-400 mt-1">📅</span>
                                    <div>
                                        <p className="text-sm text-indigo-200 uppercase tracking-wider font-bold">Date & Time</p>
                                        <p className="text-white">{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time || 'TBA'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-400 mt-1">📍</span>
                                    <div>
                                        <p className="text-sm text-indigo-200 uppercase tracking-wider font-bold">Venue / Link</p>
                                        {selectedEvent.locationLink ? (
                                            <a href={selectedEvent.locationLink} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 break-all">
                                                {selectedEvent.locationLink}
                                            </a>
                                        ) : (
                                            <p className="text-white">TBA</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-400 mt-1">📄</span>
                                    <div>
                                        <p className="text-sm text-indigo-200 uppercase tracking-wider font-bold">Brochure & Details</p>
                                        <p className="text-white whitespace-pre-line">{selectedEvent.description || "No specific details provided."}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-white/10 mt-6">
                                <button
                                    onClick={async () => {
                                        const res = await rsvpToEvent(selectedEvent.id)
                                        if (res.success) {
                                            alert("RSVP Successful! Check your mock email.")
                                            setSelectedEvent(null)
                                        }
                                        else alert(res.error)
                                    }}
                                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-1 w-full sm:w-auto"
                                >
                                    Confirm RSVP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
