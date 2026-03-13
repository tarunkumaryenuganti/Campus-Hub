import Link from "next/link"
import { auth, signOut } from "@/auth"
import { EventFeed } from "@/components/EventFeed"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-transparent selection:bg-indigo-500/30 font-sans text-white">
      {/* Cinematic Background Image */}
      <div className="fixed inset-0 -z-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/campus-bg.png")' }}
        ></div>
        <div className="absolute inset-0 bg-[#070912]/40"></div>
      </div>

      {/* Dynamic Background Blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-8">
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <span className="text-xl">🚀</span>
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              CampusHub
            </h1>
          </div>
        </Link>
        <div className="space-x-4 flex items-center">
          {session ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                {session.user?.role === "ADMIN" && (
                  <Link href="/admin" className="text-sm font-bold text-red-100/70 hover:text-red-300 transition-colors">
                    Admin
                  </Link>
                )}
                {(session.user?.role === "EVENT_MANAGER" || session.user?.role === "ADMIN") && (
                  <Link href="/manager" className="text-sm font-bold text-amber-100/70 hover:text-amber-300 transition-colors">
                    Manager
                  </Link>
                )}
                {(session.user?.role === "CLUB" || session.user?.role === "ADMIN") && (
                  <Link href="/club-dashboard" className="text-sm font-bold text-purple-100/70 hover:text-purple-300 transition-colors">
                    Club
                  </Link>
                )}
                <Link href="/clubs" className="text-sm font-bold text-indigo-100/70 hover:text-indigo-300 transition-colors">
                  Clubs
                </Link>
                <Link href="/dashboard" className="text-sm font-bold text-indigo-100/70 hover:text-indigo-300 transition-colors">
                  Dashboard
                </Link>
              </div>
              
              <Link href="/profile" className="px-5 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105">
                My Profile
              </Link>
              
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}>
                <button type="submit" className="px-5 py-2.5 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white/90 rounded-xl transition-all border border-white/10 text-sm font-bold">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/clubs" className="px-5 py-2.5 bg-white/5 text-white/90 backdrop-blur-xl hover:bg-white/10 rounded-xl transition-all border border-white/10 font-bold text-sm">
                Clubs
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-white/5 text-white/90 backdrop-blur-xl hover:bg-white/10 rounded-xl transition-all border border-white/10 font-bold text-sm">
                Sign In
              </Link>
              <Link href="/signup" className="px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] font-black text-sm hover:scale-105">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-black text-indigo-400 tracking-widest uppercase mb-4">
            The Student Operating System
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            Discover Your <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              Campus Flow
            </span>
          </h2>
          
          <p className="text-xl text-indigo-100/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Find events, join clubs, and connect with your university ecosystem. <br className="hidden md:block" />
            Experience the next level of student life in high definition.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {!session ? (
              <Link href="/login" className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-95">
                Launch Explorer
              </Link>
            ) : (
              <Link href="/dashboard" className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-95">
                Go to Dashboard
              </Link>
            )}
            <Link href="/clubs" className="px-10 py-5 bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xl transition-all hover:-translate-y-1 active:scale-95">
              Explore Clubs
            </Link>
          </div>

          {session && session.user?.interests && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="text-indigo-400 text-sm font-black uppercase tracking-tighter italic">Recommended:</span>
              <span className="text-white/80 text-sm font-bold flex gap-2">
                {Array.isArray(session.user.interests) 
                  ? (session.user.interests as any[]).join(", ") 
                  : (session.user.interests as string).split(',').map((i: string) => i.trim()).join(", ")}
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] -z-10"></div>
          <EventFeed />
        </div>
      </main>
    </div>
  );
}
