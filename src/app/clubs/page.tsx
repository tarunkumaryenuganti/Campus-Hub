"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getClubs } from "../actions/userActions"

export default function ClubDirectory() {
    const [clubs, setClubs] = useState<any[]>([])
    const [followed, setFollowed] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchClubs = async () => {
            const res = await getClubs()
            if (res.success) {
                setClubs(res.clubs || [])
            }
            setLoading(false)
        }
        fetchClubs()
    }, [])

    const toggleFollow = (clubId: string) => {
        if (followed.includes(clubId)) {
            setFollowed(followed.filter(id => id !== clubId))
        } else {
            setFollowed([...followed, clubId])
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#070912] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#070912] p-8 text-white font-sans relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <nav className="flex justify-between items-center mb-20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <span className="text-xl">🏛️</span>
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent tracking-tight">
                            Campus Guilds
                        </h1>
                    </div>
                    <Link href="/" className="px-5 py-2.5 bg-white/5 text-white/90 backdrop-blur-xl border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                        Return Home
                    </Link>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clubs.length > 0 ? clubs.map(club => (
                        <Link 
                            key={club.id} 
                            href={`/clubs/${club.id}`}
                            className="group bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2 shadow-2xl block relative"
                        >
                            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                <span className="text-2xl text-indigo-400">✨</span>
                            </div>
                            <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{club.name}</h3>
                            <p className="text-sm text-indigo-100/40 font-medium mb-8 leading-relaxed h-12 overflow-hidden italic">
                                "{club.description || "The leading force in campus culture and innovation."}"
                            </p>

                            <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#070912] bg-indigo-900/50 flex items-center justify-center text-[10px] font-black">{i}</div>
                                    ))}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        toggleFollow(club.id)
                                    }}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative z-20 ${
                                        followed.includes(club.id)
                                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                            : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                                    }`}
                                >
                                    {followed.includes(club.id) ? "Active" : "Join Guild"}
                                </button>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                            <span className="text-4xl block mb-4">🔍</span>
                            <p className="text-indigo-100/40 font-black uppercase tracking-widest text-sm">No guilds found in the database</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
