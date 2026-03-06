"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function ClubDirectory() {
    const [clubs, setClubs] = useState<any[]>([])
    const [followed, setFollowed] = useState<string[]>([])

    useEffect(() => {
        // Mock clubs
        setClubs([
            { id: 'club_1', name: "Coding Club", description: "Algorithm enthusiasts and hackathon winners.", members: 450 },
            { id: 'club_2', name: "Music Society", description: "Jamming sessions and annual concerts.", members: 320 },
            { id: 'club_3', name: "Robotics Unit", description: "Building the next generation of machines.", members: 210 },
            { id: 'club_4', name: "Fine Arts Club", description: "Painting, sketching, and graphic design workshops.", members: 150 },
        ])
    }, [])

    const toggleFollow = (clubId: string) => {
        if (followed.includes(clubId)) {
            setFollowed(followed.filter(id => id !== clubId))
        } else {
            setFollowed([...followed, clubId])
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white font-sans">
            <div className="max-w-7xl mx-auto">
                <nav className="flex justify-between items-center mb-16">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        University Clubs
                    </h1>
                    <Link href="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
                        Home
                    </Link>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {clubs.map(club => (
                        <div key={club.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all group">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-xl">🏛️</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                            <p className="text-sm text-indigo-100/60 mb-6 h-12 overflow-hidden">{club.description}</p>

                            <div className="flex justify-between items-center">
                                <span className="text-xs text-indigo-300">{club.members} Members</span>
                                <button
                                    onClick={() => toggleFollow(club.id)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${followed.includes(club.id)
                                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                            : "bg-indigo-600 hover:bg-indigo-500 text-white"
                                        }`}
                                >
                                    {followed.includes(club.id) ? "Following" : "Follow"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
