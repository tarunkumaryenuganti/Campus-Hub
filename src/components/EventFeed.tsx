"use client"

import { useState, useEffect } from "react"
import { rsvpToEvent, getEvents } from "@/app/actions/events"

const CATEGORIES = ['All', 'Technology', 'Cultural', 'Coding', 'Design', 'Gaming']

const CATEGORY_IMAGES = {
    Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    Cultural: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    Coding: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    Design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
    Gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    Default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
}

export function EventFeed() {
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [selectedEvent, setSelectedEvent] = useState<any>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
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
                            ? "bg-indigo-500/20 border-indigo-500 text-indigo-700 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            : "bg-white/95 backdrop-blur-xl border-slate-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-slate-900 font-medium"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(evt => (
                    <div key={evt.id} className="group relative bg-white/95 backdrop-blur-xl backdrop-blur-md border border-slate-300 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                        <div className="h-48 w-full relative">
                            <img
                                src={CATEGORY_IMAGES[evt.category as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES.Default}
                                alt={evt.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold px-2 py-1 bg-indigo-500/20 text-indigo-700 rounded border border-indigo-500/30">
                                    {evt.category}
                                </span>
                                <span className="text-sm text-purple-800 font-mono">
                                    {mounted ? new Date(evt.date).toLocaleDateString() : '...'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-700 font-semibold transition-colors">{evt.title}</h3>
                            <p className="text-sm text-slate-900 font-medium mb-6">{evt.description || "Join hundreds of students in this amazing event."}</p>

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">{evt.fees === 0 ? "Free" : `₹${evt.fees}`}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedEvent(evt)}
                                        className="px-4 py-2 bg-white text-slate-900 backdrop-blur-xl hover:bg-white/95 rounded-lg font-medium transition-colors border border-slate-400"
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
                    <div className="col-span-full py-12 text-center text-slate-900 font-medium">
                        No events found for this category.
                    </div>
                )}
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/95 backdrop-blur-xl backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
                    <div className="bg-white/95 backdrop-blur-xl border border-slate-300 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="h-64 w-full relative">
                            <img
                                src={CATEGORY_IMAGES[selectedEvent.category as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES.Default}
                                alt={selectedEvent.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 bg-white/95 backdrop-blur-xl hover:bg-white text-slate-900 font-medium rounded-full p-2 transition-colors w-8 h-8 flex items-center justify-center font-bold z-10"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold px-2 py-1 bg-indigo-500/20 text-indigo-700 rounded border border-indigo-500/30">
                                    {selectedEvent.category}
                                </span>
                                <span className="text-lg font-bold text-green-400">
                                    {selectedEvent.fees === 0 ? "Free" : `₹${selectedEvent.fees}`}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-slate-900 font-medium">{selectedEvent.title}</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-700 font-semibold mt-1">📅</span>
                                    <div>
                                        <p className="text-sm text-indigo-800 uppercase tracking-wider font-bold">Date & Time</p>
                                        <p className="text-slate-900 font-medium">
                                            {mounted ? new Date(selectedEvent.date).toLocaleDateString() : '...'} • {selectedEvent.time || 'TBA'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-700 font-semibold mt-1">📍</span>
                                    <div>
                                        <p className="text-sm text-indigo-800 uppercase tracking-wider font-bold">Venue / Link</p>
                                        {selectedEvent.locationLink ? (
                                            <a href={selectedEvent.locationLink} target="_blank" rel="noreferrer" className="text-purple-700 font-semibold hover:text-purple-300 underline underline-offset-2 break-all">
                                                {selectedEvent.locationLink}
                                            </a>
                                        ) : (
                                            <p className="text-slate-900 font-medium">TBA</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-700 font-semibold mt-1">📄</span>
                                    <div>
                                        <p className="text-sm text-indigo-800 uppercase tracking-wider font-bold">Brochure & Details</p>
                                        <p className="text-slate-900 font-medium whitespace-pre-line">{selectedEvent.description || "No specific details provided."}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-slate-300 mt-6">
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
