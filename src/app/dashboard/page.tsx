import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/DashboardHeader"

export default async function DashboardPage() {
    const session = await auth()
    if (!session) redirect("/login")

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <DashboardHeader
                portalName="Student Portal"
                role={session.user?.role || "STUDENT"}
                userName={session.user?.name || "Student"}
            />
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Welcome back, {session.user?.name || "Student"}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                            Role: {session.user?.role}
                        </span>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stats Cards */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-indigo-500/30 transition-colors">
                            <h3 className="text-indigo-200 text-sm font-medium mb-2">Upcoming Events</h3>
                            <p className="text-3xl font-bold text-white">12</p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors">
                            <h3 className="text-purple-200 text-sm font-medium mb-2">RSVPs</h3>
                            <p className="text-3xl font-bold text-white">4</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
