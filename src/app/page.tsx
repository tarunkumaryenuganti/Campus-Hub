import Link from "next/link"
import { auth, signOut } from "@/auth"
import { EventFeed } from "@/components/EventFeed"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-8 text-white font-sans">
      <nav className="flex justify-between items-center max-w-7xl mx-auto mb-16 py-4 border-b border-white/10">
        <Link href="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer">
            CampusHub
          </h1>
        </Link>
        <div className="space-x-4 flex items-center">
          {session ? (
            <>
              {session.user?.role === "ADMIN" && (
                <Link href="/admin" className="text-red-400 hover:text-red-300 transition-colors font-medium">
                  Admin
                </Link>
              )}
              {(session.user?.role === "EVENT_MANAGER" || session.user?.role === "ADMIN") && (
                <Link href="/manager" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  Events
                </Link>
              )}
              {(session.user?.role === "CLUB" || session.user?.role === "ADMIN") && (
                <Link href="/club-dashboard" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  Club
                </Link>
              )}
              <Link href="/dashboard" className="text-indigo-200 hover:text-white transition-colors">
                Dashboard
              </Link>
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}>
                <button type="submit" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 text-sm">
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
              Sign In
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Discover Your <span className="text-indigo-400">Campus Flow</span>
          </h2>
          <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto mb-8">
            Find events, join clubs, and connect with your university ecosystem. Experience the next level of student life.
          </p>

          <div className="flex justify-center gap-4 mb-16">
            {!session ? (
              <Link href="/login" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 hover:-translate-y-1">
                Get Started
              </Link>
            ) : (
              <Link href="/dashboard" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 hover:-translate-y-1">
                Go to Dashboard
              </Link>
            )}
            <Link href="/clubs" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-lg transition-all hover:-translate-y-1">
              Explore Clubs
            </Link>
          </div>

          {session && session.user?.interests && Array.isArray(session.user.interests) && (
            <div className="inline-block px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-12">
              <span className="text-indigo-300 font-medium">✨ Recommended for you based on: </span>
              <span className="text-white ml-2">{session.user.interests.join(", ")}</span>
            </div>
          )}
        </div>

        <EventFeed />

      </main>
    </div>
  );
}
