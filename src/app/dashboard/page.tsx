import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { User } from "lucide-react"
import { DashboardHeader } from "@/components/DashboardHeader"

export default async function DashboardPage() {
    const session = await auth()
    if (!session) redirect("/login")

    return (
        <div className="min-h-screen bg-[#070912] selection:bg-indigo-500/30 text-white font-sans p-8 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <DashboardHeader
                portalName="Student Portal"
                role={session.user?.role || "STUDENT"}
                userName={session.user?.name || "Student"}
            />
            
            <div className="max-w-7xl mx-auto space-y-12">
                <main className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase mb-8">
                            Session Verified • {session.user?.role}
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                            Welcome Back, <br />
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                {session.user?.name || "Student"}
                            </span>
                        </h1>
                        
                        <div className="flex flex-wrap gap-4 mt-12">
                            <Link href="/clubs" className="px-8 py-4 bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 rounded-2xl font-black text-sm transition-all flex items-center gap-3">
                                <span className="text-xl">🏛️</span> Explore Campus Guilds
                            </Link>
                            <Link href="/profile" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-3">
                                <User className="w-5 h-5" /> Neural Profile
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        <div className="bg-white/5 backdrop-blur-[40px] rounded-[32px] p-8 border border-white/5 hover:border-indigo-500/30 transition-all group">
                            <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-4 group-hover:text-indigo-400 transition-colors">Mission Intel</h3>
                            <div className="flex items-baseline gap-2">
                                <p className="text-5xl font-black text-white">12</p>
                                <span className="text-indigo-400 font-bold text-xs uppercase">Upcoming</span>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-[40px] rounded-[32px] p-8 border border-white/5 hover:border-purple-500/30 transition-all group">
                            <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-4 group-hover:text-purple-400 transition-colors">Confirmed RSVPs</h3>
                            <div className="flex items-baseline gap-2">
                                <p className="text-5xl font-black text-white">04</p>
                                <span className="text-purple-400 font-bold text-xs uppercase">Active</span>
                            </div>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-[40px] rounded-[32px] p-8 border border-white/5 hover:border-emerald-500/30 transition-all group lg:col-span-1 md:col-span-2">
                            <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-4 group-hover:text-emerald-400 transition-colors">Guild Status</h3>
                            <div className="flex items-baseline gap-2">
                                <p className="text-5xl font-black text-white">00</p>
                                <span className="text-emerald-400 font-bold text-xs uppercase">Joined</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
