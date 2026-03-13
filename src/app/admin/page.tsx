"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { getUsers, updateUserRole } from "@/app/actions/userActions"

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        const res = await getUsers()
        if (res.success) {
            setUsers(res.users || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        if (status === "unauthenticated") redirect("/login")
        if (session && session.user?.role !== "ADMIN") redirect("/dashboard")
        if (session) fetchUsers()
    }, [session, status])

    const handleRoleChange = async (userId: string, newRole: string) => {
        const res = await updateUserRole(userId, newRole)
        if (res.success) {
            alert("Role updated successfully")
            fetchUsers()
        } else {
            alert(res.error)
        }
    }

    if (status === "loading" || loading) {
        return <div className="min-h-screen bg-transparent flex items-center justify-center text-slate-900 font-medium">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-transparent p-8">
            <div className="max-w-7xl mx-auto mt-12">
                <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-4xl font-bold text-red-700 font-semibold mb-4">
                        Admin Control Panel
                    </h1>
                    <p className="text-red-800 font-semibold mb-8">System-wide moderation and management</p>

                    <div className="bg-white/95 backdrop-blur-xl rounded-xl overflow-hidden border border-red-500/20">
                        <table className="w-full text-left">
                            <thead className="bg-red-500/10 text-red-300 text-sm">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Current Role</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-500/10 text-slate-900 font-medium/90">
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-red-500/5 transition-colors">
                                        <td className="px-6 py-4 font-medium">{u.name}</td>
                                        <td className="px-6 py-4 text-slate-900 font-medium">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold border ${u.role === 'ADMIN' ? 'bg-red-500/20 border-red-500 text-red-700 font-semibold' :
                                                u.role === 'EVENT_MANAGER' ? 'bg-amber-500/20 border-amber-500 text-amber-700 font-semibold' :
                                                    'bg-indigo-500/20 border-indigo-500 text-indigo-700 font-semibold'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                className="bg-black/60 border border-red-500/30 rounded px-2 py-1 text-xs text-slate-900 font-medium focus:outline-none focus:border-red-500"
                                            >
                                                <option value="STUDENT">Student</option>
                                                <option value="EVENT_MANAGER">Manager</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
