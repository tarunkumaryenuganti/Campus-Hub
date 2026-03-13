"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getClubDetails } from "@/app/actions/userActions"
import { ArrowLeft, Users, Calendar, Share2, Instagram, Facebook, Sparkles, Zap } from "lucide-react"

export default function ClubDetails() {
    const params = useParams()
    const clubId = params.id as string

    const [clubInfo, setClubInfo] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true)
            const res = await getClubDetails(clubId)
            if (res.success && res.club) {
                setClubInfo(res.club)
            }
            setLoading(false)
        }
        fetchDetails()
    }, [clubId])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#070912] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!clubInfo) {
        return (
            <div className="min-h-screen bg-[#070912] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6">
                    <span className="text-4xl">⚠️</span>
                </div>
                <h2 className="text-3xl font-black text-white mb-4">Guild Not Found</h2>
                <p className="text-white/40 font-medium mb-12 max-w-md">This campus guild might have been disbanded or the coordinates are incorrect.</p>
                <Link href="/clubs" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black transition-all shadow-lg shadow-indigo-500/20">
                    Return to Registry
                </Link>
            </div>
        )
    }

    // Parse activities if they're stored as a string
    const activitiesList = clubInfo.activities 
        ? (typeof clubInfo.activities === 'string' ? clubInfo.activities.split(',').map((a: string) => a.trim()) : clubInfo.activities)
        : ["Weekly Guild Meet", "Collaborative Project Session", "Monthly Networking Event"]

    return (
        <div className="min-h-screen bg-[#070912] selection:bg-indigo-500/30 font-sans text-white p-6 md:p-12 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <nav className="flex justify-between items-center mb-16 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">CampusHub</h1>
                    </div>
                    <Link href="/clubs" className="px-6 py-3 bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 rounded-2xl font-black text-sm transition-all flex items-center gap-2 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Guild Directory
                    </Link>
                </nav>

                {/* Hero Section */}
                <header className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 md:p-20 mb-12 overflow-hidden shadow-2xl">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start justify-between">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-black text-indigo-400 tracking-widest uppercase mb-8">
                                <Zap className="w-3 h-3 fill-indigo-400" /> Authorized Campus Guild
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                                {clubInfo.name}
                            </h2>
                            <p className="text-xl md:text-2xl text-indigo-100/60 font-medium leading-relaxed italic">
                                "{clubInfo.description}"
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-center text-center">
                                <Users className="w-8 h-8 text-indigo-400 mb-3" />
                                <span className="text-3xl font-black text-white">{clubInfo.followers?.length || 0}</span>
                                <span className="text-[10px] uppercase font-black text-white/30 tracking-widest mt-1">Loyal Members</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-center text-center">
                                <Calendar className="w-8 h-8 text-purple-400 mb-3" />
                                <span className="text-3xl font-black text-white">{activitiesList.length}</span>
                                <span className="text-[10px] uppercase font-black text-white/30 tracking-widest mt-1">Prime Ops</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Operations / Activities Section */}
                    <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 hover:border-indigo-500/20 transition-all shadow-2xl">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-3xl font-black tracking-tight uppercase italic">Guild Operations</h3>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {activitiesList.map((activity: string, index: number) => (
                                <div key={index} className="group p-6 bg-[#0f111a] border border-white/5 rounded-3xl flex items-center gap-6 hover:border-indigo-500/30 transition-all hover:translate-x-2">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-all">
                                        <span className="text-2xl group-hover:scale-110 transition-transform">💎</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-xl text-white mb-1 group-hover:text-indigo-400 transition-colors uppercase italic">{activity}</h4>
                                        <p className="text-sm text-white/30 font-bold uppercase tracking-widest">Active Phase • Priority Alpha</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Meta Feed / Social Section */}
                    <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 hover:border-purple-500/20 transition-all shadow-2xl">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                                    <Share2 className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-3xl font-black tracking-tight uppercase italic">Neural Feed</h3>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Instagram-style transmission */}
                            <div className="bg-[#0f111a] border border-white/5 rounded-[32px] p-6 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Instagram className="w-16 h-16" />
                                </div>
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                                        <div className="w-full h-full bg-[#0f111a] rounded-2xl flex items-center justify-center">
                                            <span className="text-xs font-black uppercase italic">HD</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase italic tracking-wider">@{clubInfo.name.toLowerCase().replace(/\s/g, '_')}</p>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Transmission Active</p>
                                    </div>
                                </div>
                                <div className="aspect-video bg-white/5 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-purple-500/30 border border-transparent transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 opacity-40"></div>
                                    <Sparkles className="w-12 h-12 text-white/20" />
                                </div>
                                <p className="text-sm text-white/70 font-medium leading-relaxed">
                                    <span className="font-black text-white mr-2 italic">LOG:</span>
                                    Synchronizing with the latest campus energy. New initiatives launching in T-minus 48 hours. Stay locked. 🚀 #CampusFlow #{clubInfo.name.replace(/\s/g, '')}
                                </p>
                            </div>

                            {/* Network broadcast */}
                            <div className="bg-[#0f111a] border border-white/5 rounded-[32px] p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Facebook className="w-16 h-16" />
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                                        <Facebook className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase italic tracking-wider">{clubInfo.name} Core</p>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Broadcast Phase • 1H AGO</p>
                                    </div>
                                </div>
                                <p className="text-base text-indigo-100/80 font-medium leading-relaxed mb-6 border-l-4 border-indigo-600 pl-6 italic">
                                    "Phase one complete. Registrations for our next major op are now live. Secure your slot at the command center."
                                </p>
                                <div className="flex items-center gap-8 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                                    <button className="hover:text-indigo-400 transition-colors flex items-center gap-2">Amplified</button>
                                    <button className="hover:text-indigo-400 transition-colors flex items-center gap-2">Resonated</button>
                                    <button className="hover:text-indigo-400 transition-colors flex items-center gap-2">Broadcasting</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
